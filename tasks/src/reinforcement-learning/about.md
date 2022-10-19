## Use Cases


### Applications in autonomous driving

Autonomous or self-driving cars are pretty trending nowadays. It is also a big step towards driverless commute where the machine is itself able to perform the task. A machine learning model can back the vehicle without any driver. 

In self-driving cars, there are various problems, such as speed limits or drivable zones. The collection of this variety of situations is a challenging problem to solve.

Reinforcement learning can be used to train a model for self-driving cars. Reinforcement Learning models are trained in a dynamic environment by learning a policy from its own experiences, following the principles of exploration and exploitation that minimize disruption to traffic. 

The exploration-exploitation trade-off is a fundamental dilemma whenever you learn about the world by trying things out. The dilemma is between choosing what you know and getting something close to what you expect (‘exploitation’) and choosing something you aren’t sure about and possibly learning more (‘exploration’). 

Exploitation consists of taking the decision assumed to be optimal with respect to the data observed so far. This SAFE approach tries to avoid bad decisions as much as possible but also prevents from discovering potential better decisions.

Exploration consists of not taking the decision that seems to be optimal, assuming that the available data is not sufficient to find the truly optimal solution. This more RISKY approach can sometimes lead to poor decisions but also makes it possible to discover better ones, if there exists any.

Deep Reinforcement learning can learn by itself to operate autonomously in extreme conditions. The dynamic double deep Q-learning (DDQN) model enables the proposed system not be confined to only in known environments. The exploration and exploitation strategies of DDQN enables the autonomous agent to learn proper decisions for various dynamic environments and tracks. The proposed model is tested in a gaming environment. It shows the overall effectiveness in traversing of autonomous land vehicles. The goal is to make the system effective to traverse through undiscovered parts by detecting obstacles.

Scenario based methods for testing and validation of automated driving systems (ADS) in virtual test environments are gaining importance and becoming an essential component for verification and validation processes of ADS. The increase in the cost and complexity of real testing lead to an highly increased efforts in real world testing. Using scenario and simulation based approaches this effort can be efficiently reduced with respect to costs and time. Research has shown that it is necessary to drive and test billions of kilometers to ensure safety of ADS which would not be possible considering the time and cost effort for real testing. The biggest challenges are the selection of a suitable simulation framework and the selection of relevant scenarios for the system under test.

Some of the autonomous driving tasks where reinforcement learning could be applied include trajectory optimization, motion planning, dynamic path finding, controller optimization, and scenario-based learning policies for highways. Reinforcement Learning agents are trained in dynamic environments to optimize trajectories. The agents are capable of accomplishing tasks such as motion planning, route changing, decision and position of parking and speed control.


### NLP (Natural Language processing)

NLP is a branch of machine learning or artificial intelligence concerned with allowing computers to understand the text and spoken words the same way as a human does.  

Language understanding uses Reinforcement Learning because of its inherent nature of decision making it learns from the mistakes. The agent tries to understand the state of the sentence and tries to form an action set maximizing the value it would add.

Reinforcement Learning is used in various NLP tasks such as text summarization, question answering, translation, dialogue generation, or machine translation.

Reinforcement Learning agents can be trained to understand a few sentences of the document and use it to answer the corresponding questions.

Robots in industries or healthcare working towards reducing manual intervention use reinforcement learning to map natural language instructions to sequences of executable actions. During training, the learner repeatedly constructs action sequences, executes those actions, and observes the resulting rewards. A reward function works in the backend that defines the quality of these executed actions.

### Robotics 

Robots operate in a highly dynamic and ever-changing environment, making it impossible to predict what will happen next. Reinforcement Learning provides a considerable advantage in these scenarios to make the robots robust enough and help acquire complex behaviors adaptively in different scenarios.

It aims to remove the need for time-consuming and tedious checks and replaces them with computer vision systems ensuring higher levels of quality control on the production assembly line.

A wide variety of problems in robotics can be considered as ones of reinforcement learning. Reinforcement learning (RL) enables a robot to autonomously discover an optimal behavior through trial-and-error interactions with its environment. Instead of explicitly detailing the solution to a problem, in reinforcement learning the designer of a control task provides feedback in terms of a scalar objective function that measures the one-step performance of the robot.

## Task Variants 

### Q - Learning

* It is used to learn the policy for reinforcement learning
* Policy: a rule that the agent should follow to select actions given the current state.
* Q - learning is to find the optimal policy for making decisions
* Q-function[Q(s,a)]: returns Q-value for action a at state s. Learning an action-value function, a.k.a. Q function, that computes the expected utility of taking an action in a state after training converges.
* it will find the best course of action, given the current state of the agent. Depending on where the agent is in the environment, it will decide the next action to be taken.

With the help of Q - value and advanced statistics we can find the Deep - Q - Network. You all must have heard of a game called chess. nowadays it is mostly played online, also you don't need a second player to play, you can just play against a bot and also get defeated, which leaves you thinking how can a machine beat me. Well, because it is learning. 

Now, the thing to understand is when training the learner for games like Chess, the agent has a very small action space, but large state space. For example, in the game of chess, the state space is the whole 20X20 board, but the action space is small like a pawn can move only in 1–2 directions. Deep-Q-Network has been proven to be very effective.

But when we talk about reinforcement learning for natural language processing there are few problems which are discussed below:

#### Sequential decision making problem for text understanding

Agent observes state as a string of text at a time 't'. Agent also knows a set of possible actions, each describes as a string text. Agent tries to understand the “state text” and all possible “action texts”, then takes a decision which maximizes the long term reward. Then, the environment state transits to a new state, agent receives an immediate reward.

#### Unbounded action space in reinforcement learning

Not only the state space is huge, but the action space is also huge too. Action is characterized by unbounded natural language descriptions. For example, if say to the model “Hi! how are you? Have you eaten your lunch? Don't forget to call me tomorrow as it is the bigday ”. Well, this input text from me is the state-space for the model(quite heavy), and the action space is every text combination available(or infinity). This problem for such a huge action space was still the problem in Deep-Q-Network.

For solving this problem DRRN(deep reinforcement relevance network) was proposed. The idea of DRRN is to project both the state and action into a continuous space(as vectors). Q-function is a relevance function of the state vector and action vector.the DRRN experiences higher average reward.

Chatbot dialogues can be improved using Deep Reinforcement Learning. Conversations are simulated using two virtual agents, and the quality is improved in progressive iterations.



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


