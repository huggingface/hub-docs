---
title: Organization cards
---

<h1>Organization cards</h1>

You can create an organization card to help users learn more about what your organization is working on and how users can use your libraries, models, datasets, and Spaces. 

An organization card is displayed on an organization's profile:

![/docs/assets/hub/org-card.png](/docs/assets/hub/org-card.png)


If you're a member of an organization, you'll see a button to create or edit your organization card on the organization's main page. Organization cards are a `README.md` static file inside a Space repo named `README`. The card can be as simple as Markdown text, or you can create a more customized appearance with HTML.

The card for the [Hugging Face Course organization](https://huggingface.co/huggingface-course), shown above, [contains the following HTML](https://huggingface.co/spaces/huggingface-course/README/blob/main/README.md):

```html
<p>
This is the organization grouping all the models and datasets used in the <a href="https://huggingface.co/course/chapter1" class="underline">Hugging Face course</a>.
</p>
```

For more examples, take a look at:

* [Amazon's](https://huggingface.co/spaces/amazon/README/blob/main/README.md) organization card source code
* [spaCy's](https://huggingface.co/spaces/spacy/README/blob/main/README.md) organization card source code.
