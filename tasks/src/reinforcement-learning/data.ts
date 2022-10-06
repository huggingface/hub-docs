import type { TaskDataCustom } from "../Types";

const taskData: TaskDataCustom = {
	datasets: [
		{
			description: "A subset of widely used Datasets for Data Driven Deep Reinforcement Learning (D4RL)",
			id:          "edbeeching/decision_transformer_gym_replay",
		}
	],
    demo:     {
		inputs:  [],
		outputs: [],
	},
    metrics: [{
        description: "Mean reward per episode obtained after running policy for a certain number of evaluation episodes ",
        id:          "Mean Reward",
    }],
    isPlaceholder: true,
	models: [
        {
			description: "A Decision Transformer model trained on expert trajectories sampled from the Gym Hopper environment",
			id:          "edbeeching/decision-transformer-gym-hopper-expert",
		},
		{
			description: "A PPO agent playing seals/CartPole-v0 using the stable-baselines3 library and the RL Zoo.",
			id:          "HumanCompatibleAI/ppo-seals-CartPole-v0",
		},
	
	],
	summary:      "Reinforcement learning is the computational approach of learning from action by interacting with an environment through trial and error and receiving rewards (negative or positive) as feedback",
	widgetModels: [],
	youtubeId:    "q0BiUn5LiBc",
};

export default taskData;
