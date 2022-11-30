# How to Add a Space to ArXiv

Demos on Hugging Face Spaces allow a wide audience to try out state-of-the-art machine
learning research without writing any code. Hugging Face and ArXiv have collaborated 
to embed these demos directly along side papers on ArXiv!

Thanks to this integration, users can now find the most popular demos for a paper on its arXiv abstract page. For example, if you want to try out demos of the LayoutLM document classification model, you can go to [the LayoutLM paper's arXiv page](https://arxiv.org/abs/1912.13318), and navigate to the demo tab. You will see open-source demos built by the machine learning community for this model.

We'll cover the steps on how to add your Space to ArXiv and have it show up in  the Demos tab. There are a few prerequisites for this:

**Prerequisites**

* There's an existing paper on ArXiv that you'd like to create a demo for
* The paper is **associated with a model or a dataset** that is on the Hugging Face Hub (or can be uploaded there)
* You have built or (can build) a demo for the model or the dataset on Spaces

**Steps to Add Your Space to ArXiv**

1. First, upload the model or dataset associated with the ArXiv paper onto the Hugging Face Hub if it is not already there. ([Detailed instructions are here](./models-uploading))

2. When writing the model card (README.md) for the model, include a link to the ArXiv paper. It's good practice to include a full citation as well. You can see an example of a link and a citation on the [LayoutLM model card](https://huggingface.co/microsoft/layoutlm-base-uncased)

    *Note*: you can verify this step has been carried out successfully by seeing if an ArXiv button appears above the model card. In the case of LayoutLM, the button says: "arxiv:1912.13318" and links to the LayoutLM paper on ArXiv.

    ![](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/arxiv-button.png)

3. Then, create a demo on Spaces that loads this model or dataset. Somewhere within the code, the model or dataset Hub id must be included in order for Hugging Face to detect that a Space is associated with it.

    For example, the [docformer_for_document_classification](https://huggingface.co/spaces/iakarshu/docformer_for_document_classification) Space loads the LayoutLM [like this](https://huggingface.co/spaces/iakarshu/docformer_for_document_classification/blob/main/modeling.py#L484) and include the string `"microsoft/layoutlm-base-uncased"`:

    ```py
    from transformers import LayoutLMForTokenClassification
    
    layoutlm_dummy = LayoutLMForTokenClassification.from_pretrained("microsoft/layoutlm-base-uncased", num_labels=1)
    ```

    *Note*: Here's an [overview on building demos on Hugging Face Spaces](./spaces-overview) and here are more specific instructions for [Gradio](./spaces-sdks-gradio) and [Streamlit](./spaces-sdks-streamlit). 

4. As soon as your Space is built, Hugging Face will detect that it is associated with the model or dataset. For example, if you have linked a model, a "Linked Models" button should appear in the top right corner of the Space, as shown here: 

    ![](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/linked-models.png)
    
    *Note*:  You can also add linked models or datasets manually by explicitly updating them in the [README metadata for the Space, as described here](https://huggingface.co/docs/hub/spaces-config-reference).


That's it! Your Space should appear in the Demo tab next to the paper on ArXiv in a few minutes 🤗
