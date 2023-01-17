import type { TaskDataCustom } from "../Types";

const taskData: TaskDataCustom = {

	datasets:     [],
	demo: {
		inputs: [
			{
				label:   "Text Input",
				content: "Dune is the best movie ever.",
				type:    "text",
			},
			{
				label:   "Candidate Labels",
				content: "CINEMA, ART, MUSIC",
				type:    "text",
			},
			
		],
		outputs: [
			{
				type: "chart",
				data: [
					{
						label: "CINEMA",
						score: 0.90,
					},
					{
						label: "ART",
						score: 0.10,
					},
					{
						label: "MUSIC",
						score: 0.00,
					},
				],
			},
		],
	},
	metrics:      [],
	models:       [
		{
			description:
				"Powerful zero-shot text classification model",
			id: "facebook/bart-large-mnli",
		},
	],
	spaces:       [],
	summary:      "Zero-shot text classification is a task in natural language processing where a model is trained on a set of labeled examples but is then able to classify new examples from previously unseen classes.",
	widgetModels: ["facebook/bart-large-mnli"],
};

export default taskData;
