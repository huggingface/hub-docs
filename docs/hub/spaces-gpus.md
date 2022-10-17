# Using GPU Spaces

Please, follow these instructions to install appropriate frameworks to take advantage of the CUDA version installed in Spaces powered by GPUs.

## PyTorch installation

You need to install a version of PyTorch compatible with the built-in CUDA drivers. Adding the following two lines to your `requirements.txt` file should work:

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

## JAX

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

## Tensorflow

The default `tensorflow` installation should recognize the CUDA device. Just add `tensorflow` to your `requirements.txt` file and use the following code in your `app.py` to verify in your Space logs.

```Python
import tensorflow as tf
print(tf.config.list_physical_devices('GPU'))
# [PhysicalDevice(name='/physical_device:GPU:0', device_type='GPU')]
```
