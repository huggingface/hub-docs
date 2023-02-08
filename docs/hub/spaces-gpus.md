# Using GPU Spaces

You can upgrade your Space to use a GPU accelerator using the _Settings_ button in the top navigation bar of the Space. You can even request a free upgrade if you are building a cool demo for a side project!

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-gpu-settings.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-gpu-settings-dark.png"/>
</div>

<Tip>
Longer-term, we would also like to expose non-GPU hardware, like HPU, IPU or TPU. If you have a specific AI hardware you'd like to run on, please let us know (website at huggingface.co).
</Tip>

As soon as your Space is running on GPU you can see which hardware it’s running on directly from this badge:

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-running-badge.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-running-badge-dark.png"/>
</div>

## Configure hardware programmatically

You can programmatically configure your Space hardware using `huggingface_hub`. This allows for a wide range of use cases where you need to dynamically assign GPUs.
Check out [this guide](https://huggingface.co/docs/huggingface_hub/main/en/guides/manage_spaces) for more details.

## Framework specific requirements[[frameworks]]

Most Spaces should run out of the box after a GPU upgrade, but sometimes you'll need to install CUDA versions of the machine learning frameworks you use. Please, follow this guide to ensure your Space takes advantage of the improved hardware.

### PyTorch

You'll need to install a version of PyTorch compatible with the built-in CUDA drivers. Adding the following two lines to your `requirements.txt` file should work:

```
--extra-index-url https://download.pytorch.org/whl/cu113
torch
```

You can verify whether the installation was successful by running the following code in your `app.py` and checking the output in your Space logs:

```Python
import torch
print(f"Is CUDA available: {torch.cuda.is_available()}")
# True
print(f"CUDA device: {torch.cuda.get_device_name(torch.cuda.current_device())}")
# Tesla T4
```

Many frameworks automatically use the GPU if one is available. This is the case for the Pipelines in 🤗 `transformers`, `fastai` and many others. In other cases, or if you use PyTorch directly, you may need to move your models and data to the GPU to ensure computation is done on the accelerator and not on the CPU. You can use PyTorch's `.to()` syntax, for example:

```Python
model = load_pytorch_model()
model = model.to("cuda")
```

### JAX

If you use JAX, you need to specify the binary that is compatible with the CUDA and cuDNN versions installed in your GPU Space. Please, add the following two lines to your `requirements.txt` file:

```
-f https://storage.googleapis.com/jax-releases/jax_cuda_releases.html
jax[cuda11_cudnn805]
```

After that, you can verify the installation by printing the output from the following code and checking it in your Space logs.

```Python
import jax

print(f"JAX devices: {jax.devices()}")
# JAX devices: [StreamExecutorGpuDevice(id=0, process_index=0)]
print(f"JAX device type: {jax.devices()[0].device_kind}")
# JAX device type: Tesla T4
```

### Tensorflow

The default `tensorflow` installation should recognize the CUDA device. Just add `tensorflow` to your `requirements.txt` file and use the following code in your `app.py` to verify in your Space logs.

```Python
import tensorflow as tf
print(tf.config.list_physical_devices('GPU'))
# [PhysicalDevice(name='/physical_device:GPU:0', device_type='GPU')]
```

## Billing

Billing on Spaces is based on hardware usage and is computed by the minute: you get charged for every minute the Space is running on the requested hardware,
regardless of whether the Space is used or not.

During a Space's lifecycle, it is only billed when the Space is actually `Running`. This means that there is no cost during either build or startup.

If a running Space starts to fail, it will be automatically suspended, hence the billing will stop.

Spaces running on free hardware are suspended automatically if they are not used for an extended period of time (e.g. two days). Upgraded Spaces run indefinitely by default, even if there is no usage. You can change this behavior by [setting a custom "sleep time"](#sleep-time) in the Space's settings. To interrupt the billing on your Space, you can change the Hardware to CPU basic.
<Tip>
Additional lifecycle control over Spaces with upgraded hardware will soon be provided such as configuration of an automated suspension of the Space after a custom delay.
</Tip>

Additional information about billing can be found in the [dedicated Hub-wide section](./billing).

## Set a custom sleep time[[sleep-time]]

If your Space runs on the default `cpu-basic` hardware, it will go to sleep if inactive for more than a set time (currently, 72 hours). Anyone visiting your Space will restart it automatically.

If you want your Space never to deactivate or if you want to set a custom sleep time, you need to upgrade to a paid Hardware.

By default, an upgraded Space will never go to sleep. However, you can use this setting for your upgraded Space to become idle (`stopped` stage) when it's unused 😴. You are not going to be charged for the upgraded hardware while it is asleep. The Space will 'wake up' or get restarted once it receives a new visitor.

The following interface will then be available in your Spaces hardware settings:

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-sleep-time.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-sleep-time-dark.png"/>
</div>

The following options are available:

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-sleep-time-options.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-sleep-time-options-dark.png"/>
</div>