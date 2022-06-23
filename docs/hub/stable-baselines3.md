# Using Stable-Baselines3 at Hugging Face

`stable-baselines3` is a set of reliable implementations of reinforcement learning algorithms in PyTorch.

## Exploring Stable-Baselines3 in the Hub

You can find Stable-Baselines3 models by filtering at the left of the [models page](https://huggingface.co/models?library=stable-baselines3).

All models on the Hub come up with useful features:
1. An automatically generated model card with a description, a training configuration, and more.
2. Metadata tags that help for discoverability.
3. A video widget where you can watch your agent performing.

## Install the library
To install the `stable-baselines3` library, you need to install two packages:
- `stable-baselines3`: Stable-Baselines3 library.
- `huggingface-sb3`: additional code to load and upload Stable-baselines3 models from the Hub.
```
pip install stable-baselines3
pip install huggingface-sb3
```

## Using existing models
You can simply download a model from the Hub using the `load_from_hub` function

```
checkpoint = load_from_hub(
    repo_id="sb3/demo-hf-CartPole-v1",
    filename="ppo-CartPole-v1.zip",
)
```

You need to define two parameters:
- `--repo-id`: the name of the Hugging Face repo you want to download.
- `--filename`: the file you want to download.


## Sharing your models
You can easily upload your models using two different functions:

1. `package_to_hub()`: save the model, evaluate it, generate a model card and record a replay video of your agent before pushing the complete repo to the Hub.

```
package_to_hub(model=model, 
               model_name="ppo-LunarLander-v2",
               model_architecture="PPO",
               env_id=env_id,
               eval_env=eval_env,
               repo_id="ThomasSimonini/ppo-LunarLander-v2",
               commit_message="Test commit")
```

You need to define seven parameters:
- `--model`: your trained model.
- `--model_architecture`: name of the architecture of your model (DQN, PPO, A2C, SAC...).
- `--env_id`: name of the environment.
- `--eval_env`: environment used to evaluate the agent.
- `--repo-id`: the name of the Hugging Face repo you want to create or update. It’s `<your huggingface username>/<the repo name>`.
- `--commit-message`.
- `--filename`: the file you want to push to the Hub.

2. `push_to_hub()`: simply push a file to the Hub

```
push_to_hub(
    repo_id="ThomasSimonini/ppo-LunarLander-v2",
    filename="ppo-LunarLander-v2.zip",
    commit_message="Added LunarLander-v2 model trained with PPO",
)
```
You need to define three parameters:
- `--repo-id`: the name of the Hugging Face repo you want to create or update. It’s `<your huggingface username>/<the repo name>`.
- `--filename`: the file you want to push to the Hub.
- `--commit-message`.


## Additional resources
- Hugging Face Stable-Baselines3 [documentation](https://github.com/huggingface/huggingface_sb3#hugging-face--x-stable-baselines3-v20)
- Stable-Baselines3 [documentation](https://stable-baselines3.readthedocs.io/en/master/)
