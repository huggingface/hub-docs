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
		{
			description: "Dataset containing measurements of fish at a market.",
			id:          "brendenc/fish",
		},
	],
	demo: {
		inputs: [
			{
				table: [
					["Mother's Height (cm)", "Father's Height (cm)"],
					["162", "172",],
					["165", "178"],
					["170", "165"]

				],
				type: "tabular",
			},
		],
		outputs: [
			{
				table: [["Baby's Height (cm)"], ["47"], ["50"], ["51"]],
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
			id:          "brendenc/Fish-Weight",
		},
	],
	summary:
		"Tabular regression is the task of predicting a numerical value given a set of attributes/features.",
	widgetModels: [""],
	youtubeId:    "",
};

export default taskData;
