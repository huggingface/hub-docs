# Using Unity Sentis Models from Hugging Face
[Unity 3D](https://unity.com/) is one of the most popular game engines in the world. [Unity Sentis](https://unity.com/products/sentis) is the inference engine that runs on Unity 2023 or above. It is an API that allows you to easily integrate and run neural network models in your game or application making use of hardware acceleration. Because Unity can export to many different form factors including PC, mobile and consoles, it means that this is an easy way to run neural network models on many different types of hardware.

## Exploring Sentis Models in the Hub
You will find `unity-sentis` models by filtering at the left of the [models page](https://huggingface.co/models?library=unity-sentis).

All the Sentis models in the Hub come with code and instructions to easily get you started using the model in Unity. All Sentis models under the `unity` namespace (for example, [unity/sentis-yolotinyv7](https://huggingface.co/unity/sentis-yolotinyv7)` have been validated to work, so you can be sure they will run in Unity.

To get more details about using Sentis, you can read its [documentation](https://docs.unity3d.com/Packages/com.unity.sentis@latest). To get help from others using Sentis, you can ask in its [discussion forum](https://discussions.unity.com/c/ai-beta/sentis)


## Types of files
Each repository will contain several types of files:

* ``sentis`` files: These are the main model files that contain the neural networks that run on Unity.
* ``ONNX`` files: This is an alternative format you can include in addition to, or instead of, the Sentis files. It can be useful for visualization with third party tools such as [Netron](https://github.com/lutzroeder/netron).
* ``cs`` file: These are C# files that contain the code to run the model on Unity.
* ``info.json``: This file contains information about the files in the repository.
* Data files. These are other files that are needed to run the model. They could include vocabulary files, lists of class names etc. Some typical files will have extensions ``json`` or ``txt``.
* ``README``. This is the model card. It contains instructions on how to use the model and other relevant information.

## Running the model
Always refer to the instructions on the model card. It is expected that you have some knowledge of Unity and some basic knowledge of C#.

First, open Unity 2023 or above and create a new scene.

In general, you will want to download your model files (``*.sentis``) and data files and put them in the StreamingAssets folder which is a subfolder inside the Assets folder. (If this folder does not exist you can create it).

Next place your C# file on an object in the scene such as the Main Camera. 

Refer to the model card to see if there are any other objects you need to create in the scene.

In most cases, we only provide the basic implementation to get you up and running. It is up to you to find creative uses. For example, you may want to combine two or more models to do interesting things.

## Sharing your own Sentis models
We encourage you to share your own Sentis models on Hugging Face. These may be models you trained yourself or models you have converted to the [Sentis format](https://docs.unity3d.com/Packages/com.unity.sentis@1.3/manual/serialize-a-model.html) and have tested to run in Unity. 

Please provide the models in the Sentis format for each repository you upload. This provides an extra check that they will run in Unity and is also the preferred format for large models. You can also include the original ONNX versions of the model files.

Provide a C# file with a minimal implementation. For example, an image processing model should have code that shows how to prepare the image for the input and construct the image from the output. Alternatively, you can link to some external sample code. This will make it easy for others to download and use the model in Unity.

Provide any data files needed to run the model. For example, vocabulary files.

Finally, please provide an ``info.json`` file, which lists your project's files. This helps in counting the downloads. Some examples of the contents of ``info.json`` are:

```
{
   code: [ “mycode.cs”], 
   models: [ “model1.sentis”, “model2.sentis”],
   data: [ “vocab.txt” ]
}
```

Or if your code sample is external:

```
{
   sampleURL: [ “http://sampleunityproject”], 
   models: [ “model1.sentis”, “model2.sentis”]
}
```

## Additional Information
We also have some full [sample projects](https://github.com/Unity-Technologies/sentis-samples) to help you get started using Sentis.

