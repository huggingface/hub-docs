import type { TaskDataCustom } from "../Types";

const taskData: TaskDataCustom = {
	datasets: [
		{
			// TODO write proper description
			description: "",
			id: "",
		},
	],
	demo: {
		inputs: [],
		outputs: [],
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
			// TO DO: write description
			description:
				"Robust image classification model trained on publicly available image-caption data using a ViT-L/14 Transformer architecture base as an image encoder and uses a masked self-attention Transformer as a text encoder.",
			id: "openai/clip-vit-large-patch14",
		},
		{
			// TO DO: write description
			description:
				"Robust image classification model trained on publicly available image-caption data using a ViT-B/16 Transformer architecture as an image encoder and uses a masked self-attention Transformer as a text encoder.",
			id: "openai/clip-vit-base-patch16",
		},
	],
	summary:
		"Zero shot image classification is the task of classifying previously unseen classes during training of a model.",
	widgetModels: ["openai/clip-vit-large-patch14"],
	youtubeId: "",
};

export default taskData;
