"""Unified storage abstraction for dataset I/O.

This module provides a common interface for saving/loading HuggingFace datasets,
abstracting away whether we're using HuggingFace Hub, S3, or GCS.

Usage:
    from .storage import get_storage

    storage = get_storage()
    storage.save_dataset(dataset, "my_dataset")
    dataset = storage.load_dataset()
"""

from __future__ import annotations

import logging
from abc import ABC, abstractmethod
from typing import TYPE_CHECKING, Optional

from .config import env

if TYPE_CHECKING:
    from datasets import Dataset

LOGGER = logging.getLogger(__name__)


class DatasetStorage(ABC):
    """Abstract base class for dataset storage backends."""

    @abstractmethod
    def save_dataset(self, dataset: "Dataset", name: str) -> bool:
        """Save dataset to storage. Returns True on success."""
        pass

    @abstractmethod
    def load_dataset(self, split: str = "train") -> Optional["Dataset"]:
        """Load dataset from storage. Returns None if unavailable."""
        pass

    @property
    @abstractmethod
    def is_configured(self) -> bool:
        """Check if this storage backend is configured."""
        pass


class HFHubStorage(DatasetStorage):
    """HuggingFace Hub storage backend."""

    def __init__(
        self,
        repo_id: Optional[str] = None,
        branch: Optional[str] = None,
        commit_message: Optional[str] = None,
    ):
        self.repo_id = repo_id or env("HF_REPO_ID")
        self.branch = branch or env("HF_BRANCH")
        self.commit_message = commit_message or env("HF_COMMIT_MESSAGE")
        self._token = env("HF_TOKEN")

    @property
    def is_configured(self) -> bool:
        return bool(self.repo_id)

    def save_dataset(self, dataset: "Dataset", name: str) -> bool:
        if not self.is_configured:
            LOGGER.debug("HF Hub not configured, skipping dataset save")
            return False

        # Fail early if token is missing or empty
        if not self._token:
            raise ValueError(
                "HF_TOKEN is required to push datasets to the Hub. "
                "Set the HF_TOKEN environment variable with a token that has write permissions."
            )

        try:
            dataset.push_to_hub(
                self.repo_id,
                token=self._token,
                revision=self.branch,
                commit_message=self.commit_message or f"Add {name}",
            )
            LOGGER.info("Pushed dataset to HF Hub: %s", self.repo_id)
            return True
        except Exception as exc:
            LOGGER.exception("HF Hub dataset push failed: %s", exc)
            raise

    def load_dataset(self, split: str = "train") -> Optional["Dataset"]:
        if not self.is_configured:
            LOGGER.debug("HF Hub not configured, cannot load dataset")
            return None

        try:
            from datasets import load_dataset

            LOGGER.info("Loading dataset from HF Hub: %s", self.repo_id)
            return load_dataset(self.repo_id, split=split, token=self._token)
        except Exception as exc:
            LOGGER.exception("HF Hub dataset load failed: %s", exc)
            return None


class S3Storage(DatasetStorage):
    """Amazon S3 storage backend."""

    def __init__(
        self,
        output_uri: Optional[str] = None,
        input_uri: Optional[str] = None,
    ):
        self.output_uri = output_uri or env("S3_OUTPUT_URI")
        self.input_uri = input_uri or env("S3_INPUT_URI")

    @property
    def is_configured(self) -> bool:
        return bool(self.output_uri or self.input_uri)

    def save_dataset(self, dataset: "Dataset", name: str) -> bool:
        if not self.output_uri:
            LOGGER.debug("S3 output URI not configured, skipping dataset save")
            return False

        try:
            from .sm_io import save_dataset_to_s3

            save_dataset_to_s3(dataset, self.output_uri, name)
            return True
        except ImportError as exc:
            LOGGER.warning("S3 save failed (missing dependency): %s", exc)
            return False
        except Exception as exc:
            LOGGER.exception("S3 dataset save failed: %s", exc)
            return False

    def load_dataset(self, split: str = "train") -> Optional["Dataset"]:
        if not self.input_uri:
            LOGGER.debug("S3 input URI not configured, cannot load dataset")
            return None

        try:
            from .sm_io import load_dataset_from_s3

            return load_dataset_from_s3(self.input_uri, split=split)
        except ImportError as exc:
            LOGGER.warning("S3 load failed (missing dependency): %s", exc)
            return None
        except Exception as exc:
            LOGGER.exception("S3 dataset load failed: %s", exc)
            return None


class GCSStorage(DatasetStorage):
    """Google Cloud Storage backend."""

    def __init__(
        self,
        output_uri: Optional[str] = None,
        input_uri: Optional[str] = None,
    ):
        self.output_uri = output_uri or env("GCS_OUTPUT_URI")
        self.input_uri = input_uri or env("GCS_INPUT_URI")

    @property
    def is_configured(self) -> bool:
        return bool(self.output_uri or self.input_uri)

    def save_dataset(self, dataset: "Dataset", name: str) -> bool:
        if not self.output_uri:
            LOGGER.debug("GCS output URI not configured, skipping dataset save")
            return False

        try:
            from .cloudrun_io import save_dataset_to_gcs

            save_dataset_to_gcs(dataset, self.output_uri, name)
            return True
        except ImportError as exc:
            LOGGER.warning("GCS save failed (missing dependency): %s", exc)
            return False
        except Exception as exc:
            LOGGER.exception("GCS dataset save failed: %s", exc)
            return False

    def load_dataset(self, split: str = "train") -> Optional["Dataset"]:
        if not self.input_uri:
            LOGGER.debug("GCS input URI not configured, cannot load dataset")
            return None

        try:
            from .cloudrun_io import load_dataset_from_gcs

            return load_dataset_from_gcs(self.input_uri, split=split)
        except ImportError as exc:
            LOGGER.warning("GCS load failed (missing dependency): %s", exc)
            return None
        except Exception as exc:
            LOGGER.exception("GCS dataset load failed: %s", exc)
            return None


def get_storage(
    *,
    repo_id: Optional[str] = None,
    s3_output_uri: Optional[str] = None,
    s3_input_uri: Optional[str] = None,
    gcs_output_uri: Optional[str] = None,
    gcs_input_uri: Optional[str] = None,
) -> DatasetStorage:
    """Get the configured storage backend. Exactly one must be configured."""
    gcs = GCSStorage(output_uri=gcs_output_uri, input_uri=gcs_input_uri)
    s3 = S3Storage(output_uri=s3_output_uri, input_uri=s3_input_uri)
    hf = HFHubStorage(repo_id=repo_id)

    configured = [
        name
        for name, backend in [("GCS", gcs), ("S3", s3), ("HF Hub", hf)]
        if backend.is_configured
    ]

    if len(configured) > 1:
        raise ValueError(
            f"Multiple storage backends configured: {configured}. Configure only one."
        )
    if len(configured) == 0:
        raise ValueError(
            "No storage backend configured. Set HF_REPO_ID, S3_OUTPUT_URI, or GCS_OUTPUT_URI."
        )

    if gcs.is_configured:
        return gcs
    if s3.is_configured:
        return s3
    return hf


def get_source_storage(
    *,
    source_repo_id: Optional[str] = None,
) -> DatasetStorage:
    """Get storage for loading source data. Exactly one must be configured."""
    gcs_input = env("GCS_INPUT_URI")
    s3_input = env("S3_INPUT_URI")
    hf_repo = source_repo_id or env("SOURCE_REPO_ID") or env("HF_REPO_ID")

    configured = [
        name
        for name, val in [("GCS", gcs_input), ("S3", s3_input), ("HF Hub", hf_repo)]
        if val
    ]

    if len(configured) > 1:
        raise ValueError(
            f"Multiple source backends configured: {configured}. Configure only one."
        )
    if len(configured) == 0:
        raise ValueError(
            "No source storage configured. Set SOURCE_REPO_ID, S3_INPUT_URI, or GCS_INPUT_URI."
        )

    if gcs_input:
        return GCSStorage(input_uri=gcs_input)
    if s3_input:
        return S3Storage(input_uri=s3_input)
    return HFHubStorage(repo_id=hf_repo)
