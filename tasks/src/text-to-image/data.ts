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
		{	description: " The underlying concept of the Inception Score (IS) as a metric is to assess the quality of a model based on its ability to generate diverse and meaningful images. This is achieved by using a generated image sample x to predict its label y using the Inception model. 
					The IS is then calculated by measuring the Kullback-Leibler (KL) divergence between the marginal distribution p(y) and the conditional distribution p(y|x). A higher divergence indicates greater diversity and meaningfulness in the generated images, 
					leading to a higher IS score.",
			id: "IS",
		},
		{	description: "The Fréchet Inception Distance (FID) metric was introduced as a solution to the limitation of the Inception Score (IS) metric, which did not consider the statistics of real-world samples when comparing them to synthetic samples.
					FID addresses this limitation by calculating the Fréchet distance, a measure of distance between two Gaussians. It calculates the distance between a Gaussian distribution obtained from the p(.) distribution of model samples and
					a Gaussian distribution obtained from the pw(.) distribution of real-world samples. A lower FID score indicates better similarity between the distributions of real and generated images.",
			id: "FID",
		},	
		{	description: "  R-precision serves as a metric to assess the extent to which the generated image aligns with the provided text description. Originating from ranking retrieval tasks in information retrieval, R-precision is used in the context of text-to-image task by
					utilizing the generated images as queries to retrieve their associated candidate text descriptions. These text descriptions are then ranked for each image in descending cosine similarity and top 'r' relevant descriptions are fetched. R-precision is finally computed 
					as r/R where 'R' is number of ground truth text descriptions for which image was generated in the first place.",
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
