# Using ESPnet at Hugging Face

`espnet` is an end-to-end toolkit for speech processing, including automatic speech recognition, text to speech, speech enhancement, dirarization and other tasks.

## Exploring ESPnet in the Hub

You can find hundreds of `espnet` models by filtering at the left of the [models page](https://huggingface.co/models?library=espnet&sort=downloads). 

All models on the Hub come up with useful features
1. An automatically generated model card with a description, a training configuration, licenses and more.
2. Metadata tags that help for discoverability and contain information such as license, language and datasets.
3. An interactive widget you can use to play out with the model directly in the browser.
4. An Inference API that allows to make inference requests.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-espnet_widget.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-espnet_widget-dark.png"/>
</div>

## Using existing models

### With the Python API

For a full guide on loading pre-trained models, we recommend checking out the [official guide](https://github.com/espnet/espnet_model_zoo)). 

If you're interested in doing inference, different classes for different tasks have a `from_pretrained` method that allows loading models from the Hub. For example:
* `Speech2Text` for Automatic Speech Recognition.
* `Text2Speech` for Text to Speech.
* `SeparateSpeech` for Audio Source Separation.

```py
import soundfile
from espnet2.bin.tts_inference import Text2Speech
text2speech = Text2Speech.from_pretrained("model_name")
speech = text2speech("foobar")["wav"]
soundfile.write("out.wav", speech.numpy(), text2speech.fs, "PCM_16")
```

### With the Command Line Tool

Given a repository ID, you can do the following

```bash
# Print the path of the downloaded file
espnet_model_zoo_download <model_name>

# Print the path of unpacked files
espnet_model_zoo_download --unpack true <model_name>
```

If you want to see how to load a specific model, you can click `Use in ESPnet` and you will be given a working snippet that you can load it! 

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-espnet_snippet.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/libraries-espnet_snippet-dark.png"/>
</div>

## Sharing your models

`ESPnet` outputs a `zip` file that can be uploaded to Hugging Face easily. For a full guide on sharing  models, we recommend checking out the [official guide](https://github.com/espnet/espnet_model_zoo#register-your-model)).

The `run.sh` script allows to upload a given model to a Hugging Face repository.

```bash
./run.sh --stage 15 --skip_upload_hf false --hf_repo username/model_repo
```

## Additional resources

* ESPnet [docs](https://espnet.github.io/espnet/index.html).
* ESPnet model zoo [repository](https://github.com/espnet/espnet_model_zoo).
* Integration [docs](https://github.com/asteroid-team/asteroid/blob/master/docs/source/readmes/pretrained_models.md).
