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
	metrics: [
		{
			description: "",
			id:          "",
		},
		{
			description: "",
			id:          "",
		},
	],
	models: [
		{
			description: "The model gets information in text of an image with text",
			id:          "naver-clova-ix/donut-base-finetuned-docvqa",
		},
		{
			description: "A strong image captioning model.",
			id:          "nlpconnect/vit-gpt2-image-captioning",
		},
	],
	spaces:       [],
	summary:      "",
	widgetModels: ["nlpconnect/vit-gpt2-image-captioning"],
	youtubeId:    "",
};


export default taskData;
