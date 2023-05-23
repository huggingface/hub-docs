import type { TaskDataCustom } from "../Types";

const taskData: TaskDataCustom = {
	datasets: [
		{
			description: "The STL-10 dataset is an image recognition dataset for developing unsupervised feature learning, deep learning, self-taught learning algorithms. It is similar to CIFAR-10 but with much more unlabeled examples.",
			id:          "STL-10",
		},{
			description: "ICinW is a benchmark dataset that consists of 20 image classification examples, each of which is augmented with external knowledge.",
			id:          "ICinW",
		},
		{
			description: "OCinW  is a benchmark dataset that consists of 35 object detection examples, each of which is augmented with external knowledge.",
			id:          "OCinW",
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
		{
			description:
				"Strong image classification model for biomedical domain.",
			id: "microsoft/BiomedCLIP-PubMedBERT_256-vit_base_patch16_224",
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
