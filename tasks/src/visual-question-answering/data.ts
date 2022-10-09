import { type TaskDataCustom } from "../Types";

const taskData: TaskDataCustom = {
	datasets: [
		{
			description: "A widely used dataset containing questions (with answers) about images.",
			id:          "Graphcore/vqa",
		},
	],
	demo: {
		inputs: [
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
	isPlaceholder: false,
	metrics: [
		{
			description: "",
			id:          "accuracy",
		},
		{
			description: "Measures how much a predicted answer differs from the ground truth based on the difference in their semantic meaning.",
			id:          "wu-palmer similarity",
		},
	],
	models: [
		{
			description: "Robust Visual Question Answering model trained on the VQAv2 dataset.",
			id:          "dandelin/vilt-b32-finetuned-vqa",
		},
	],
	summary:      "Visual Question Answering is the task of answering open-ended questions based on an image. They output natural language responses to natural language questions.",
	widgetModels: ["dandelin/vilt-b32-finetuned-vqa"],
	youtubeId:    "",
};

export default taskData;
