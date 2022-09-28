import type { TaskData } from "../Types";
import type { PipelineType } from "../../../js/src/lib/interfaces/Types";


import { PIPELINE_DATA } from "../../../js/src/lib/interfaces/Types";
import { TASKS_MODEL_LIBRARIES } from "../const";

const taskData: ((type: PipelineType) => TaskData) = (type: PipelineType) => ({
	datasets: [
		{
			// TODO write proper description
			description: "Contribute a dataset for this page!",
			id:          "huggingface-projects/contribute-a-dataset",
		},
	],
	demo: {
		inputs: [
			{
				label:   "Input",
				content: "Contribute a schema for this task!",
				type:    "text",
			},
		],
		outputs: [
			{
				type: "chart",
				data: [
					{
						label: "POSITIVE",
						score: 0.9,
					},
					{
						label: "NEUTRAL",
						score: 0.1,
					},
					{
						label: "NEGATIVE",
						score: 0.0,
					},
				],
			},
		],
	},
	id:        type,
	label:     PIPELINE_DATA[type].name,
	libraries: TASKS_MODEL_LIBRARIES[type],
	metrics:   [
		{
			description: "Contribute a metric for this task!",
			id:          "Metric",
		},
	],
	models: [
		{
			// TO DO: write description
			description: "Contribute a model for this task!",
			id:          "huggingface-projects/contribute-a-model",
		},
	],
	summary:      "[insert a nice description for the task here]",
	widgetModels: ["distilbert-base-uncased-finetuned-sst-2-english"],
	youtubeId:    "",
});

export default taskData;
