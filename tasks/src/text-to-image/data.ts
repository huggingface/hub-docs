import type { TaskDataCustom } from "../Types";

const taskData: TaskDataCustom = {
	datasets: [
		{
			// TODO write proper description
			description: "12M image-text pairs were extracted from Reddit creating a large-scale dataset called RedCaps. Reddit images and descriptions portray and describe a wide range of objects and scenes",
			id:          "red_caps",
		},
		{
			// TODO write proper description
			description: "Conceptual Captions is a dataset consisting of 3.3M images annotated with captions",
			id: "conceptual_captions"
		},
		{
			description:"Conceptual 12M (CC12M) is a dataset with 12 million image-text pairs specifically meant to be used for image-text cross-modal pre-training",
			id: "conceptual_12M"
		},
		
	],
	demo: {
		inputs: [],
		outputs: []
	},
	metrics: [
		{
			description: "The inception score captures two properties of a collection of generated (image quality and diversity). The inception score is calculated by first using a pre-trained Inception v3 model to predict the class probabilities for each generated image. ",
			id:          "IS",
		},
		{
			description: "The Fréchet inception distance (FID) is a metric that calculates the distance between the feature vectors of real images and the feature vectors of fake images",
			id:          "FID",
		},
	
		{
			description:"'Learned Perceptual Image Patch Similarity'is used to judge the perceptual similarity between two images. A low LPIPS score means that image patches are perceptual similar. ",
			id:			 "LPIPS"
		},

	],
	models: [
		{
			// TO DO: write description
			description: 'Imagen, a text-to-image diffusion model with an unprecedented degree of photorealism and a deep level of language understanding.',
			id:          'imagen'
		},
		
	],
	summary:      "Because of the advancement of Deep Learning technologies, we can generate anything we want that also invloves automatic synthesis of realistic images from text or text-to-image synthesis. ",
	widgetModels: [],
	youtubeId:    "",
};

export default taskData;
