"""DeepSeek OCR pipeline package.

This package provides tools for running batch OCR inference with DeepSeek-OCR
and similar vision-language models across different cloud platforms.

Example usage:
    from llm_ocr import DeepSeekClient, ExtractSettings, run_stage_extract

    client = DeepSeekClient(base_url="http://localhost:8000/v1")
    settings = ExtractSettings.from_env(client)
    run_stage_extract(settings)
"""

# Stage runners - main entry points for pipeline stages
from llm_ocr.stages import (
    run_stage_assemble as run_stage_assemble,
    run_stage_describe as run_stage_describe,
    run_stage_extract as run_stage_extract,
)

# Configuration classes
from llm_ocr.config import (
    AssembleSettings as AssembleSettings,
    DescribeSettings as DescribeSettings,
    ExtractSettings as ExtractSettings,
    InferenceSettings as InferenceSettings,
)

# Inference client
from llm_ocr.server import DeepSeekClient as DeepSeekClient

# Storage backends
from llm_ocr.storage import (
    DatasetStorage as DatasetStorage,
    GCSStorage as GCSStorage,
    HFHubStorage as HFHubStorage,
    S3Storage as S3Storage,
    get_storage as get_storage,
)
