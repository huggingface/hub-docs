# Use Agent Skills with SageMaker AI

[Hugging Face Agent Skills](https://github.com/huggingface/skills) give coding agents reusable instructions, scripts, and safeguards for AI and ML workflows. The `hf-cloud-*` skills guide an agent through a SageMaker AI deployment, from discovering your AWS context to selecting a container, creating an endpoint, validating it, and cleaning it up.

These skills control SageMaker resources. They are independent of the model that powers your agent, so you can use them whether the agent itself runs on a local model, a SageMaker endpoint, Amazon Bedrock, or another provider.

The `hf-cli` skill covers Hugging Face Hub operations such as finding models and managing repositories. The `hf-cloud-*` skills cover the AWS deployment lifecycle. Install both when an agent needs to select a model from the Hub and deploy it to SageMaker AI.

## Install the skills

Install the Hugging Face CLI if it is not already available:

```bash
curl -LsSf https://hf.co/cli/install.sh | bash
```

Install the SageMaker skills:

```bash
hf skills add hf-cloud-aws-context-discovery
hf skills add hf-cloud-python-env-setup
hf skills add hf-cloud-sagemaker-deployment-planner
hf skills add hf-cloud-sagemaker-iam-preflight
hf skills add hf-cloud-sagemaker-production-defaults
hf skills add hf-cloud-serving-image-selection
```

The CLI installs each skill with its supporting scripts, references, and templates. Run `hf skills update` to fetch newer versions later.

If your harness does not have a location that the CLI detects automatically, pass `--dest` with one of its Agent Skills directories. For example, Pi discovers `.agents/skills/`, Hermes Agent discovers `~/.hermes/skills/`, and Tau discovers `~/.tau/skills/` and `~/.agents/skills/`.

## Available SageMaker skills

<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 my-6 not-prose">
  <a class="group rounded-xl border border-gray-200 px-5 py-4 no-underline! dark:border-gray-800" href="https://github.com/huggingface/skills/tree/main/skills/hf-cloud-sagemaker-deployment-planner">
    <div class="font-semibold text-gray-900 group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-300">Deployment planner</div>
    <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">Chooses real-time, scale-to-zero, async, serverless, batch, or Bedrock based on the model and traffic.</p>
  </a>
  <a class="group rounded-xl border border-gray-200 px-5 py-4 no-underline! dark:border-gray-800" href="https://github.com/huggingface/skills/tree/main/skills/hf-cloud-aws-context-discovery">
    <div class="font-semibold text-gray-900 group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-300">AWS context discovery</div>
    <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">Reads the active AWS profile, Region, account, credentials, and caller identity without guessing.</p>
  </a>
  <a class="group rounded-xl border border-gray-200 px-5 py-4 no-underline! dark:border-gray-800" href="https://github.com/huggingface/skills/tree/main/skills/hf-cloud-python-env-setup">
    <div class="font-semibold text-gray-900 group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-300">Python environment setup</div>
    <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">Creates an isolated Python environment with current AWS dependencies.</p>
  </a>
  <a class="group rounded-xl border border-gray-200 px-5 py-4 no-underline! dark:border-gray-800" href="https://github.com/huggingface/skills/tree/main/skills/hf-cloud-sagemaker-iam-preflight">
    <div class="font-semibold text-gray-900 group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-300">IAM preflight</div>
    <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">Finds and validates an existing SageMaker execution role before attempting to create one.</p>
  </a>
  <a class="group rounded-xl border border-gray-200 px-5 py-4 no-underline! dark:border-gray-800" href="https://github.com/huggingface/skills/tree/main/skills/hf-cloud-serving-image-selection">
    <div class="font-semibold text-gray-900 group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-300">Serving image selection</div>
    <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">Matches the model to a current Hugging Face DLC and resolves the correct regional image URI.</p>
  </a>
  <a class="group rounded-xl border border-gray-200 px-5 py-4 no-underline! dark:border-gray-800" href="https://github.com/huggingface/skills/tree/main/skills/hf-cloud-sagemaker-production-defaults">
    <div class="font-semibold text-gray-900 group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-300">Production defaults</div>
    <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">Deploys with autoscaling, alarms, tags, smoke tests, and a safe teardown path.</p>
  </a>
</div>

## How the workflow runs

When you ask an agent to deploy a model, the skills work together:

1. The deployment planner identifies the model type, traffic pattern, latency needs, and cost constraints.
2. AWS context discovery resolves the active profile, Region, account, and caller identity.
3. Python environment setup creates an isolated environment for the AWS tooling.
4. IAM preflight finds and validates a SageMaker execution role.
5. Serving image selection chooses the correct Hugging Face DLC and regional image URI.
6. Production defaults creates the endpoint with autoscaling and alarms, runs a real invocation, checks logs, and provides the teardown command.

The planner asks for confirmation before creating paid resources. It also checks endpoint quotas before recommending an instance type when permissions allow.

## Ask your agent

Once the skills are installed, describe the outcome rather than the AWS plumbing. For example:

```text
Deploy Qwen/Qwen3.8-27B to SageMaker for an internal coding agent.
Traffic will be low but interactive, and I want to minimize idle cost.
```

```text
Deploy BAAI/bge-large-en-v1.5 as a production embedding endpoint.
Use my current AWS profile and pick a cost-effective CPU instance.
```

```text
Check whether the SageMaker endpoint named my-endpoint is healthy,
run a smoke test, and inspect its recent errors.
```

```text
Tear down the endpoint my-endpoint and its associated autoscaling
policies and alarms.
```

You can also name a skill explicitly:

```text
Use hf-cloud-serving-image-selection to choose the right container
for Qwen/Qwen3-Reranker-4B.
```

## Review before the agent acts

An Agent Skill is guidance and executable support code, not an additional AWS permission boundary. The agent can only perform actions allowed by the AWS identity in the active shell.

Before approving a deployment, review:

- The AWS profile, Region, and account.
- The endpoint type and instance type.
- The estimated idle and traffic costs.
- The IAM execution role.
- Whether the endpoint needs VPC, KMS, or data-capture settings that are specific to your organization.

Keep IAM permissions narrow and retain the teardown command printed at the end of a deployment. SageMaker real-time endpoints incur charges while they remain in service.
