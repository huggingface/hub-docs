import type { TaskData } from "../Types";
import type { PipelineType } from "../../../js/src/lib/interfaces/Types";

import { PIPELINE_DATA } from "../../../js/src/lib/interfaces/Types";
import { TASKS_MODEL_LIBRARIES } from "../const";

const taskData: (type: PipelineType) => TaskData = (type: PipelineType) => ({
	datasets: [],
	demo:     {
		inputs:  [],
		outputs: [],
	},
	id:            type,
	isPlaceholder: true,
	label:         PIPELINE_DATA[type].name,
	libraries:     TASKS_MODEL_LIBRARIES[type],
	metrics:       [],
	models:        [],
	summary:       "",
	widgetModels:  [],
	youtubeId:     "",
});

export default taskData;
