# Spaces ZeroGPU: Dynamic GPU Allocation for Spaces

<img src="https://cdn-uploads.huggingface.co/production/uploads/5f17f0a0925b9863e28ad517/naVZI-v41zNxmGlhEhGDJ.gif" style="max-width: 550px; width: 100%" alt="ZeroGPU schema" />

ZeroGPU introduces a new approach to GPU utilization in Hugging Face Spaces. This innovative hardware solution offers two primary benefits:

1. **Free GPU Access**: Enables cost-effective GPU usage for Spaces.
2. **Multi-GPU Support**: Allows Spaces to leverage multiple GPUs concurrently on a single application.

ZeroGPU achieves these goals by implementing an efficient GPU allocation system, dynamically assigning and releasing GPUs as needed. This contrasts with traditional GPU Spaces, which are limited to a single dedicated GPU.

## Using and hosting ZeroGPU Spaces

- **Using existing ZeroGPU Spaces**
  - ZeroGPU Spaces are available to use for free to all users. (Visit [the curated list](https://huggingface.co/spaces/enzostvs/zero-gpu-spaces)).
  - [PRO users](https://huggingface.co/subscribe/pro) get x5 more daily usage quota and highest priority in GPU queues when using any ZeroGPU Spaces.
- **Hosting your own ZeroGPU Spaces**
  - Personal accounts: [Subscribe to PRO](https://huggingface.co/settings/billing/subscription) to access ZeroGPU in the hardware options when creating a new Gradio SDK Space.
  - Organizations: [Subscribe to the Enterprise Hub](https://huggingface.co/enterprise) to enable ZeroGPU Spaces for all organization members.

## Technical Specifications

- **GPU Type**: Nvidia A100
- **Available VRAM**: 40GB per workload

## Compatibility

ZeroGPU Spaces are designed to be compatible with most PyTorch-based GPU Spaces. While compatibility is enhanced for high-level Hugging Face libraries like `transformers` and `diffusers`, users should be aware that:

- Currently, ZeroGPU Spaces are exclusively compatible with the **Gradio SDK**.
- ZeroGPU Spaces may have limited compatibility compared to standard GPU Spaces.
- Unexpected issues may arise in some scenarios.

### Supported Versions

- Gradio: 4+
- PyTorch: 2.0.1, 2.1.2, 2.2.2, 2.4.0 (Note: 2.3.x is not supported due to a [PyTorch bug](https://github.com/pytorch/pytorch/issues/122085))
- Python: 3.10.13

## Getting started with ZeroGPU

To utilize ZeroGPU in your Space, follow these steps:

1. Make sure the ZeroGPU hardware is selected in your Space settings.
2. Import the `spaces` module.
3. Decorate GPU-dependent functions with `@spaces.GPU`.

This decoration process allows the Space to request a GPU when the function is called and release it upon completion.

### Example Usage

```python
import spaces
from diffusers import DiffusionPipeline

pipe = DiffusionPipeline.from_pretrained(...)
pipe.to('cuda')

@spaces.GPU
def generate(prompt):
    return pipe(prompt).images

gr.Interface(
    fn=generate,
    inputs=gr.Text(),
    outputs=gr.Gallery(),
).launch()
```

Note: The `@spaces.GPU` decorator is designed to be effect-free in non-ZeroGPU environments, ensuring compatibility across different setups.

## Duration Management

For functions expected to exceed the default 60-second runtime, specify a custom duration:

```python
@spaces.GPU(duration=120)
def generate(prompt):
   return pipe(prompt).images
```

This sets the maximum function runtime to 120 seconds. Specifying shorter durations for quicker functions can improve queue priority for Space visitors.

## Limitations

- **Personal accounts (PRO subscribers)**: Maximum of 10 ZeroGPU Spaces.
- **Organization accounts (Enterprise Hub)**: Maximum of 50 ZeroGPU Spaces.

By leveraging ZeroGPU, developers can create more efficient and scalable Spaces, maximizing GPU utilization while minimizing costs.

## Feedback

You can share your feedback on Spaces ZeroGPU directly on the HF Hub: https://huggingface.co/spaces/zero-gpu-explorers/README/discussions
