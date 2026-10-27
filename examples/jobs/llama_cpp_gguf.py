# /// script
# requires-python = ">=3.10"
# dependencies = [
#     "llama-cpp-python @ https://github.com/abetlen/llama-cpp-python/releases/download/v0.3.36-cu125/llama_cpp_python-0.3.36-py3-none-manylinux_2_35_x86_64.whl",
#     "huggingface-hub",
#     "nvidia-cuda-runtime-cu12",
#     "nvidia-cublas-cu12",
# ]
# ///
#
# The llama.cpp inference call from
# https://github.com/abetlen/llama-cpp-python/blob/main/examples/high_level_api/high_level_api_inference.py,
# with two changes for a Job: the GGUF is pulled from the Hub with
# Llama.from_pretrained(), and every layer is offloaded to the GPU.
#
# The prebuilt Linux wheel is compiled against CUDA but does not bundle the CUDA
# libraries, so import llama_cpp only after loading them from the nvidia wheels.

import ctypes
import pathlib

import nvidia.cublas
import nvidia.cuda_runtime

for _pkg in (nvidia.cuda_runtime, nvidia.cublas):
    for _so in sorted(pathlib.Path(_pkg.__path__[0]).joinpath("lib").glob("*.so*")):
        ctypes.CDLL(str(_so), mode=ctypes.RTLD_GLOBAL)

from llama_cpp import Llama

llm = Llama.from_pretrained(
    repo_id="bartowski/Qwen2.5-1.5B-Instruct-GGUF",
    filename="Qwen2.5-1.5B-Instruct-Q4_K_M.gguf",
    n_gpu_layers=-1,
)

output = llm(
    "Question: What are the names of the planets in the solar system? Answer: ",
    max_tokens=48,
    stop=["Q:", "\n"],
    echo=True,
)

print(output["choices"][0]["text"])
