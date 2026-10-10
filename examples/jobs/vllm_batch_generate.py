"""Generate answers for the first prompts of a chat dataset, with vLLM.

Reads a Hub dataset, runs every prompt through one model load, and writes one
JSON line per prompt to the output file. On Jobs, run it with an image that
provides vLLM and `datasets`, and mount a bucket for the output:
https://huggingface.co/docs/hub/jobs-inference#run-a-batch-over-a-dataset
"""

import argparse
import json
import os
import sys
from pathlib import Path

from datasets import load_dataset
from vllm import LLM, SamplingParams

parser = argparse.ArgumentParser()
parser.add_argument("--model", default="Qwen/Qwen2.5-0.5B-Instruct")
parser.add_argument("--dataset", default="trl-lib/Capybara")
parser.add_argument("--split", default="train[:20]")
parser.add_argument("--max-tokens", type=int, default=128)
parser.add_argument("--output", default="/output/answers.jsonl")
args = parser.parse_args()

# Each row of the dataset becomes one chat message. Adapt this to your own
# dataset's columns: vLLM takes a list of messages per prompt.
dataset = load_dataset(args.dataset, split=args.split)
prompts = [[{"role": "user", "content": row["messages"][0]["content"]}] for row in dataset]

llm = LLM(model=args.model, max_model_len=4096)
outputs = llm.chat(prompts, SamplingParams(temperature=0.7, max_tokens=args.max_tokens))

Path(args.output).parent.mkdir(parents=True, exist_ok=True)
with open(args.output, "w") as f:
    for prompt, output in zip(prompts, outputs):
        f.write(json.dumps({"prompt": prompt[0]["content"], "answer": output.outputs[0].text}) + "\n")

print(f"wrote {len(outputs)} rows to {args.output}")

# The engine leaves a worker process and a few threads behind after the last
# generate() call, and the interpreter can wait on them forever. An idle Job
# keeps billing until its timeout, so leave on a clean exit instead.
sys.stdout.flush()
os._exit(0)
