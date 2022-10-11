## Most Used Model for the Task

Pix2Pix is a popular model used for image to image translation tasks. It is based on a conditional-GAN (generative adversarial network) where instead of a noise vector a 2D image is given as input. More information about Pix2Pix can be retreived from the below link where the associated paper and Github repository can be found.

https://phillipi.github.io/pix2pix/

Below images show some of the examples shared in the paper that can be obtained using Pix2Pix. There are various cases this model can be applied to. It may do relatively simple things like converting a grayscale image to its colored version. But more importantly it can generate realistic pictures from rough sketches (as in the purse example) or from painting like images (as in the street and facade examples below).

<img src="/tasks/assets/image-to-image/pix2pix_examples.jpg" alt="Alt text" title="Optional title">

## Use Cases

### Style transfer

One of the most popular use cases of image to image is the style transfer. Style transfer models can convert a regular photography into a painting in the style of a famous painter.

## Task Variants

### Image inpainting

Image inpainting is widely used during photography editing to remove unwanted objects, such as poles, wires or sensor
dust.

### Image colorization

Old, black and white images can be brought up to life using an image colorization model.

### Super Resolution

Super resolution models increase the resolution of an image, allowing for higher quality viewing and printing.

## Inference

This section should have useful information about how to pull a model from Hugging Face Hub that is a part of a library specialized in a task and use it.

## Useful Resources

In this area, you can insert useful resources about how to train or use a model for this task.

## References 

[1] P. Isola, J. -Y. Zhu, T. Zhou and A. A. Efros, "Image-to-Image Translation with Conditional Adversarial Networks," 2017 IEEE Conference on Computer Vision and Pattern Recognition (CVPR), 2017, pp. 5967-5976, doi: 10.1109/CVPR.2017.632.
