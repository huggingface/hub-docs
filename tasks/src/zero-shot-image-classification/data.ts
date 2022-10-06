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
				"Robust image classification model trained on publicly available image-caption data.",
			id: "openai/clip-vit-large-patch14",
		},
		{
			// TO DO: write description
			description:
				"Robust image classification model trained on publicly available image-caption data.",
			id: "openai/clip-vit-base-patch16",
		},
		{
			// TO DO: write description
			description:
				"Robust image classification model trained on  LAION-2B English subset of LAION-5B (https://laion.ai/blog/laion-5b/) using OpenCLIP (https://github.com/mlfoundations/open_clip).",
			id: "laion/CLIP-ViT-H-14-laion2B-s32B-b79K",
		},
	],
	summary:
		"Zero shot image classification is when pre-trained models are used to classify previously unseen classes during training. It is an extension of transfer learning. For instance a model trained to differentiate cars and airplanes is used to classify images of ships.",
	widgetModels: ["openai/clip-vit-large-patch14"],
	youtubeId: "",
};

export default taskData;
