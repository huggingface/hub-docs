# Using CleanRL at Hugging Face

[CleanRL](https://github.com/vwxyzjn/cleanrl) is a Deep Reinforcement Learning library that provides high-quality single-file implementation with research-friendly features.

CleanRL now has 🧪 experimental support for saving and loading models from 🤗 HuggingFace's Model Hub. We are rolling out this feature in phases, and currently only support saving and loading models from the following algorithm varaints:

| Algorithm      | Variants Implemented |
| ----------- | ----------- |
| ✅ [Deep Q-Learning (DQN)](https://web.stanford.edu/class/psych209/Readings/MnihEtAlHassibis15NatureControlDeepRL.pdf) | :material-github: [`dqn.py`](https://github.com/vwxyzjn/cleanrl/blob/master/cleanrl/dqn.py), :material-file-document: [docs](/rl-algorithms/dqn/#dqnpy) |
| | :material-github: [`dqn_atari.py`](https://github.com/vwxyzjn/cleanrl/blob/master/cleanrl/dqn_atari.py), :material-file-document: [docs](/rl-algorithms/dqn/#dqn_ataripy) |
| | :material-github: [`dqn_jax.py`](https://github.com/vwxyzjn/cleanrl/blob/master/cleanrl/dqn_jax.py), :material-file-document: [docs](/rl-algorithms/dqn/#dqn_jaxpy) |
| | :material-github: [`dqn_atari_jax.py`](https://github.com/vwxyzjn/cleanrl/blob/master/cleanrl/dqn_atari_jax.py), :material-file-document: [docs](/rl-algorithms/dqn/#dqn_atari_jaxpy) |
| ✅ [Categorical DQN (C51)](https://arxiv.org/pdf/1707.06887.pdf) | :material-github: [`c51.py`](https://github.com/vwxyzjn/cleanrl/blob/master/cleanrl/c51.py), :material-file-document: [docs](/rl-algorithms/c51/#c51py) |
| | :material-github: [`c51_atari.py`](https://github.com/vwxyzjn/cleanrl/blob/master/cleanrl/c51_atari.py), :material-file-document: [docs](/rl-algorithms/c51/#c51_ataripy) |
| | :material-github: [`c51_jax.py`](https://github.com/vwxyzjn/cleanrl/blob/master/cleanrl/c51_jax.py), :material-file-document: [docs](/rl-algorithms/c51/#c51_jaxpy) |
| | :material-github: [`c51_atari_jax.py`](https://github.com/vwxyzjn/cleanrl/blob/master/cleanrl/c51_atari_jax.py), :material-file-document: [docs](/rl-algorithms/c51/#c51_atari_jaxpy) |

## Exploring Stable-Baselines3 in the Hub

You can find CleanRL models by filtering at the left of the [models page](https://huggingface.co/models?library=cleanrl).

All models on the Hub come up with useful features:
1. An automatically generated model card with a description, a training configuration, and more.
2. Metadata tags that help for discoverability.
3. A video widget where you can watch your agent performing.

In addition, the CleanRL team is hosting a collection of trained Reinforcement Learning agents with tuned hyperparameters that you can find [here](https://huggingface.co/cleanrl)

The CleanRL team created a colab to help you get started using CleanRL with the Hugging Face Hub: ![Open In Colab](https://github.com/vwxyzjn/cleanrl/raw/master/docs/get-started/colab-badge.svg)](https://colab.research.google.com/github/vwxyzjn/cleanrl/blob/master/docs/get-started/CleanRL_Huggingface_Integration_Demo.ipynb)


## Load models from the Model Hub

We have a simple utility `enjoy.py` to load models from the hub and run them in an environment. We currently support the following commands:

For instance, to load a DQN agent playing `CartPole-v1`:

```bash
poetry install -E dqn
poetry run python -m cleanrl_utils.enjoy --exp-name dqn --env-id CartPole-v1
poetry install -E dqn_jax
poetry run python -m cleanrl_utils.enjoy --exp-name dqn_jax --env-id CartPole-v1

Or loading a `dqn_atari` agent playing `BreakoutNoFrameskip-v4`:

poetry install -E dqn_atari
poetry run python -m cleanrl_utils.enjoy --exp-name dqn_atari --env-id BreakoutNoFrameskip-v4
poetry install -E dqn_atari_jax
poetry run python -m cleanrl_utils.enjoy --exp-name dqn_atari_jax --env-id BreakoutNoFrameskip-v4
```
To see a list of supported models, please visit 🤗 [https://huggingface.co/cleanrl](https://huggingface.co/cleanrl).

If you want to see what's happening under the hood, please visit [https://docs.cleanrl.dev/get-started/zoo/#load-models-from-the-model-hub](https://docs.cleanrl.dev/get-started/zoo/#load-models-from-the-model-hub)

## Save model to Model Hub

In the supported algorithm variants, you can run the script with the `--save-model` flag, which saves a model to the `runs` folder, and the `--upload-model` flag, which upload the model to huggingface under your default entity (username). Optionally, you may override the default entity with `--hf-entity` flag.

```bash
poetry run python cleanrl/dqn_jax.py --env-id CartPole-v1 --save-model --upload-model # --hf-entity cleanrl
poetry run python cleanrl/dqn_atari_jax.py --env-id SeaquestNoFrameskip-v4  --save-model --upload-model # --hf-entity cleanrl
```




## Sharing your models
WIP


## Additional resources
- CleanRL [documentation](https://docs.cleanrl.dev/)


