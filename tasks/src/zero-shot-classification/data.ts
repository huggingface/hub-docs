import type { TaskDataCustom } from "../Types";

const taskData: TaskDataCustom = {

	datasets:     [],
	demo:     {
		inputs:  [],
		outputs: [],
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
	summary:      "Zero-shot text classification is a task in natural language processing (NLP) where a model is trained on a set of labeled examples but is then able to classify new examples from previously unseen classes by transferring knowledge from seen to unseen classes.",
	widgetModels: ["facebook/bart-large-mnli"],
};

export default taskData;
