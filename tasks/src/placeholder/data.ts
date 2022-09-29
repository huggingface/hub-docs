import type { TaskData } from "../Types";
import type { PipelineType } from "../../../js/src/lib/interfaces/Types";

import { PIPELINE_DATA } from "../../../js/src/lib/interfaces/Types";
import { TASKS_MODEL_LIBRARIES } from "../const";

const taskData: (type: PipelineType) => TaskData = (type: PipelineType) => ({
	datasets: [],
	demo:     {
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
	id:            type,
	isPlaceholder: true,
	label:         PIPELINE_DATA[type].name,
	libraries:     TASKS_MODEL_LIBRARIES[type],
	metrics:       [],
	models:        [],
	summary:       "[insert a nice description for the task here]",
	widgetModels:  [],
	youtubeId:     "",
});

export default taskData;
