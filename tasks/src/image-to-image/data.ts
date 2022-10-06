import { type TaskDataCustom } from "../Types";

const taskData: TaskDataCustom = {
	datasets: [
		{
			description: "Synthetic dataset, simulating fog on real scenes",
			id: "FoggyCityscapes"
		},
		{
			description: "Synthetic dataset, for image relighting",
			id: "VIDIT"
		},
		{
			description: "A collection of selfie images and similar faces from anime"
			id: "selfie2anime"
		},
		{
			description: "Multiple images of celebrities, used for facial expression translation"
			id: "CelebA"
		}
	],
	demo:     {
		inputs:  [],
		outputs: [],
	},
	isPlaceholder: false,
	metrics:       [
		{
			description: "Peak Signal to Noise Ratio (PSNR) is an approximation of the human perception, considering the ratio of the absolute intensity with respect to the variations. Measured in dB, a high value indicates a high fidelity.",
			id:          "PSNR"
		},
		{
			description: "Structural Similarity Index (SSIM) is a perceptual metric which compares the luminance, constrast and structure of two images. The values of SSIM range between -1 and 1, and higher values indicate closer resemblance to the original image.",
			id:          "SSIM"
		},
		{
			description: "Inception Score (IS) is an analysis of the labels predicted by an image classification model when presented with a sample of the generated images.",
			id:          "IS"
		},
	],
	models:        [
		{
			description: "A model that enhances images captured in low light conditions.",
			id: "keras-io/low-light-image-enhancement"
		}
		{
			description: "A model that increases the resolution of an image.",
			id: "keras-io/super-resolution"
		}
		{
			description: "Transforms photographies into a Japanese animation style image",
			id: "akiyamasho/AnimeBackgroundGAN-Shinkai"
		}
	],
	summary:       "Image to image models aim at transforming a source image to match the characteristics of a target image or a target image domain. There is an endless list of image manipulations and enhancements possible using image to image machine learning models."
	widgetModels:  [],
	youtubeId:     "",
};

export default taskData;
