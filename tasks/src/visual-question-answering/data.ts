import type { TaskDataCustom } from "../Types";

const taskData: TaskDataCustom = {
	datasets: [
		{
			description: "A widely used dataset containing questions (with answers) about images.",
			id:          "Graphcore/vqa",
		},
		{
			description: "A dataset to benchmark visual reasoning based on text in images.",
			id: "textvqa",
		}
	],
	demo: {
		inputs: [
			{
				filename: "elephant.jpeg",
				type:     "img",
			},
			{
				label:   "Question",
				content: "What is in this image?",
				type:    "text",
			},
		],
		outputs: [
			{
				type: "chart",
				data: [
					{
						label: "elephant",
						score: 0.97,
					},
					{
						label: "elephants",
						score: 0.06,
					},
					{
						label: "animal",
						score: 0.003,
					},
				],
			},
		],
	},
	isPlaceholder: false,
	metrics:       [
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
	spaces:       [
		{
			description: "An application that can answer questions based on images.",
			id:          "nielsr/vilt-vqa",
		},
		{
			description: "An application that can caption images and answer questions about a given image. ",
			id:          "Salesforce/BLIP",
		},
		{
			description: "An application that can caption images and answer questions about a given image. ",
			id:          "vumichien/Img2Prompt",
		},
	],
	summary:      "Visual Question Answering is the task of answering open-ended questions based on an image. They output natural language responses to natural language questions.",
	widgetModels: ["dandelin/vilt-b32-finetuned-vqa"],
	youtubeId:    "",
};

export default taskData;
