import type { TaskDataCustom } from "../Types";

const taskData: TaskDataCustom = {
	datasets: [
		{
			description: "The CIFAR-100 dataset consists of 60000 32x32 colour images in 100 classes, with 600 images per class.",
			id:          "cifar100",
		},
		{
			description: "Multiple images of celebrities, used for facial expression translation.",
			id:          "CelebA",
		},
	],
	demo: {
		inputs: [
			{
				filename: "unconditional-image-generation/unconditional-image-generation-input.png",
				type:    "img",
			},
		],
		outputs: [
			{
				filename: "unconditional-image-generation/unconditional-image-generation-output.png",
				type:     "img",
			},
		],
	},
	metrics: [
		{
			description: "The inception score (IS) evaluates the quality of generated images. It measures the diversity of the generated images (the model predictions are evenly distributed across all possible labels) and their 'distinction' or 'sharpness' (the model confidently predicts a single label for each image).",
			id:          "Inception score (IS)",
		},
		{
			description: "The Fréchet Inception Distance (FID) evaluates the quality of images created by a generative model by calculating the distance between feature vectors for real and generated images.",
			id:          "Frećhet Inception Distance (FID)",
		},
	],
	models: [
		{
			description: "High-quality image generation model trained on the CIFAR-10 dataset. It synthesizes images of the ten classes presented in the dataset using diffusion probabilistic models, a class of latent variable models inspired by considerations from nonequilibrium thermodynamics.",
			id:          "google/ddpm-cifar10-32",
		},
		{
			description: "High-quality image generation model trained on the 256x256 CelebA-HQ dataset. It synthesizes images of faces using diffusion probabilistic models, a class of latent variable models inspired by considerations from nonequilibrium thermodynamics.",
			id:          "google/ddpm-celebahq-256",
		},
	],
	summary:      "Unconditional image generation is the task of generating images with no condition in any context (prompt text, another image, etc.). Once trained, the model will create images that resemble its training data distribution.",
	widgetModels: ["google/vit-base-patch16-224"],
	// TODO: Add related video
	youtubeId:    "",
};

export default taskData;
