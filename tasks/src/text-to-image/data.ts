import type { TaskDataCustom } from "../Types";

const taskData: TaskDataCustom = {
	datasets: [
		{
			description: "RedCaps is a large-scale dataset of 12M image-text pairs collected from Reddit.",
			id:          "red_caps",
		},
		{
			description: "Conceptual Captions is a dataset consisting of ~3.3M images annotated with captions.",
			id:          "conceptual_captions",
		},
	],
	demo: {
		inputs: [
			{
				label:   "Input",
				content: "A city above clouds, pastel colors, Victorian style",
				type:    "text",
			},
		],
		outputs: [
			{
				filename: "image.jpeg",
				type:     "img",
			},
		],
	},
	metrics: [
		{	description: " The Inception Score (IS) measures the quality of a model's image generation by assessing diversity and meaningfulness. It uses a generated image sample to predict its label. 
					The IS is then calculated by measuring the KL divergence between the marginal distribution p(y) and the conditional distribution p(y|x). A higher divergence signifies more diverse and meaningful images, resulting in a higher IS score.",
			id: "IS",
		},
		{	description: " The Fréchet Inception Distance (FID) overcomes the limitation of the Inception Score (IS) by considering the statistics of real-world samples when comparing them to synthetic samples.
					 It calculates the Fréchet distance between Gaussian distributions derived from model and real-world samples. A lower FID score indicates better similarity between the distributions of real and generated images.",
			id: "FID",
		},	
		{	description: "  R-precision serves as a metric to assess the extent to which the generated image aligns with the provided text description. Originating from ranking retrieval tasks in information retrieval, R-precision is used in the context of text-to-image task by
					using the generated images as queries to retrieve relevant text descriptions. The top 'r' relevant descriptions are selected based on cosine similarity. R-precision is calculated as r/R, where 'R' is the number of ground truth descriptions associated 
					with the generated images.",
			id: "R-Precision",
		},	
		],
	models:  [
		{
			description: "A latent text-to-image diffusion model capable of generating photo-realistic images given any text input.",
			id:          "CompVis/stable-diffusion-v1-4",
		},
		{
			description: "A model that can be used to generate images based on text prompts. The DALL·E Mega model is the largest version of DALLE Mini.",
			id:          "dalle-mini/dalle-mega",
		},
		{
			description: "A text-to-image model that can generate coherent text inside image.",
			id:          "DeepFloyd/IF-I-XL-v1.0",
		},
		{
			description: "A powerful text-to-image model.",
			id:          "kakaobrain/karlo-v1-alpha",
		},
	],
	spaces:       [
		{
			description: "A powerful text-to-image application.",
			id:          "stabilityai/stable-diffusion",
		},
		{
			description: "An text-to-image application that can generate coherent text inside the image.",
			id:          "DeepFloyd/IF",
		},
		{
			description: "An powerful text-to-image application that can generate images.",
			id:          "kakaobrain/karlo",
		},
		{
			description: "An powerful text-to-image application that can generates 3D representations.",
			id:          "hysts/Shap-E",
		},
	],
	summary:      "Generates images from input text. These models can be used to generate and modify images based on text prompts.",
	widgetModels: ["CompVis/stable-diffusion-v1-4"],
	youtubeId:    "",
};

export default taskData;
