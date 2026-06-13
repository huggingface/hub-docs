#!/usr/bin/env python3
# /// script
# requires-python = ">=3.11"
# dependencies = [
#     "boto3",
#     "s3fs",
#     "torch",
#     "datasets[s3]>=4.0.0",
#     "pyarrow>=12.0.0",
#     "numpy",
#     "pillow",
#     "requests",
#     "openai",
#     "huggingface-hub[hf_transfer]",
#     "rich",
# ]
# ///
"""
SageMaker Training Job entry point for the DeepSeek OCR pipeline.

This script is run via entry.sh which installs uv and executes: uv run sm_job_runner.py
Code is automatically available at /opt/ml/input/data/code via SageMaker SourceCode.

Environment Variables:
    PIPELINE_STAGE: Stage to run (extract, describe, assemble)
    
SageMaker Environment Variables (automatically set):
    SM_MODEL_DIR: /opt/ml/model
    SM_OUTPUT_DATA_DIR: /opt/ml/output/data
"""
from __future__ import annotations

import json
import logging
import os
import sys
from pathlib import Path


# Code is at /opt/ml/input/data/code (SageMaker SourceCode)
CODE_DIR = Path("/opt/ml/input/data/code")


def setup_logging():
    """Configure logging."""
    level = os.environ.get("LOG_LEVEL", "INFO").upper()
    logging.basicConfig(
        level=level,
        format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
        force=True,
    )


def load_hyperparameters() -> dict:
    """Load hyperparameters from SageMaker.
    
    SageMaker passes hyperparameters as a JSON file at /opt/ml/input/config/hyperparameters.json
    All values are strings, so we convert them to environment variables.
    """
    hp_file = Path("/opt/ml/input/config/hyperparameters.json")
    if not hp_file.exists():
        logging.info("No hyperparameters file found at %s", hp_file)
        return {}
    
    with hp_file.open() as f:
        hyperparameters = json.load(f)
    
    logging.info("Loaded hyperparameters: %s", list(hyperparameters.keys()))
    
    # Set hyperparameters as environment variables
    for key, value in hyperparameters.items():
        # SageMaker wraps values in quotes, strip them
        if isinstance(value, str):
            value = value.strip('"').strip("'")
        os.environ[key] = str(value)
    
    return hyperparameters


def write_success_marker():
    """Write a success marker file for SageMaker."""
    model_dir = Path(os.environ.get("SM_MODEL_DIR", "/opt/ml/model"))
    model_dir.mkdir(parents=True, exist_ok=True)
    
    success_file = model_dir / "_SUCCESS"
    success_file.write_text("Pipeline completed successfully\n")
    logging.info("Wrote success marker to %s", success_file)


def main() -> None:
    """Main entry point for SageMaker training job."""
    setup_logging()
    logger = logging.getLogger(__name__)
    
    logger.info("Starting SageMaker OCR pipeline job")
    logger.info("Python version: %s", sys.version)
    logger.info("Working directory: %s", os.getcwd())
    
    # Log SageMaker environment
    sm_vars = {k: v for k, v in os.environ.items() if k.startswith("SM_")}
    logger.info("SageMaker environment: %s", json.dumps(sm_vars, indent=2))
    
    # Load hyperparameters from SageMaker
    load_hyperparameters()
    
    # Add code directory to path
    sys.path.insert(0, str(CODE_DIR))
    logger.info("Code directory: %s", CODE_DIR)
    
    # Import and run pipeline
    try:
        from llm_ocr.cli import main as pipeline_main
        pipeline_main()
        write_success_marker()
        logger.info("Pipeline completed successfully")
    except Exception as exc:
        logger.exception("Pipeline failed: %s", exc)
        # Write failure info for debugging
        failure_file = Path("/opt/ml/output/failure")
        failure_file.parent.mkdir(parents=True, exist_ok=True)
        failure_file.write_text(str(exc))
        raise


if __name__ == "__main__":
    main()
