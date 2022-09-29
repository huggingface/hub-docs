import type { TaskData } from "../Types";

import { PIPELINE_DATA } from "../../../js/src/lib/interfaces/Types";
import { TASKS_MODEL_LIBRARIES } from "../const";

const taskData: TaskData = {
	datasets: [
		{
			description: "Binary classification dataset based on a census on income.",
			id: "scikit-learn/adult-census-income",
		},
		{
			description: "Multi-class dataset on iris flower species.",
			id: "scikit-learn/iris",
		},
	],
	demo: {
		inputs: [
			{
				table: [["Glucose", "Blood Pressure ", "Skin Thickness", "Insulin", "BMI"],
				["148", "72", "35", "0", "33.6"], ["150", "50", "30", "0", "35.1"],
				["141", "60", "29", "1", "39.2"]],
				type: "tabular",
			},
		],
		outputs: [
			{
				table: [
					["Diabetes"],
					["1"],["1"],["0"]
				],
				type: "tabular",
			},
		],
	},
	id: "tabular-classification",
	label: PIPELINE_DATA["tabular-classification"].name,
	libraries: TASKS_MODEL_LIBRARIES["tabular-classification"],
	metrics: [
		{
			description: "",
			id: "accuracy",
		},
		{
			description: "",
			id: "recall",
		},
		{
			description: "",
			id: "precision",
		},
		{
			description: "",
			id: "f1",
		},
	],
	models: [
		{
			description: "Breast cancer prediction model based on decision trees.",
			id: "scikit-learn/cancer-prediction-trees",
		},
	],
	summary:
		"Tabular classification is the task of classifying a target category (a group) based on set of attributes.",
	widgetModels: [""],
	youtubeId: "",
};

export default taskData;
