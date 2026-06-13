#!/bin/bash
# SageMaker entry script - installs uv and runs sm_job_runner.py with dependencies

set -e

echo "Installing uv..."
curl -LsSf https://astral.sh/uv/install.sh | sh
export PATH="$HOME/.local/bin:$PATH"

echo "Running pipeline with uv..."
cd /opt/ml/input/data/code
uv run sm_job_runner.py
