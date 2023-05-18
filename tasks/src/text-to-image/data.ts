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
	metrics: [],
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
