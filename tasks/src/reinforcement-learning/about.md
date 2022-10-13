## Use Cases

### Gaming

Reinforcement learning is known for its application to video games. Since the games provide a safe environment to the agent to be trained in the sense that it is perfectly defined and controllable. This makes them perfect candidates for experimentation and will help a lot to learn about the capabilities and limitations of various RL algorithms. 

Many example videos can be found on the Internet where the RL agent starts with a really bad gaming strategy due to random initialization but gets better and better with each episode of the training. This [paper](https://arxiv.org/abs/1912.10944) particularly investigates the performance of RL on popular games such as Minecraft or Dota2. Usually super-human level can be reached although there are still some challenges mostly related to efficiency to construct the gaming policy of the RL agent.

### Healthcare

RL techniques can be used to recommend optimal treatments to the patients based on certain readings of the patients like vital signs or laboratory measurements. The usage of RL is advantageous because other automated systems in healthcare are based on models that rely on human knowledge whereas RL constructs the necessary models using past experiences. The optimal actions in this case can be dosage of a medication, optimal settings of a medical machine etc.

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

## References 

[1] P. Isola, J. -Y. Zhu, T. Zhou and A. A. Efros, "Image-to-Image Translation with Conditional Adversarial Networks," 2017 IEEE Conference on Computer Vision and Pattern Recognition (CVPR), 2017, pp. 5967-5976, doi: 10.1109/CVPR.2017.632.
