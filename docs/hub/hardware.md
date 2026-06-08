# Hardware

Tell the Hub which compute hardware you own (GPUs, CPUs, or Apple Silicon) and it will help you find models that run on your setup. It also appears on your public profile, so you can compare your setup with the community, and you can make it private any time.

Manage it any time from your [Hardware settings](https://huggingface.co/settings/hardware).

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/hardware-settings-light.png" alt="Hardware settings page in light mode."/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/hardware-settings-dark.png" alt="Hardware settings page in dark mode."/>
</div>

## Add your hardware

On your [Hardware settings](https://huggingface.co/settings/hardware) page, add each piece of hardware you own:

1. Pick a **type**: GPU, CPU, or Apple Silicon.
2. Choose the **provider** and **model** (for example, NVIDIA RTX 4090).
3. Set the **memory** (VRAM, RAM, or unified memory) and the **number of units** you have.

Add as many items as you like. If you own several, mark one as your **primary** hardware so it appears first on model pages.

> [!TIP]
> Your hardware is public by default. Turn off the **Publicly Visible** toggle to keep it private.

## See which models fit your hardware

On model pages that offer [GGUF](./gguf) or MLX files, a **Hardware compatibility** panel estimates whether each quantization will run on your saved hardware, so you can choose a size that fits before downloading. Pair it with [Local Apps](./local-apps) to get up and running in a couple of clicks.

## Share and compare

While your hardware is public:

- A **TFLOPS** badge appears on your profile, summarizing your estimated total compute power.
- You can browse [what the community is running](https://huggingface.co/hardware) and see how your setup compares across GPUs, CPUs, and Apple Silicon.

## Next steps

- [Use AI Models Locally](./local-apps) — run models with your favorite local app.
- [Local Agents with llama.cpp](./agents-local) — build a coding agent on your own hardware.
