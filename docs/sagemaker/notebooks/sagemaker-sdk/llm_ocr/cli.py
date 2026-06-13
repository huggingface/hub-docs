"""CLI entrypoint for the DeepSeek OCR pipeline."""

from __future__ import annotations

import logging

from .config import AssembleSettings, DescribeSettings, ExtractSettings, env
from .server import (
    DeepSeekClient,
    base_url_from_env,
    launch_vllm,
    should_launch_server,
    shutdown_server,
    wait_for_server,
)
from .stages import run_stage_assemble, run_stage_describe, run_stage_extract

LOGGER = logging.getLogger(__name__)


def _setup_logging() -> None:
    """Configure logging with optional rich handler."""
    level = env("LOG_LEVEL", "INFO").upper()
    try:
        from rich.console import Console
        from rich.logging import RichHandler

        console = Console(
            force_terminal=env("FORCE_COLOR", "").lower() in {"1", "true"}
        )
        handler = RichHandler(
            console=console, show_time=True, show_level=True, rich_tracebacks=True
        )
        logging.basicConfig(
            level=level, format="%(message)s", handlers=[handler], force=True
        )
    except ImportError:
        logging.basicConfig(
            level=level,
            format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
            force=True,
        )


def _create_client(
    max_tokens: int, temperature: float, inference_settings
) -> DeepSeekClient:
    """Create DeepSeek client from environment."""
    return DeepSeekClient(
        base_url=base_url_from_env(),
        model_name=env("SERVED_MODEL_NAME", "deepseek-ocr"),
        max_tokens=max_tokens,
        temperature=temperature,
        request_timeout=inference_settings.request_timeout,
        max_retries=inference_settings.max_retries,
        retry_backoff_seconds=inference_settings.retry_backoff,
    )


def main() -> None:
    """Main entry point for the pipeline CLI."""
    _setup_logging()

    stage = env("PIPELINE_STAGE", "extract").lower()
    if stage not in {"extract", "describe", "assemble"}:
        raise ValueError(f"Unsupported stage: {stage}")

    needs_server = stage in {"extract", "describe"}
    launch_server = should_launch_server() and needs_server
    server_process = None

    try:
        if launch_server:
            server_process = launch_vllm()

        if needs_server:
            base_url = base_url_from_env()
            health_url = env("HEALTH_URL", f"{base_url}/health")
            LOGGER.info("Waiting for server at %s", health_url)
            if not wait_for_server(health_url):
                raise RuntimeError("vLLM server did not become ready in time")

        if stage == "extract":
            from .config import InferenceSettings

            inference = InferenceSettings.from_env("EXTRACT")
            max_tokens = env("DOC_MAX_TOKENS", 2048, int)
            temperature = env("DOC_TEMPERATURE", 0.0, float)
            client = _create_client(max_tokens, temperature, inference)
            settings = ExtractSettings.from_env(client)
            settings.inference = inference
            run_stage_extract(settings)

        elif stage == "describe":
            from .config import InferenceSettings

            inference = InferenceSettings.from_env("DESCRIBE")
            max_tokens = env("FIGURE_MAX_TOKENS", 512, int)
            temperature = env("FIGURE_TEMPERATURE", 0.0, float)
            client = _create_client(max_tokens, temperature, inference)
            settings = DescribeSettings.from_env(client)
            settings.inference = inference
            run_stage_describe(settings)

        elif stage == "assemble":
            settings = AssembleSettings.from_env()
            run_stage_assemble(settings)

    finally:
        if server_process is not None:
            shutdown_server(server_process)
