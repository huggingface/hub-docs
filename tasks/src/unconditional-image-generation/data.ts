import type { TaskDataCustom } from "../Types";

const taskData: TaskDataCustom = {
	datasets: [
		{
			description: "NFT images dataset of 'cryptopunks' for unconditional image generation.",
			id:          "huggingnft/cryptopunks",
		},
		{
			description: "NFT images dataset of 'alpacadabraz' for unconditional image generation.",
			id:          "huggingnft/alpacadabraz",
		},
	],
	demo: {
		inputs: [
			{
				label:   "Input",
				content: "",
				type:    "text",
			},
		],
		outputs: [
			{
				filename: "unconditional-image-generation-output.jpeg",
				type:     "img",
			},
		],
	},
	metrics: [
		{
			description: "The inception score (IS) evaluates the quality of image generative models by using the output of a pre-trained classifier (InceptionV3). It measures that the generated images are diverse (the model predictions are evenly distributed across all possible labels) and distinct (the model confidently predicts a single label for each image).",
			id:          "Inception score (IS)",
		},
		{
			description: "The Fréchet Inception Distance (FID) evaluates the quality of images created by a generative model by calculating the distance between feature vectors for real and generated images.",
			id:          "Frećhet Inception Distance (FID)",
		},
	],
	models: [
		{
			description: "LightWeight GAN model for unconditional generation.",
			id:          "huggingnft/cryptopunks",
		},
		{
			description: "The mode generates high-quality image synthesis using diffusion probabilistic models, a class of latent variable models inspired by considerations from nonequilibrium thermodynamics.",
			id:          "google/ddpm-celebahq-256",
		},
	],
	summary:      "Unconditional image generation is the task of generating images with no condition in any context (prompt text, another image, etc.). Once trained, the model will create images that resemble its training data distribution.",
	widgetModels: "",
	// TODO: Add related video
	youtubeId:    "",
};

export default taskData;
