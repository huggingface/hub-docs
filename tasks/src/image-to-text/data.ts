import type { TaskDataCustom } from "../Types";

const taskData: TaskDataCustom = {
	datasets: [
		{
			// TODO write proper description
			description: "Dataset from 12M image-text of Reddit",
			id:          "red_caps",
		},
		{
			// TODO write proper description
			description: "Dataset from 3.3M images of Google",
			id:          "datasets/conceptual_captions",
		},

	],
	demo: {
		inputs: [
			{
				filename: "savanna.jpg",
				type:     "img",
			},
		],
		outputs: [
			{
				label:   "Detailed description",
				content: "a herd of giraffes and zebras grazing in a field",
				type:    "text",
			},
		],
	},
	metrics: [],
	models: [
		{
			description: "A robust image captioning model.",
			id:          "Salesforce/blip-image-captioning-large",
		},
		{
			description: "A strong image captioning model.",
			id:          "nlpconnect/vit-gpt2-image-captioning",
		},
		{
			description: "A strong optical character recognition model.",
			id:          "microsoft/trocr-base-printed",
		},
	],
	spaces:       [
		{
			description: "A robust image captioning application.",
			id:          "flax-community/image-captioning",
		},
		{
			description: "An application that transcribes handwritings into text.",
			id:          "nielsr/TrOCR-handwritten",
		},
		{
			description: "An application that can caption images and answer questions about a given image.",
			id:          "Salesforce/BLIP",
		},
		{
			description: "An application that can caption images and answer questions with a conversational agent.",
			id:          "Salesforce/BLIP2",
		},
		{
			description: "An image captioning application that demonstrates the effect of noise on captions.",
			id:          "johko/capdec-image-captioning",
		},
	],
	summary:      "Image to text models output a text from a given image. Image captioning or optical character recognition can be considered as the most common applications of image to text.",
	widgetModels: ["nlpconnect/vit-gpt2-image-captioning"],
	youtubeId:    "",
};


export default taskData;
