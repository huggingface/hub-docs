import type { TaskData } from "../Types";

import { PIPELINE_DATA } from "../../../js/src/lib/interfaces/Types";
import { TASKS_MODEL_LIBRARIES } from "../const";

const taskData: TaskData = {
	datasets: [
		{
			description: "A comprehensive curation of datasets covering all benchmarks.",
			id:          "inria-soda/tabular-benchmark",
		},
	],
	demo: {
		inputs: [
			{
				label: "Dataset",
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
		{
			description: "",
			id:          "mse",
		},
		{
			description: "Coefficient of determination (or R-squared) is a measure of how well the model fits the data. Higher R-squared is considered a better fit.",
			id:          "r-squared",
		},
	],
	models: [
		{
			description: "Fish weight prediction based on length measurements and species.",
			id:          "scikit-learn/Fish-Weight",
		},
	],
	spaces:  [
		{
			description: "An application that can predict weight of a fish based on set of attributes.",
			id:          "scikit-learn/fish-weight-prediction",
		},
	],
	summary:
		"Tabular regression is the task of predicting a numerical value given a set of attributes.",
	widgetModels: ["scikit-learn/Fish-Weight"],
	youtubeId:    "",
};

export default taskData;
