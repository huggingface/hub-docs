# Spaces ZeroGPU: Dynamic GPU Allocation for Spaces

<img src="https://cdn-uploads.huggingface.co/production/uploads/5f17f0a0925b9863e28ad517/naVZI-v41zNxmGlhEhGDJ.gif" style="max-width: 440px; width: 100%" alt="ZeroGPU schema" />

ZeroGPU is a shared infrastructure that optimizes GPU usage for AI models and demos on Hugging Face Spaces. It dynamically allocates and releases NVIDIA H200 GPUs as needed, offering:

1. **Free GPU Access**: Enables cost-effective GPU usage for Spaces.
2. **Multi-GPU Support**: Allows Spaces to leverage multiple GPUs concurrently on a single application.

Unlike traditional single-GPU allocations, ZeroGPU's efficient system lowers barriers for developers, researchers, and organizations to deploy AI models by maximizing resource utilization and power efficiency.

## Using and hosting ZeroGPU Spaces

- **Using existing ZeroGPU Spaces**
  - ZeroGPU Spaces are available to use for free to all users. (Visit [the curated list](https://huggingface.co/spaces/enzostvs/zero-gpu-spaces)).
  - [PRO users](https://huggingface.co/subscribe/pro) get x7 more daily usage quota and highest priority in GPU queues when using any ZeroGPU Spaces.
- **Hosting your own ZeroGPU Spaces**
  - Personal accounts: [Subscribe to PRO](https://huggingface.co/settings/billing/subscription) to access ZeroGPU in the hardware options when creating a new Gradio SDK Space.
  - Organizations: [Subscribe to a Team or Enterprise plan](https://huggingface.co/enterprise) to enable ZeroGPU Spaces for all organization members.

## Technical Specifications

ZeroGPU supports two GPU sizes

| GPU size            | Backing hardware | Vram                     | Quota cost |
|---------------------|------------------|--------------------------|------------|
| `large` *(default)* | Half NVIDIA H200 | 70GB                     | 1×         |
| `xlarge`            | Full NVIDIA H200 | 141GB                    | 2×         |

> [!NOTE]
> See [GPU size selection](#gpu-size-selection) to learn how to use sizes

## Compatibility

ZeroGPU Spaces are designed to be compatible with most PyTorch-based GPU Spaces. While compatibility is enhanced for high-level Hugging Face libraries like `transformers` and `diffusers`, users should be aware that:

- Currently, ZeroGPU Spaces are exclusively compatible with the **Gradio SDK**.
- ZeroGPU Spaces may have limited compatibility compared to standard GPU Spaces.
- Unexpected issues may arise in some scenarios.

### Supported Versions

- **Gradio**: 4+
- **PyTorch**: Almost all versions from **2.1.0** to **latest** are supported  
  <details>
    <summary>See full list</summary>

    - 2.1.0  
    - 2.1.1  
    - 2.1.2  
    - 2.2.0  
    - 2.2.2  
    - 2.4.0  
    - 2.5.1  
    - 2.6.0  
    - 2.7.1  
    - 2.8.0  
    - 2.9.1  

  </details>
- **Python**:
  - 3.12.12  
  - 3.10.13  

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

## GPU size selection

The default size used by `@spaces.GPU` is `large` (half H200).

You can explicitly request a full H200 by specifying `size="xlarge"`:

``` python
@spaces.GPU(size="xlarge")
def generate(prompt):
    return pipe(prompt).images
```

> [!NOTE]
> - `xlarge` consumes **2×** more daily quota than `large` (e.g. a 45s **effective** task duration consumes 90s of quota)
> - `xlarge` usually means higher queuing probability and longer wait times
> - Only use `xlarge` when your workload truly benefits from the additional compute or memory

## Duration Management

For functions expected to exceed the default 60-second of GPU runtime, you can specify a custom duration:

```python
@spaces.GPU(duration=120)
def generate(prompt):
   return pipe(prompt).images
```

This sets the maximum function runtime to 120 seconds. Specifying shorter durations for quicker functions will improve queue priority for Space visitors.

### Dynamic duration

`@spaces.GPU` also supports dynamic durations.

Instead of directly passing a duration, simply pass a callable that takes the same inputs as your decorated function and returns a duration value:

```python
def get_duration(prompt, steps):
    step_duration = 3.75
    return steps * step_duration

@spaces.GPU(duration=get_duration)
def generate(prompt, steps):
   return pipe(prompt, num_inference_steps=steps).images
```


## Compilation

ZeroGPU does not support `torch.compile`, but you can use PyTorch **ahead-of-time** compilation (requires torch `2.8+`)

Check out this [blogpost](https://huggingface.co/blog/zerogpu-aoti) for a complete guide on ahead-of-time compilation on ZeroGPU.

## Usage Tiers

GPU usage is subject to **daily** quotas, per account tier:

| Account type                   | Daily GPU quota  | Queue priority  |
| ------------------------------ | ---------------- | --------------- |
| Unauthenticated                | 2 minutes        | Low             |
| Free account                   | 3.5 minutes      | Medium          |
| PRO account                    | 25 minutes       | Highest         |
| Team organization member       | 25 minutes       | Highest         |
| Enterprise organization member | 45 minutes       | Highest         |

Quota resets exactly 24 hours after your first GPU usage.

> [!NOTE]
> Remaining quota directly impacts priority in ZeroGPU queues.

## Hosting Limitations

- **Personal accounts ([PRO subscribers](https://huggingface.co/subscribe/pro))**: Maximum of 10 ZeroGPU Spaces.
- **Organization accounts ([Team & Enterprise](https://huggingface.co/enterprise))**: Maximum of 50 ZeroGPU Spaces.

By leveraging ZeroGPU, developers can create more efficient and scalable Spaces, maximizing GPU utilization while minimizing costs.

## Recommendations

If your demo uses a large model, we recommend using optimizations like ahead-of-time compilation and flash-attention 3. You can learn how to leverage these with
ZeroGPU in [this post](https://huggingface.co/blog/zerogpu-aoti). These optimizations will help you to maximize the advantages of ZeroGPU hours and provide
a better user experience.

## Feedback

You can share your feedback on Spaces ZeroGPU directly on the HF Hub: https://huggingface.co/spaces/zero-gpu-explorers/README/discussions
