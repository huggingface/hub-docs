"""vLLM server management and async inference client."""

from __future__ import annotations

import asyncio
import logging
import os
import signal
import subprocess
import threading
import time
from typing import TYPE_CHECKING, Any, Awaitable, Dict, List, Sequence

import requests
from openai import AsyncOpenAI

from .document import encode_image

if TYPE_CHECKING:
    from PIL import Image

LOGGER = logging.getLogger(__name__)


def _stream_output(pipe, prefix: str) -> None:
    """Stream subprocess output to stdout with prefix."""
    try:
        for line in iter(pipe.readline, ""):
            print(f"[{prefix}] {line.rstrip()}", flush=True)
    finally:
        pipe.close()


def launch_vllm() -> subprocess.Popen:
    """Launch vLLM server as subprocess."""
    model_id = os.environ.get("MODEL_ID", "deepseek-ai/DeepSeek-OCR")
    served_name = os.environ.get("SERVED_MODEL_NAME", "deepseek-ocr")
    port = os.environ.get("PORT", "8080")
    host = os.environ.get("HOST", "0.0.0.0")

    cmd: List[str] = [
        "vllm",
        "serve",
        "--model",
        model_id,
        "--served-model-name",
        served_name,
        "--tensor-parallel-size",
        os.environ.get("TENSOR_PARALLEL_SIZE", "1"),
        "--max-model-len",
        os.environ.get("MAX_MODEL_LEN", "4096"),
        "--gpu-memory-utilization",
        os.environ.get("GPU_MEMORY_UTILIZATION", "0.90"),
        "--port",
        port,
        "--host",
        host,
        "--trust-remote-code",
        "--enable-chunked-prefill",
        "--no-enable-prefix-caching",
        "--mm-processor-cache-gb",
        os.environ.get("MM_PROCESSOR_CACHE_GB", "0"),
        "--logits-processors",
        os.environ.get(
            "LOGITS_PROCESSORS",
            "vllm.model_executor.models.deepseek_ocr:NGramPerReqLogitsProcessor",
        ),
    ]

    extra_args = os.environ.get("EXTRA_VLLM_ARGS")
    if extra_args:
        cmd.extend(extra_args.split())

    LOGGER.info("Launching vLLM server: %s", " ".join(cmd))
    process = subprocess.Popen(
        cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, bufsize=1
    )

    # Start output streaming threads
    threads = []
    for name, pipe in [("STDOUT", process.stdout), ("STDERR", process.stderr)]:
        if pipe:
            t = threading.Thread(
                target=_stream_output, args=(pipe, f"vLLM {name}"), daemon=True
            )
            t.start()
            threads.append(t)

    process._log_threads = threads  # type: ignore
    return process


def shutdown_server(server_process: subprocess.Popen) -> None:
    """Gracefully shutdown vLLM server."""
    LOGGER.info("Shutting down vLLM server")
    server_process.send_signal(signal.SIGTERM)
    try:
        server_process.wait(timeout=30)
    except subprocess.TimeoutExpired:
        LOGGER.warning("Server did not exit in time, sending SIGKILL")
        server_process.kill()

    for thread in getattr(server_process, "_log_threads", []):
        thread.join(timeout=1)


def _format_duration(seconds: float) -> str:
    """Format duration as mm:ss."""
    minutes = int(seconds // 60)
    secs = int(seconds % 60)
    return f"{minutes:02d}:{secs:02d}"


def wait_for_server(url: str, timeout_s: int = None, interval_s: int = 5) -> bool:
    """Wait for server health endpoint to respond."""
    if timeout_s is None:
        timeout_s = int(os.environ.get("VLLM_STARTUP_TIMEOUT", "600"))  # 10 min default

    start_time = time.time()
    LOGGER.info("⏳ Waiting for vLLM server to start...")

    deadline = time.time() + timeout_s
    while time.time() < deadline:
        try:
            if requests.get(url, timeout=5).ok:
                elapsed = time.time() - start_time
                LOGGER.info("✅ vLLM server ready in %s", _format_duration(elapsed))
                return True
        except Exception:
            pass
        time.sleep(interval_s)

    elapsed = time.time() - start_time
    LOGGER.error("❌ vLLM server failed to start after %s", _format_duration(elapsed))
    return False


def should_launch_server() -> bool:
    """Check if server should be auto-launched."""
    return os.environ.get("SKIP_SERVER_LAUNCH", "").lower() not in {"1", "true", "yes"}


def base_url_from_env() -> str:
    """Get vLLM base URL from environment."""
    port = os.environ.get("PORT", "8080")
    return os.environ.get("BASE_URL", f"http://127.0.0.1:{port}")


def _prepare_payload(
    image: "Image.Image",
    model_name: str,
    prompt: str,
    max_tokens: int,
    temperature: float,
) -> Dict[str, Any]:
    """Prepare OpenAI-compatible chat completion payload."""
    return {
        "model": model_name,
        "messages": [
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": prompt},
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/png;base64,{encode_image(image)}"
                        },
                    },
                ],
            }
        ],
        "max_tokens": max_tokens,
        "temperature": temperature,
        "extra_body": {
            "skip_special_tokens": False,
            "vllm_xargs": {
                "ngram_size": 30,
                "window_size": 90,
                "whitelist_token_ids": "[128821,128822]",
            },
        },
    }


class DeepSeekClient:
    """Async batch inference client for DeepSeek OCR via vLLM."""

    def __init__(
        self,
        base_url: str,
        model_name: str,
        max_tokens: int,
        temperature: float,
        *,
        request_timeout: int = 120,
        max_retries: int = 3,
        retry_backoff_seconds: float = 2.0,
        max_retry_wait_seconds: float = 60.0,
    ) -> None:
        self.base_url = base_url.rstrip("/")
        self.model_name = model_name
        self.default_max_tokens = max_tokens
        self.default_temperature = temperature
        self.default_request_timeout = request_timeout
        self.max_retries = max(0, max_retries)
        self.retry_backoff_seconds = max(0.0, retry_backoff_seconds)
        self.max_retry_wait_seconds = max_retry_wait_seconds
        self._client = AsyncOpenAI(api_key="vllm", base_url=f"{self.base_url}/v1")

    async def _async_completion(self, payload: Dict[str, Any], timeout: int) -> str:
        """Execute single async completion request."""
        try:
            response = await self._client.chat.completions.create(
                model=payload["model"],
                messages=payload["messages"],
                max_tokens=payload["max_tokens"],
                temperature=payload["temperature"],
                timeout=timeout,
                extra_body=payload.get("extra_body"),
            )
        except Exception as exc:
            LOGGER.error("DeepSeek request failed: %s", exc)
            raise

        if not response.choices:
            return ""
        return getattr(response.choices[0].message, "content", "") or ""

    def infer(self, requests_data: Sequence[Dict[str, Any]]) -> List[str]:
        """Run batch inference synchronously.

        Args:
            requests_data: List of dicts with keys: image (PIL.Image), prompt (str),
                           optional: max_tokens, temperature, request_timeout

        Returns:
            List of response strings, one per request
        """
        if not requests_data:
            return []

        payloads = []
        timeouts = []
        for req in requests_data:
            payloads.append(
                _prepare_payload(
                    image=req["image"],
                    model_name=self.model_name,
                    prompt=req.get("prompt", ""),
                    max_tokens=req.get("max_tokens", self.default_max_tokens),
                    temperature=req.get("temperature", self.default_temperature),
                )
            )
            timeouts.append(req.get("request_timeout") or self.default_request_timeout)

        return self._run_async(self._async_infer_batch(payloads, timeouts))

    async def _async_infer_batch(
        self, payloads: Sequence[Dict[str, Any]], timeouts: Sequence[int]
    ) -> List[str]:
        """Run batch of async completions concurrently."""
        tasks = [
            asyncio.create_task(self._async_completion(p, t))
            for p, t in zip(payloads, timeouts)
        ]
        return await asyncio.gather(*tasks)

    @staticmethod
    def _run_async(coro: Awaitable[Any]) -> Any:
        """Run async coroutine in new event loop."""
        loop = asyncio.new_event_loop()
        try:
            asyncio.set_event_loop(loop)
            result = loop.run_until_complete(coro)
            loop.run_until_complete(loop.shutdown_asyncgens())
            return result
        finally:
            asyncio.set_event_loop(None)
            loop.close()
