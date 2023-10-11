# Using TensorBoard

TensorBoard provides tooling for tracking and visualizing metrics as well as visualizing models. All repositories that contain TensorBoard traces have an automatic tab with a hosted TensorBoard instance for anyone to check it out without any additional effort!

## Exploring TensorBoard models on the Hub

Over 6,000 repositories have TensorBoard traces on the Hub. You can find them by filtering at the left of the [models page](https://huggingface.co/models?filter=tensorboard). As an example, if you go to the [aubmindlab/bert-base-arabertv02](https://huggingface.co/aubmindlab/bert-base-arabertv02) repository, there is a **Metrics** tab. If you select it, you'll view a TensorBoard instance.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-tensorflow.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-tensorflow-dark.png"/>
</div>

## Adding your TensorBoard traces

THe Hub automatically detects TensorBoard traces (such as `tfevents`). Once you push your TensorBoard files to the Hub, they will automatically start an instance.


## Additional resources

* TensorBoard [documentation](https://www.tensorflow.org/tensorboard).