import type { TaskData } from "../Types";

import { PIPELINE_DATA } from "../../../js/src/lib/interfaces/Types";
import { TASKS_MODEL_LIBRARIES } from "../const";

const taskData: TaskData = {
	datasets: [
		{
			description: "Binary classification dataset based on a census on income.",
			id:          "scikit-learn/adult-census-income",
		},
		{
			description: "Multi-class dataset on iris flower species.",
			id:          "scikit-learn/iris",
		},
	],
	demo: {
		inputs: [],
		outputs: [],
	},
	id:        "tabular-classification",
	label:     PIPELINE_DATA["tabular-classification"].name,
	libraries: TASKS_MODEL_LIBRARIES["tabular-classification"],
	metrics:   [
		{
			description: "",
			id:          "accuracy",
		},
		{
			description: "",
			id:          "recall",
		},
		{
			description: "",
			id:          "precision",
		},
		{
			description: "",
			id:          "f1",
		},

	],
	models: [
		{
			description: "Breast cancer prediction model based on decision trees.",
			id:          "scikit-learn/cancer-prediction-trees",
		},
	],
	summary:      "Tabular classification is the task of classifying a target category based on a set of categories (groups).",
	widgetModels: [""],
    youtubeId:""
};

export default taskData;