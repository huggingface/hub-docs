# Tabby on Spaces

[Tabby](https://tabby.tabbyml.com) is an open-source, self-hosted AI coding assistant. With Tabby, every team can set up its own LLM-powered code completion server with ease.

In this guide, you will learn how to deploy your own Tabby instance and use it for development directly from the Hugging Face website.

## Your first Tabby Space

In this section, you will learn how to deploy a Tabby Space and use it for yourself or your orgnization.

### Deploy Tabby on Spaces

You can deploy Tabby on Spaces with just a few clicks:

[![Deploy on HF Spaces](https://huggingface.co/datasets/huggingface/badges/raw/main/deploy-to-spaces-lg.svg)](https://huggingface.co/spaces/TabbyML/tabby-template-space?duplicate=true)

You need to define the Owner (your personal account or an organization), a Space name, and the Visibility. To secure the api endpoint, we're configuring the visibility as Private.

![Duplicate Space](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/tabby/duplicate-space.png)



You’ll see the *Building status*. Once it becomes *Running*, your Space is ready to go. If you don’t see the Tabby Swagger UI, try refreshing the page.

![Swagger UI](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/tabby/swagger-ui.png)

<Tip>

If you want to customize the title, emojis, and colors of your space, go to "Files and Versions" and edit the metadata of your README.md file.

</Tip>

### Your Tabby Space URL

Once Tabby is up and running, for a space link such as https://huggingface.com/spaces/TabbyML/tabby, the direct URL will be https://tabbyml-tabby.hf.space.
This URL provides access to a stable Tabby instance in full-screen mode and serves as the API endpoint for IDE/Editor Extensions to talk with.

### Connect VSCode Extension to Space backend

1. Install the [VSCode Extension](https://marketplace.visualstudio.com/items?itemName=TabbyML.vscode-tabby).
2. Open the file located at `~/.tabby-client/agent/config.toml`. Uncomment both the `[server]` section and the `[server.requestHeaders]` section.
   * Set the endpoint to the Direct URL you found in the previous step, which should look something like `https://UserName-SpaceName.hf.space`.
   * As the Space is set to **Private**, it is essential to configure the authorization header for accessing the endpoint. You can obtain a token from the [Access Tokens](https://huggingface.co/settings/tokens) page.

![Agent Config](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/tabby/agent-config.png)

3. You'll notice a ✓ icon indicating a successful connection.
![Tabby Connected](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/tabby/tabby-connected.png)

4. You've complete the setup, now enjoy tabing!

![Code Completion](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/tabby/code-completion.png)

You can also utilize Tabby extensions in other IDEs, such as [JetBrains](https://plugins.jetbrains.com/plugin/22379-tabby).


## Feedback and support

If you have improvement suggestions or need specific support, please join [Tabby Slack community](https://join.slack.com/t/tabbycommunity/shared_invite/zt-1xeiddizp-bciR2RtFTaJ37RBxr8VxpA) or reach out on [Tabby’s GitHub repository](https://github.com/TabbyML/tabby).
