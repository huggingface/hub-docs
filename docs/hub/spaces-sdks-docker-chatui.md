# Chat UI on Spaces

**Hugging Chat** is the interface of Hugging Face enabling everyone to try open-source large language models using Hugging Face's infrastructure. This Docker template enables everyone to deploy their own Hugging Chat based on a model of their choice with a few clicks.

## Deploy your own Chat UI

To get started, simply head [here](https://huggingface.co/new-space?template=huggingchat/chat-ui-template). You can select the hardware to serve the model of your choice.

<a href="https://huggingface.co/new-space?template=huggingchat/chat-ui-template">
    <img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/huggingface.co_spaces_docker_chatui_landing.png" />
</a>

You should provide a MongoDB endpoint where your chats will be written. Note that Hugging Face does not have access to your chats. Below this, you can select the Hugging Face Hub ID of the model you wish to serve. To provide a database You can also change the generation hyperparameters in the dictionary below. 

<a href="Parameters">
    <img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/huggingface.co_spaces_docker_chatui_params.png" />
</a>

Once the creation is complete, you will see `Building` on your Space. After that, you can try your own HuggingChat.

<a href="Hugging Chat Landing UI">
    <img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/huggingface.co_spaces_docker_chatui_ui.png" />
</a>

Start chatting!

<a href="Hugging Chat">
    <img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/huggingface.co_spaces_docker_chatui_chat.png" />
</a>

## More on HF Spaces

- [HF Docker spaces](https://huggingface.co/docs/hub/spaces-sdks-docker)