import type { TaskData } from "../Types";
import type { PipelineType } from "../../../js/src/lib/interfaces/Types";


import { PIPELINE_DATA } from "../../../js/src/lib/interfaces/Types";
import { TASKS_MODEL_LIBRARIES } from "../const";

const taskData: ((type: PipelineType) => TaskData) = (type: PipelineType) => ({
	datasets: [
		{
			description: "Contribute a dataset for this page!",
			id:          "huggingface-projects/contribute-a-dataset",
		},
	],
	demo: {
		inputs: [
			{
				label:   "Example Input",
				content: "Contribute some schema input for this task!",
				type:    "text",
			},
		],
		outputs: [
			{
				label:   "Example Output",
				content: "Contribute some schema output for this task!",
				type:    "text",
			},
		],
	},
	id:        type,
	label:     PIPELINE_DATA[type].name,
	libraries: TASKS_MODEL_LIBRARIES[type],
	metrics:   [
		{
			description: "Contribute a metric for this task!",
			id:          "Example Metric",
		},
	],
	models: [
		{
			description: "Contribute a model for this task!",
			id:          "huggingface-projects/contribute-a-model",
		},
	],
	summary:      "[insert a nice description for the task here]",
	widgetModels: [],
	youtubeId:    "",
});

export default taskData;
