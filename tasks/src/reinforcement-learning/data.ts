import type { TaskDataCustom } from "../Types";

const taskData: TaskDataCustom = {
	datasets: [
		{
			description: "A curation of widely used datasets for Data Driven Deep Reinforcement Learning (D4RL)",
			id:          "edbeeching/decision_transformer_gym_replay",
		}
	],
    demo:     {
		inputs:  [],
		outputs: [],
	},
    metrics: [{
        description: "Average return obtained after running the policy for a certain number of evaluation episodes ",
        id:          "Mean Reward",
    }],
	models: [
        {
			description: "A Transformer-based Reinforcement Learning model trained on expert data from the Gym Hopper environment",
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
