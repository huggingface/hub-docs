# Quickstart

<div class="flex justify-center my-6">
  <img class="rounded-xl border border-gray-200 dark:border-gray-800" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/sagemaker/hub-deploy-aws-modal.png"
     alt="The Deploy on AWS modal on a Hugging Face model page"
     width="640">
</div>

The easiest way to deploy a model from the Hugging Face Hub to AWS starts on the model page itself. Every model page has a **Deploy** button that opens the **Deploy on AWS** modal, which offers two paths depending on the model:

- **One-click deployment with JumpStart** for eligible models.
- **Copy-paste-ready SageMaker Python SDK snippets** for every other model.

## Deploy JumpStart models with one click

<div class="flex justify-center my-6">
  <img class="rounded-xl border border-gray-200 dark:border-gray-800" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/sagemaker/hub-one-click-aws-deploy.gif"
     alt="One-click deployment of a Hugging Face model to SageMaker AI Studio with the JumpStart integration"
     width="640">
</div>

Models available on [JumpStart](https://aws.amazon.com/sagemaker-ai/jumpstart/) show a one-click integration in the modal. Clicking **Deploy** takes you straight to SageMaker AI Studio with a preconfigured deployment: the model artifacts, the serving container, and a sensible default instance type are resolved for you. Before confirming, you can customize the deployment in Studio, for example the instance type, instance count, or endpoint name.

The recording below shows the whole flow, from the model page on the Hub to a running endpoint in SageMaker AI Studio:

## Deploy any model with the SageMaker Python SDK

<div class="flex justify-center my-6">
  <img class="rounded-xl border border-gray-200 dark:border-gray-800" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/sagemaker/hub-deploy-aws-sdk-tab.png"
     alt="The SageMaker SDK tab in the Deploy on AWS modal"
     width="640">
</div>

If you still prefer to deploy your models manually, the modal includes a SageMaker SDK tab with curated snippets for deployment and customization. The snippets are copy-paste ready: they use the [SageMaker Python SDK](https://github.com/aws/sagemaker-python-sdk) with the Hugging Face [Deep Learning Containers](./dlcs) and work as-is from a local environment or a SageMaker notebook. Adjust the model ID, instance type, or container configuration to fit your workload.

## Next steps

This page covers the fastest paths from the Hub to a running endpoint. For more in-depth workflows, head to the dedicated sections:
    
- [SageMaker SDK](../tutorials/sagemaker-sdk/sagemaker-sdk-quickstart): programmatic deployment and training with the Python SDK, from quickstart to production setups.
- [JumpStart](../tutorials/jumpstart/jumpstart-quickstart): the JumpStart model catalog, deployment options, and customization in detail.
