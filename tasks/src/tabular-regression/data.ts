import type { TaskData } from "../Types";

import { PIPELINE_DATA } from "../../../js/src/lib/interfaces/Types";
import { TASKS_MODEL_LIBRARIES } from "../const";

const taskData: TaskData = {
	datasets: [
		{
			description: "Dataset containing tip amounts for food servers.",
			id:          "scikit-learn/tips",
		},
		{
			description: "Dataset containing mile-per-gallon (mpg) information for various vehicles",
			id:          "scikit-learn/auto-mpg",
		},
	],
	demo: {
		inputs: [
			{
				table: [
					["Car Name", "Horsepower", "Weight"],
					["ford torino", "140", "3,449"],
					["amc hornet", "97", "2,774"],
					["toyota corolla", "65", "1,773"],

				],
				type: "tabular",
			},
		],
		outputs: [
			{
				table: [["MPG (miles per gallon)"], ["17"], ["18"], ["31"]],
				type:  "tabular",
			},
		],
	},
	id:        "tabular-regression",
	label:     PIPELINE_DATA["tabular-regression"].name,
	libraries: TASKS_MODEL_LIBRARIES["tabular-regression"],
	metrics:   [
		
	],
	models: [
		{
			description: "Fish weight prediction based on length measurements and species.",
			id:          "scikit-learn/Fish-Weight",
		},
	],
	spaces:  [],
	summary:
		"Tabular regression is the task of predicting a numerical value given a set of attributes.",
	widgetModels: [""],
	youtubeId:    "",
};

export default taskData;
