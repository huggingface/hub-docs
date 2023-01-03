import type { TaskDataCustom } from "../Types";

const taskData: TaskDataCustom = {

	datasets: [],
	demo: {
		inputs: [],
		outputs: [],
	},
	metrics: [],
	models: [
		{
			description:
				"Powerful zero-shot text classification model",
			id: "facebook/bart-large-mnli6",
		},
	],
	summary:
	"Zero-shot classification is the task of predicting classes that the model previously hasn't seen during the training.",
	widgetModels: ["facebook/bart-large-mnli"],
	youtubeId: "",
};

export default taskData;
