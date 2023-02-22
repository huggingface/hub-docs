import type { TaskDataCustom } from "../Types";

const taskData: TaskDataCustom = {
	datasets: [
		{
			description: "Synthetic dataset, for image relighting",
			id:          "VIDIT",
		},
		{
			description: "Multiple images of celebrities, used for facial expression translation",
			id:          "huggan/CelebA-faces",
		},
	],
	demo: {
		inputs: [
			{
				filename: "image-to-image-input.jpeg",
				type:     "img",
			},
		],
		outputs: [
			{
				filename: "image-to-image-output.png",
				type:     "img",
			},
		],
	},
	isPlaceholder: false,
	metrics:       [
		{
			description: "Peak Signal to Noise Ratio (PSNR) is an approximation of the human perception, considering the ratio of the absolute intensity with respect to the variations. Measured in dB, a high value indicates a high fidelity.",
			id:          "PSNR",
		},
		{
			description: "Structural Similarity Index (SSIM) is a perceptual metric which compares the luminance, contrast and structure of two images. The values of SSIM range between -1 and 1, and higher values indicate closer resemblance to the original image.",
			id:          "SSIM",
		},
		{
			description: "Inception Score (IS) is an analysis of the labels predicted by an image classification model when presented with a sample of the generated images.",
			id:          "IS",
		},
	],
	models: [
		{
			description: "A model that enhances images captured in low light conditions.",
			id:          "keras-io/low-light-image-enhancement",
		},
		{
			description: "A model that increases the resolution of an image.",
			id:          "keras-io/super-resolution",
		},
		{
			description: "A model that creates a set of variations of the imput image in the style of DALL-E using Stable Diffusion.",
			id:          "lambdalabs/sd-image-variations-diffusers",
		},
	],
	spaces:       [
		{
			description: "Image enhancer application for low light.",
			id:          "keras-io/low-light-image-enhancement",
		},
		{
			description: "Style transfer application.",
			id:          "keras-io/neural-style-transfer",
		},
		{
			description: "An application that prettifies your drawings.",
			id:          "huggingface-projects/diffuse-the-rest",
		},
		{
			description: "Image colorization application for anime drawings.",
			id:          "Gradio-Blocks/anime-colorization",
		},
	],
	summary:      "Image to image is the task of transforming a source image to match the characteristics of a target image or a target image domain. Any image manipulation and enhancement is possible with image to image models.",
	widgetModels: [""],
	youtubeId:    "",
};

export default taskData;
