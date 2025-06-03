# Advanced Compute Options

<Tip warning={true}>
This feature is part of the <a href="https://huggingface.co/enterprise">Enterprise Hub</a>.
</Tip>

Enterprise Hub organizations gain access to advanced compute options to accelerate their machine learning journey.

## Host ZeroGPU Spaces in your organization

ZeroGPU is a dynamic GPU allocation system that optimizes AI deployment on Hugging Face Spaces. By automatically allocating and releasing NVIDIA H200 GPU slices (70GB VRAM) as needed, organizations can efficiently serve their AI applications without dedicated GPU instances.

<div class="flex justify-center" style="max-width: 550px">
  <img
    class="block dark:hidden m-0!"
    src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/enterprise/advanced-compute-options-zero.png"
    alt="screenshot of Hugging Face Advanced Compute Options (ZeroGPU)"
  />
  <img
    class="hidden dark:block m-0!"
    src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/enterprise/dark-advanced-compute-options-zero.png"
    alt="screenshot of Hugging Face Advanced Compute Options (ZeroGPU)"
  />
</div>

**Key benefits for organizations**

- **Free GPU Access**: Access powerful NVIDIA H200 GPUs at no additional cost through dynamic allocation
- **Enhanced Resource Management**: Host up to 50 ZeroGPU Spaces for efficient team-wide AI deployment
- **Simplified Deployment**: Easy integration with PyTorch-based models, Gradio apps, and other Hugging Face libraries
- **Enterprise-Grade Infrastructure**: Access to high-performance NVIDIA H200 GPUs with 70GB VRAM per workload

[Learn more about ZeroGPU →](https://huggingface.co/docs/hub/spaces-zerogpu)
