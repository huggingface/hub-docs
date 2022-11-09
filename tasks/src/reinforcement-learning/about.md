## Use Cases

### Gaming

Reinforcement learning is known for its application to video games. Since the games provide a safe environment for the agent to be trained in the sense that it is perfectly defined and controllable, this makes them perfect candidates for experimentation and will help a lot to learn about the capabilities and limitations of various RL algorithms. 


There are many videos on the Internet where a game-playing reinforcement learning agent starts with a terrible gaming strategy due to random initialization of its settings, but over iterations, the agent gets better and better with each episode of the training. This [paper](https://arxiv.org/abs/1912.10944) mainly investigates the performance of RL in popular games such as Minecraft or Dota2. The agent's performance can exceed a human player's, although there are still some challenges mainly related to efficiency in constructing the gaming policy of the reinforcement learning agent.


## Task Variants 

This place can be filled with variants of this task if there's any. 

## Glossary

<!-- ![RL Loop](https://huggingface.co/blog/assets/63_deep_rl_intro/RL_process.jpg "Agent Environment Interaction") TODO: Uncomment image for visual understanding if it fits within the page--> 


**Agent:** The learner and the decision maker.


**Environment:** The part of the world the agent interacts, comprising everything outside the agent.


**State:** Information the agent receives from the environment. In the case of a video game it can be a frame (a screenshot), in the case of a chess playing agent it can be the board position, in the case of a trading agent it can be the price of a certain stock.


**Action:** The decision taken by the agent.


**Reward:** The numerical feedback signal that the agent receives from the environment based on the chosen action

**Return:** Cumulative Reward.  In the simplest case, the return is the sum of the rewards.


**Episode:** For some applications there is a natural notion of final time step.  In this case, there is a starting point and an ending point (a terminal state). This creates an episode: a list of States, Actions, Rewards, and new States. For instance, think about Chess: an episode begins at the initial board position and ends when the game is over.

**Policy:** The Policy is the brain of the Agent, it’s the function that tells what action to take given the state. So it defines the agent’s behavior at a given time. Reinforcement learning methods specify how the agent’s policy is changed as a result of its experience.

## Inference

This section should have useful information about how to pull a model from Hugging Face Hub that is a part of a library specialized in a task and use it.

## Useful Resources

Would you like to learn more about the topic? Awesome! Here you can find some curated resources that you may find helpful!

- [HuggingFace Deep Reinforcement Learning Class](https://github.com/huggingface/deep-rl-class)
- [Introduction to Deep Reinforcement Learning](https://huggingface.co/blog/deep-rl-intro)
- [Stable Baselines Integration with HuggingFace](https://huggingface.co/blog/sb3)

### Notebooks
- [Train a Deep Reinforcement Learning lander agent to land correctly on the Moon 🌕 using Stable-Baselines3](https://github.com/huggingface/deep-rl-class/blob/main/unit1/unit1.ipynb)
- [Introduction to Unity MLAgents](https://colab.research.google.com/github/huggingface/deep-rl-class/blob/main/unit4/unit4.ipynb)
- [Training Decision Transformers with 🤗 transformers](https://github.com/huggingface/blog/blob/main/notebooks/101_train-decision-transformers.ipynb)
