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

## Use Cases
### Applications in autonomous driving
Autonomous or self-driving cars are pretty trending nowadays. It is also a big step towards driverless commute where the machine is itself able to perform the task. A machine learning model can back the vehicle without any driver. 

In self-driving cars, there are various problems, such as speed limits or drivable zones. The collection of this variety of situations is a challenging problem to solve.

Reinforcement learning can be used to train a model for self-driving cars. Reinforcement Learning models are trained in a dynamic environment by learning a policy from its own experiences, following the principles of exploration and exploitation that minimize disruption to traffic. 

The exploration-exploitation trade-off is a fundamental dilemma whenever you learn about the world by trying things out. The dilemma is between choosing what you know and getting something close to what you expect (‘exploitation’) and choosing something you aren’t sure about and possibly learning more (‘exploration’). 

The deep reinforcement learning algorithms can learn to operate in unknown conditions. The dynamic-double deep Q-learning model makes the system to not be limited only in known environments. The exploration-exploitation trade-off enables the system to make decisions in lesser known environments. 

Some of the autonomous driving tasks where reinforcement learning could be applied include trajectory optimization, motion planning, dynamic path finding, controller optimization, and scenario-based learning policies for highways. Reinforcement Learning agents are trained in dynamic environments to optimize trajectories. The agents are capable of accomplishing tasks such as motion planning, route changing, decision and position of parking and speed control.


### NLP (Natural Language processing)
Natural language processing is a branch of machine learning concerned with allowing computers to understand text and spoken words the same way a human does.  

Dialogue systems use reinforcement learning because of its inherent nature of decision-making. It learns from mistakes. The system tries to understand the sentence's state and form an action set maximizing the value it would add. Reinforcement Learning is used in various NLP tasks such as text summarization, question answering, translation, dialogue generation, or machine translation. Reinforcement Learning agents can be trained to understand a few sentences of the document and use it to answer the corresponding questions.

Robots in industries or healthcare working towards reducing manual intervention use reinforcement learning to map natural language instructions to sequences of executable actions. During training, the learner repeatedly constructs action sequences, executes those actions, and observes the resulting rewards. A reward function works in the backend that defines the quality of these executed actions.

### Robotics 

Robots operate in a highly dynamic and ever-changing environment, making it impossible to predict what will happen next. Reinforcement Learning provides a considerable advantage in these scenarios to make the robots robust enough and help acquire complex behaviors adaptively in different scenarios. It aims to remove the need for time-consuming and tedious checks and replaces them with computer vision systems ensuring higher levels of quality control on the production assembly line.

A wide variety of problems in robotics can be considered problems related to reinforcement learning. Reinforcement learning enables a robot to autonomously discover an optimal behavior by interacting with its environment.

## Task Variants 

### Q - Learning

Q - learning will find the best course of action, given the agent's current state. Depending on where the agent is in the environment, it will decide the following action to be taken. It chooses the action such that it maximizes the reward.

#### Sequential decision making problem for text understanding

Agent observes state as a string of text at a time 't'. Agent also knows a set of possible actions, each describes as a string text. Agent tries to understand the “state text” and all possible “action texts”, then takes a decision which maximizes the long term reward. Then, the environment state changes to a new state, agent receives an immediate reward.

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
