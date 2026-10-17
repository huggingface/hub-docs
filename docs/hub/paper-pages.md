# Paper Pages

Paper pages allow people to find artifacts related to a paper such as models, datasets and apps/demos (Spaces). Paper pages also enable the community to discuss about the paper.

<div class="flex justify-center">
<img class="block dark:hidden" width="300" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/papers-discussions.png"/>
<img class="hidden dark:block" width="300" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/papers-discussions-dark.png"/>
</div>

## Linking a Paper to a model, dataset or Space

If the repository card (`README.md`) mentions a paper's arXiv ID, the Hugging Face Hub links the paper to the repository. The ID must appear in one of these forms:

* A link to its Paper page: `https://huggingface.co/papers/1706.03762`
* A link to its arXiv abstract or PDF: `https://arxiv.org/abs/1706.03762` or `https://arxiv.org/pdf/1706.03762`
* An `arXiv:` prefix in the text: `arXiv:1706.03762`
* A BibTeX field, in braces: `eprint={1706.03762}`

On model and dataset pages, up to five linked papers that have a Paper page on the Hub are listed in the right sidebar:

<div class="flex justify-center">
<img class="block dark:hidden" width="450" alt="Papers for victor/Flash-8B-GGUF section in the right sidebar of a model page, listing two linked papers with their arXiv ID, publication date and upvotes" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/models-linked-papers.png"/>
<img class="hidden dark:block" width="450" alt="Papers for victor/Flash-8B-GGUF section in the right sidebar of a model page, listing two linked papers with their arXiv ID, publication date and upvotes" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/models-linked-papers-dark.png"/>
</div>

Models and datasets also get an `arxiv:<PAPER ID>` tag. Clicking on it lets you:

* Visit the Paper page.
* Filter for other repositories of the same type on the Hub that cite the same paper.

<div class="flex justify-center">
<img class="block dark:hidden" width="260" alt="arxiv:2609.19969 tag on a model page, expanded to show the paper title, View paper page and List models citing this paper" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/models-arxiv-tag.png"/>
<img class="hidden dark:block" width="260" alt="arxiv:2609.19969 tag on a model page, expanded to show the paper title, View paper page and List models citing this paper" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/models-arxiv-tag-dark.png"/>
</div>

## Claiming authorship to a Paper

The Hub will attempt to automatically match paper to users based on their email. 

<div class="flex justify-center">
<img class="block dark:hidden" width="300" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/papers-authors.png"/>
<img class="hidden dark:block" width="300" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/papers-authors-dark.png"/>
</div>

If your paper is not linked to your account, you can click in your name in the corresponding Paper page and click "claim authorship". This will automatically re-direct to your paper settings where you can confirm the request. The admin team will validate your request soon. Once confirmed, the Paper page will show as verified.

<div class="flex justify-center">
<img class="block dark:hidden" width="300" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/papers-settings.png"/>
<img class="hidden dark:block" width="300" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/papers-settings-dark.png"/>
</div>

If you don't have any papers on Hugging Face yet, you can index your first one as explained [here](#can-i-have-a-paper-page-even-if-i-have-no-modeldatasetspace). Once available, you can claim authorship.


## Frequently Asked Questions

### Can I control which Paper pages show in my profile?

Yes! You can visit your Papers in [settings](https://huggingface.co/settings/papers), where you will see a list of verified papers. There, you can click the "Show on profile" checkbox to hide/show it in your profile. 

### Do you support ACL anthology?

We're starting with Arxiv as it accounts for 95% of the paper URLs Hugging Face users have linked in their repos organically. We'll check how this evolve and potentially extend to other paper hosts in the future.

### Can I have a Paper page even if I have no model/dataset/Space?

Yes. You can go to [the main Papers page](https://huggingface.co/papers), click search and write the name of the paper or the full Arxiv id. If the paper does not exist, you will get an option to index it. You can also just visit the page `hf.co/papers/xxxx.yyyyy` replacing with the arxiv id of the paper you wish to index.
