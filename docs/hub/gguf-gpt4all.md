# GGUF usage with GPT4All

[GPT4All](https://gpt4all.io/) is an open-source LLM application developed by [Nomic](https://nomic.ai/). Version 2.7.2 introduces a brand new, experimental feature called `Model Discovery`.

`Model Discovery` provides a built-in way to search for and download GGUF models from the Hub. To get started, open GPT4All and click `Download Models`. From here, you can use the search bar to find a model.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/gguf-gpt4all-discovery-light.png" width="70%" height="auto"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/gguf-gpt4all-discovery-dark.png" width="70%" height="auto"/>
</div>

After you have selected and downloaded a model, you can go to `Settings` and provide an appropriate prompt template in the GPT4All format (`%1` and `%2` placeholders).

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/gguf-gpt4all-template-light.png" width="70%" height="auto"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/gguf-gpt4all-template-dark.png" width="70%" height="auto"/>
</div>

Then from the main page, you can select the model from the list of installed models and start a conversation.

<div class="flex justify-center">
<img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/gguf-gpt4all-chat-light.png" width="70%" height="auto"/>
<img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/gguf-gpt4all-chat-dark.png" width="70%" height="auto"/>
</div>
