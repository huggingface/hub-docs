import type { TaskDataCustom } from "../Types";

const taskData: TaskDataCustom = {
	datasets: [
		{
			description: "Wikipedia dataset containing cleaned articles of all languages. Can be used to train `feature-extraction` models.",
			id:"wikipedia",
		}
	],
	demo: {
		inputs: [
			{
				label:   "Input",
				content:
						"India, officially the Republic of India, is a country in South Asia.",
				type: "text",
			},

		],
		outputs: [
			{
				table:
						["array of shape (1,m,768) where m is the number of tokens in the input."][""],
				type: "tabular",
			},
		],
	},
	metrics: [
		{
			description: "",
			id:          "",
		},
	],
	models: [
		{
			description: "A powerful feature extraction model for natural language processing tasks.",
			id:          "facebook/bart-base",
		},
		{
			description: "Pretrained weights for CodeBERT: A Pre-Trained Model for Programming and Natural Languages.",
			id:          "microsoft/codebert-base",
		},
	],
	spaces:       [

	],
	summary:      "Feature extraction refers to the process of transforming raw data into numerical features that can be processed while preserving the information in the original dataset.",
	widgetModels: ["facebook/bart-base"]
};

export default taskData;
