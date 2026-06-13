"""Configuration dataclasses for pipeline stages."""

from __future__ import annotations

import logging
import os
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Dict, Optional, Type, TypeVar

LOGGER = logging.getLogger(__name__)

T = TypeVar("T")


def env(key: str, default: T = None, cast: Type[T] = str) -> T:
    """Read environment variable with type casting."""
    raw = os.environ.get(key)
    if raw is None:
        return default
    try:
        return cast(raw)
    except (TypeError, ValueError):
        LOGGER.warning("Invalid %s=%s, using default=%s", key, raw, default)
        return default


@dataclass
class FigureMetadata:
    """Metadata for an extracted figure (image stored in dataset, not as file)."""

    figure_id: str
    label: str
    bounding_box_pixels: Dict[str, int]
    description: Optional[str] = None


@dataclass
class InferenceSettings:
    """Settings for batch inference."""

    batch_size: int = 4
    max_concurrency: int = 4
    request_timeout: int = 120
    max_retries: int = 3
    retry_backoff: float = 2.0

    @classmethod
    def from_env(cls, prefix: str = "") -> InferenceSettings:
        """Load from environment with optional prefix (e.g., 'EXTRACT_')."""
        p = f"{prefix}_" if prefix else ""
        return cls(
            batch_size=max(1, env(f"{p}BATCH_SIZE", 4, int)),
            max_concurrency=max(1, env(f"{p}MAX_CONCURRENCY", 4, int)),
            request_timeout=max(1, env(f"{p}REQUEST_TIMEOUT", 120, int)),
            max_retries=max(0, env(f"{p}MAX_RETRIES", 3, int)),
            retry_backoff=max(0.1, env(f"{p}RETRY_BACKOFF", 2.0, float)),
        )


@dataclass
class HubSettings:
    """Settings for HuggingFace Hub upload."""

    repo_id: Optional[str] = None
    path_in_repo: str = ""
    branch: Optional[str] = None
    commit_message: Optional[str] = None

    @classmethod
    def from_env(cls, prefix: str = "HF") -> HubSettings:
        """Load from environment with prefix (e.g., 'HF_' -> HF_REPO_ID)."""
        p = f"{prefix}_" if prefix else ""
        return cls(
            repo_id=env(f"{p}REPO_ID") or env(f"{p}REPO"),
            path_in_repo=env(f"{p}PATH_IN_REPO", ""),
            branch=env(f"{p}BRANCH"),
            commit_message=env(f"{p}COMMIT_MESSAGE"),
        )


@dataclass
class ExtractSettings:
    """Settings for the extract stage."""

    dataset_name: str
    dataset_config: str
    dataset_split: str
    output_dir: Path
    client: Any  # DeepSeekClient
    prompt: str = "<image>\n<|grounding|>Convert this document to Markdown."
    max_tokens: int = 2048
    temperature: float = 0.0
    max_samples: Optional[int] = None
    stream_dataset: bool = True
    inference: InferenceSettings = field(default_factory=InferenceSettings)
    hub: HubSettings = field(default_factory=HubSettings)

    @classmethod
    def from_env(cls, client: Any) -> ExtractSettings:
        """Load settings from environment variables."""
        return cls(
            dataset_name=env("DATASET_NAME", "HuggingFaceM4/FineVision"),
            dataset_config=env("DATASET_CONFIG", "olmOCR-mix-0225-documents"),
            dataset_split=env("DATASET_SPLIT", "train"),
            output_dir=Path(env("OUTPUT_DIR", "./outputs/extract")),
            client=client,
            prompt=env(
                "DOC_PROMPT", "<image>\n<|grounding|>Convert this document to Markdown."
            ),
            max_tokens=env("DOC_MAX_TOKENS", 2048, int),
            temperature=env("DOC_TEMPERATURE", 0.0, float),
            max_samples=env("MAX_SAMPLES", None, int),
            stream_dataset=env("STREAM_DATASET", "true").lower() == "true",
            inference=InferenceSettings.from_env("EXTRACT"),
            hub=HubSettings.from_env("HF"),
        )


@dataclass
class DescribeSettings:
    """Settings for the describe stage."""

    output_dir: Path
    client: Any  # DeepSeekClient
    source_repo_id: Optional[str] = None
    prompt: str = "<image>\nDescribe this image in detail"
    max_tokens: int = 512
    temperature: float = 0.0
    inference: InferenceSettings = field(default_factory=InferenceSettings)
    hub: HubSettings = field(default_factory=HubSettings)

    @classmethod
    def from_env(cls, client: Any) -> DescribeSettings:
        """Load settings from environment variables."""
        return cls(
            output_dir=Path(env("OUTPUT_DIR", "./outputs/describe")),
            client=client,
            source_repo_id=env("SOURCE_REPO_ID") or env("HF_REPO_ID"),
            prompt=env("FIGURE_PROMPT", "<image>\nDescribe this image in detail"),
            max_tokens=env("FIGURE_MAX_TOKENS", 512, int),
            temperature=env("FIGURE_TEMPERATURE", 0.0, float),
            inference=InferenceSettings.from_env("DESCRIBE"),
            hub=HubSettings.from_env("HF"),
        )


@dataclass
class AssembleSettings:
    """Settings for the assemble stage."""

    source_repo_id: Optional[str] = None
    hub: HubSettings = field(default_factory=HubSettings)

    @classmethod
    def from_env(cls) -> AssembleSettings:
        """Load settings from environment variables."""
        return cls(
            source_repo_id=env("SOURCE_REPO_ID") or env("HF_REPO_ID"),
            hub=HubSettings.from_env("HF"),
        )
