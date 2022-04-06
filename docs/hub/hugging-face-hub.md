---
title: Hugging Face Hub
---

<h1>Hugging Face Hub documentation</h1>

## What's the Hugging Face Hub?

We are helping the community work together towards the goal of advancing Machine Learning 🔥.

The Hugging Face Hub is a platform with over 30K models, 3K datasets, and 2K demos in which people can easily collaborate in their ML workflows. The Hub works as a central place where anyone can share, explore, discover, and experiment with open-source Machine Learning.

No single company, including the Tech Titans, will be able to “solve AI” by themselves – the only way we'll achieve this is by sharing knowledge and resources in a community-centric approach. We are building the largest open-source collection of models, datasets, demos and metrics on the Hugging Face Hub to democratize and advance AI for everyone 🚀.
## What can you find on the Hub?

The Hugging Face Hub hosts Git-based repositories, which are version-controlled spaces that can contain all your files. 💾

On it, you'll be able to upload and discover...

* Models, *hosting the latest state-of-the-art models for NLP, vision, and audio tasks*
* Datasets, *featuring a wide variety of data for different domains and modalities*
* Spaces, *interactive apps for demonstrating ML models directly in your browser*

Unlike other hosting solutions, the Hub offers **versioning, commit history, diffs, branches, and over a dozen library integrations**! You can learn more about the features that all repositories share in the **Repositories documentation**.

## Models
Models on the Hugging Face Hub allow for simple discovery and usage to maximize model impact. To promote responsible model usage and development, model repos are equipped with [Model Cards](TODO) to inform users of each model's limitations and biases. Additional [metadata](/docs/hub/model-repos#model-card-metadata) about info such as their tasks, languages, and metrics can be included, with training metrics charts even added if the repository contains [TensorBoard traces](https://huggingface.co/models?filter=tensorboard). It's also easy to add an **inference widget** to your model, allowing anyone to play with the model directly in the browser! For production settings, an API is provided to **instantly serve your model**.

To upload models to the Hub, or download models and integrate them into your work, explore the **Models documentation**. You can also choose from [**over a dozen frameworks**](/docs/hub/libraries) such as 🤗 Transformers, Asteroid, and ESPnet that support the Hugging Face Hub.

## Datasets
The Hugging Face Hub is home to over 3,000 datasets in more than 100 languages that can be used for a broad range of tasks across NLP, Computer Vision, and Audio. The Hub makes it simple to find, download, and upload datasets. Datasets are accompanied by extensive documentation in the form of **Dataset Cards** and **Dataset Preview** to let you explore the data directly in your browser. While many datasets are public, **organizations** and individuals can create private datasets to comply with licensing or privacy issues. You can learn more about **Datasets here on Hugging Face Hub documentation**.

[🤗 `datasets`](https://huggingface.co/docs/datasets/index) allows you to programmatically interact with the datasets, so you can easily use datasets from the Hub in your projects.

## Spaces
[Spaces](https://huggingface.co/spaces) is a simple way to host ML demo apps on the Hub. They allow you to create your ML portfolio, showcase your projects at conferences or to stakeholders, and work collaboratively with other people in the ML ecosystem.

We currently support two awesome SDKs (**[Gradio](https://gradio.app/)** and **[Streamlit](https://streamlit.io/)**) that let you build cool apps in Python in a matter of minutes, with more ways to build coming soon.

After you've explored a few Spaces (take a look at our [Space of the Week!](https://huggingface.co/spaces)), dive into the **Spaces documentation** to learn all about how you can create your own Space.


## Organizations
Companies, universities and non-profits are an essential part of the Hugging Face community! The Hugging Face Hub offers **Organizations**, which can be used to group accounts and manage datasets, models, and Spaces. An organization's repositories will be featured on the organization’s page and every member of the organization will have the ability to contribute to the repository. In addition to conveniently grouping all of an organization's work, the Hub allows admins to set roles to **control access to repositories**, and manage their organization's [subscription](https://huggingface.co/pricing).

[Explore existing organizations](https://huggingface.co/organizations), create a new organization [here](https://huggingface.co/organizations/new), and then visit the **Organizations documentation** to learn more.

## Security
The Hugging Face Hub supports security and access control features to give you the peace of mind that your code, models, and data are safe. Visit the **Security** section in these docs to learn about:
* User Access Tokens
* Access Control for Organizations
* Signing commits with GPG
* Malware scanning