# Langfuse on Spaces

This guide shows you how to deploy Langfuse on Hugging Face Spaces and start instrumenting your LLM application. This integreation helps you to experiment on Hugging Face models, manage your prompts in one place and evaluate model outputs.

## What is Langfuse?

[Langfuse](https://langfuse.com) is an open-source LLM engineering platform that helps teams collaboratively debug, evaluate, and iterate on their LLM applications. 

Key features of Langfuse include LLM tracing to capture the full context of your application's execution flow, prompt management for centralized and collaborative prompt iteration, evaluation metrics to assess output quality, dataset creation for testing and benchmarking, and a playground to experiment with prompts and model configurations.

_This video is a 10 min walkthrough of the Langfuse features:_
<iframe width="700" height="394" src="https://www.youtube.com/embed/2E8iTvGo9Hs?si=i_mPeArwkWc5_4EO" title="10 min Walkthrough of Langfuse – Open Source LLM Observability, Evaluation, and Prompt Management" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Why LLM Observability?

- As language models become more prevalent, understanding their behavior and performance is important.
- **LLM observability** involves monitoring and understanding the internal states of an LLM application through its outputs.
- It is essential for addressing challenges such as:
  - **Complex control flows** with repeated or chained calls, making debugging challenging.
  - **Non-deterministic outputs**, adding complexity to consistent quality assessment.
  - **Varied user intents**, requiring deep understanding to improve user experience.
- Building LLM applications involves intricate workflows, and observability helps in managing these complexities.

## Step 1: Set up Langfuse on Spaces

The Langfuse Hugging Face Space allows you to get up and running with a deployed version of Langfuse with just a few clicks.

<a  href="https://huggingface.co/spaces/langfuse/langfuse-template-space">
    <img src="https://huggingface.co/datasets/huggingface/badges/resolve/main/deploy-to-spaces-lg.svg" />
</a>

1.1. Create a [**new Hugging Face Space**](https://huggingface.co/new-space)
1.2. Select **Docker** as the Space SDK
1.3. Select **Langfuse** as the Space template
1.4. Enable **persistent storage** to ensure your Langfuse data is persisted across restarts
1.5. For a secure deployment, replace the default values of the **environment variables**:
   - `NEXTAUTH_SECRET`: Used to validate login session cookies, generate secret with at least 256 entropy using `openssl rand -base64 32`.
   - `SALT`: Used to salt hashed API keys, generate secret with at least 256 entropy using `openssl rand -base64 32`.
   - `ENCRYPTION_KEY`: Used to encrypt sensitive data. Must be 256 bits, 64 string characters in hex format, generate via: `openssl rand -hex 32`. You should overwrite the default value here for a secure deployment.

![Clone the Langfuse Space](https://langfuse.com/images/cookbook/huggingface/huggingface-space-setup.png)

## Step 2: Instrument your Code

Now that you have Langfuse running, you can start instrumenting your LLM application to capture traces and manage your prompts.

### Example: Monitor your Gradio Application

We created a Gradio template space that shows how to create a simple chat application using a Hugging Face model and trace model calls and user feedback in Langfuse - without leaving Hugging Face.

<a  href="https://huggingface.co/spaces/langfuse/gradio-example-template">
    <img src="https://huggingface.co/datasets/huggingface/badges/resolve/main/deploy-to-spaces-lg.svg" />
</a>

To get started, clone the [Gradio template space](https://huggingface.co/spaces/langfuse/gradio-example-template) and follow the instructions in the [README](https://huggingface.co/spaces/langfuse/gradio-example-template/blob/main/README.md).

### Monitor Any Application 

Langfuse is model agnostic and can be used to trace any application. Follow the [get-started guide](https://langfuse.com/docs) in Langfuse documentation to see how you can instrument your code.

Langfuse maintains native integrations with many popular LLM frameworks, including [Langchain](https://langfuse.com/docs/integrations/langchain/tracing), [LlamaIndex](https://langfuse.com/docs/integrations/llama-index/get-started) and [OpenAI](https://langfuse.com/docs/integrations/openai/python/get-started) and offers Python and JS/TS SDKs to instrument your code. Langfuse also offers various API endpoints to ingest data and has been integrated by other open source projects such as [Langflow](https://langfuse.com/docs/integrations/langflow), [Dify](https://langfuse.com/docs/integrations/dify) and [Haystack](https://langfuse.com/docs/integrations/haystack/get-started).

## Step 3: View Traces in Langfuse

Once you have instrumented your application, and ingested traces or user feedback into Langfuse, you can view your traces in Langfuse.

![Example trace with Gradio](https://langfuse.com/images/cookbook/huggingface/huggingface-gradio-example-trace.png)

_[Example trace in the Langfuse UI](https://langfuse-langfuse-template-space.hf.space/project/cm4r1ajtn000a4co550swodxv/traces/9cdc12fb-71bf-4074-ab0b-0b8d212d839f?timestamp=2024-12-20T12%3A12%3A50.089Z&view=preview)_

## Additional Resources and Support

- [Langfuse documentation](https://langfuse.com/docs)
- [Langfuse GitHub repository](https://github.com/langfuse/langfuse)
- [Langfuse Discord](https://langfuse.com/discord)
- [Langfuse template Space](https://huggingface.co/spaces/langfuse/langfuse-template-space)

## Troubleshooting

If you encounter issues using the [Langfuse Gradio example template](https://huggingface.co/spaces/langfuse/gradio-example-template):

1. Make sure your notebook runs locally in app mode using `python app.py`
2. Check that all required packages are listed in `requirements.txt`
3. Check Space logs for any Python errors

For more help, open a support ticket on [GitHub discussions](https://langfuse.com/discussions) or [open an issue](https://github.com/langfuse/langfuse/issues).