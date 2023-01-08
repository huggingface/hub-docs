import type { TaskDataCustom } from "../Types";

const taskData: TaskDataCustom = {
	datasets: [
		{
			// TODO write proper description
			description: "",
			id:          "",
		},
	],
	demo: {
		inputs: [
			{
				filename: "image-classification-input.jpeg",
				type:     "img",
			},
			{
				label:   "Classes",
				content: "cat, dog, bird",
				type:    "text",
			},
		],
		outputs: [
			{
				type: "chart",
				data: [
					{
						label: "Cat",
						score: 0.664,
					},
					{
						label: "Dog",
						score: 0.329,
					},
					{
						label: "Bird",
						score: 0.008,
					},
				],
			},
		],
	},
	metrics: [
		{
			description:
				"Computes the number of times the correct label appears in top K labels predicted",
			id: "top-K accuracy",
		},
	],
	models: [
		{
			description:
				"Robust image classification model trained on publicly available image-caption data.",
			id: "openai/clip-vit-base-patch16",
		},
		{
			description:
				"Robust image classification model trained on publicly available image-caption data trained on additional high pixel data for better performance.",
			id: "openai/clip-vit-large-patch14-336",
		},
	],
	spaces:  [
		{
			description: "An application that leverages zero shot image classification to find best captions to generate an image. ",
			id:          "pharma/CLIP-Interrogator",
		},
	],
	summary:
		"Zero shot image classification is the task of classifying previously unseen classes during training of a model.",
	widgetModels: ["openai/clip-vit-large-patch14-336"],
	youtubeId:    "",
};

export default taskData;
