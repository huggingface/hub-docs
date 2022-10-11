# Digital Object Identifier (DOI)

The Hugging Face Hub offers the possibility to generate DOI for your models or datasets. DOIs (Digital Object Identifiers) are strings uniquely identifying a digital object, anything from articles to figures, including datasets and models. DOIs are tied to object metadata, including the object's URL, version, creation date, description, etc. They are a commonly accepted reference to digital resources across research and academic communities; they are analogous to a book's ISBN.

## How to generate a DOI?

To do this, you must go to the settings of your model or dataset. Then you have to go to the DOI section, a button called "Generate DOI" should appear:

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/doi-generation.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/doi-generation-dark.png"/>
</div>

To generate the DOI for this model or dataset, you need to click on this button and acknowledge that some features on the hub will be restrained and some of your information (your full name) will be transferred to our partner DataCite:
<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/doi-agreement.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/doi-agreement-dark.png"/>
</div>

After you agree to those terms, your model or dataset will get a DOI assigned, and a new tag should appear in your model or dataset header allowing you to cite it.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/doi-header-with-doi.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/doi-header-with-doi-dark.png"/>
</div>


## Can I regenerate a new DOI if my model or dataset changes?

If ever there’s a new version of a model or dataset, a new DOI can easily be assigned, and the previous version of the DOI gets outdated. This makes it easy to refer to a specific version of an object, even if it has changed.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/doi-repo-updated.png"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/doi-repo-updated-dark.png"/>
</div>

You just need to click on "Generate new DOI" and tadaam!🎉 a new DOI is assigned for the current revision of your model or dataset.

## Why there is `locked by DOI` message on delete, rename and change visibility action on my model or dataset?

DOIs make finding information about a model or dataset easier and sharing them with the world via a permanent link that will never expire or change. As such, datasets/models with DOIs are intended to persist perpetually and may only be deleted, renamed and changed their visibility upon filing a request with our support (website@huggingface.co)

## Further Reading
- [Introducing DOI: the Digital Object Identifier to Datasets and Models](https://huggingface.co/blog/introducing-doi)
