# Using RL-Baselines3-Zoo at Hugging Face

`rl-baselines3-zoo` is a training framework for Reinforcement Learning using Stable Baselines3.

## Exploring RL-Baselines3-Zoo in the Hub

You can find RL-Baselines3-Zoo models by filtering at the left of the [models page](https://huggingface.co/models?library=stable-baselines3).

The Stable-Baselines3 team is hosting a collection of +150 trained Reinforcement Learning agents with tuned hyperparameters that you can find [here](https://huggingface.co/sb3).

All models on the Hub come up with useful features:
1. An automatically generated model card with a description, a training configuration, and more.
2. Metadata tags that help for discoverability.
3. Evaluation results to compare with other models.
4. A video widget where you can watch your agent performing.

## Using existing models
You can simply download a model from the Hub using `load_from_hub`:

```
# Download ppo SpaceInvadersNoFrameskip-v4 model and save it into the logs/ folder
python -m rl_zoo3.load_from_hub --algo dqn --env SpaceInvadersNoFrameskip-v4 -f logs/ -orga sb3
python enjoy.py --algo dqn --env SpaceInvadersNoFrameskip-v4  -f logs/
```

You can define three parameters:
- `--repo-name`: The name of the repo.
- `-orga`: A Hugging Face username or organization.
- `-f`: The destination folder.

## Sharing your models
You can easily upload your models with `push_to_hub`. That will save the model, evaluate it, generate a model card and record a replay video of your agent before pushing the complete repo to the Hub.

```
python -m rl_zoo3.push_to_hub  --algo dqn  --env SpaceInvadersNoFrameskip-v4  --repo-name dqn-SpaceInvadersNoFrameskip-v4  -orga ThomasSimonini  -f logs/
```

You can define three parameters:
- `--repo-name`: The name of the repo.
- `-orga`: Your Hugging Face username.
- `-f`: The folder where the model is saved.


## Additional resources

* RL-Baselines3-Zoo [official trained models](https://huggingface.co/sb3)
* RL-Baselines3-Zoo [documentation](https://github.com/DLR-RM/rl-baselines3-zoo)
