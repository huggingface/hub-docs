import { type TaskDataCustom } from "../Types";

const taskData: TaskDataCustom = {
	datasets: [],
	demo:     {
		inputs:  [
			{
				filename: "elephant.jpeg",
				type:     "img",
			},
			{
				label:   "Question",
				content: "Is there an elephant?",
				type:    "text",
			},
		],
		outputs: [
			{
				type: "chart",
				data: [
					{
						label: "yes",
						score: 0.999,
					},
					{
						label: "no",
						score: 0.009,
					},
					{
						label: "1",
						score: 0.002,
					},
				],
			},
		],
	},
	isPlaceholder: true,
	metrics:       [
		{
			description: "For open-ended and multiple-choice VQA.",
			id:          "Accuracy",
		},
		{
			description: "Measures how much a predicted answer differs from the ground truth based on the difference in their semantic meaning.",
			id:          "Wu-Palmer Similarity",
		},
	],
	models:        [
		{
			description: "Vision-and-Language Transformer (ViLT) model fine-tuned on VQAv2",
			id:          "dandelin/vilt-b32-finetuned-vqa",
		},
	],
	summary:       "Visual Question Answering models can answer open-ended questions based on an image. They provide natural language responses to natural language questions.",
	widgetModels:  ["dandelin/vilt-b32-finetuned-vqa"],
	youtubeId:     "",
};

export default taskData;
