## Use Cases

### Gaming

Reinforcement learning is known for its application to video games. Since the games provide a safe environment for the agent to be trained in the sense that it is perfectly defined and controllable, this makes them perfect candidates for experimentation and will help a lot to learn about the capabilities and limitations of various RL algorithms. 


There are many videos on the Internet where a game-playing reinforcement learning agent starts with a terrible gaming strategy due to random initialization of its settings, but over iterations, the agent gets better and better with each episode of the training. This [paper](https://arxiv.org/abs/1912.10944) mainly investigates the performance of RL in popular games such as Minecraft or Dota2. The agent's performance can exceed a human player's, although there are still some challenges mainly related to efficiency in constructing the gaming policy of the reinforcement learning agent.


### Trading and Finance
Reinforcement learning is the science to train computers to make decisions and thus has a novel use in trading and finance. All time-series models are helpful in predicting prices, volume and future sales of a product or a stock. Reinforcement based automated agents can decide to sell, buy or hold a stock. It shifts the impact of AI in this field to real time decision making rather than just prediction of prices. The glossary given below will clear some parameters to as to how we can train a model to take these decisions.



## Task Variants 

You can contribute variants of this task [here](https://github.com/huggingface/hub-docs/blob/main/tasks/src/reinforcement-learning/about.md).

## Glossary

<!-- ![RL Loop](https://huggingface.co/blog/assets/63_deep_rl_intro/RL_process.jpg "Agent Environment Interaction") TODO: Uncomment image for visual understanding if it fits within the page--> 


**Agent:** The learner and the decision maker.


**Environment:** The part of the world the agent interacts, comprising everything outside the agent.


Observations and states are the information our agent gets from the environment. In the case of a video game, it can be a frame (a screenshot). In the case of the trading agent, it can be the value of a certain stock.


**State:** Complete description of the state of the environment with no hidden information.


**Observation:** Partial description of the state, in a partially observed environment.



**Action:** The decision taken by the agent.

**Reward:** The numerical feedback signal that the agent receives from the environment based on the chosen action.


**Return:** Cumulative Reward.  In the simplest case, the return is the sum of the rewards.


**Episode:** For some applications there is a natural notion of final time step.  In this case, there is a starting point and an ending point (a terminal state). This creates an episode: a list of States, Actions, Rewards, and new States. For instance, think about Chess: an episode begins at the initial board position and ends when the game is over.

**Policy:** The Policy is the brain of the Agent, it’s the function that tells what action to take given the state. So it defines the agent’s behavior at a given time. Reinforcement learning methods specify how the agent’s policy is changed as a result of its experience.

## Inference

You can add a small snippet [here](https://github.com/huggingface/hub-docs/blob/main/tasks/src/reinforcement-learning/about.md) that shows how to infer with `reinforcement-learning` models.

## Useful Resources

Would you like to learn more about the topic? Awesome! Here you can find some curated resources that you may find helpful!

- [HuggingFace Deep Reinforcement Learning Class](https://github.com/huggingface/deep-rl-class)
- [Introduction to Deep Reinforcement Learning](https://huggingface.co/blog/deep-rl-intro)
- [Stable Baselines Integration with HuggingFace](https://huggingface.co/blog/sb3)

### Notebooks
- [Train a Deep Reinforcement Learning lander agent to land correctly on the Moon 🌕 using Stable-Baselines3](https://github.com/huggingface/deep-rl-class/blob/main/unit1/unit1.ipynb)
- [Introduction to Unity MLAgents](https://colab.research.google.com/github/huggingface/deep-rl-class/blob/main/unit4/unit4.ipynb)
- [Training Decision Transformers with 🤗 transformers](https://github.com/huggingface/blog/blob/main/notebooks/101_train-decision-transformers.ipynb)

This page was made possible thanks to the efforts of [Ram Ananth](https://huggingface.co/RamAnanth1), [Emilio Lehoucq](https://huggingface.co/emiliol) and [Osman Alenbey](https://huggingface.co/osman93).
