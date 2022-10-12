import type { Task DataCustom } from "../Types";

const taskData: TaskDataCustom = {
	datasets: [
		{ 
			description:"The Fewshot Table dataset consists of tables that naturally occur on the web, that are formatted as few-shot tasks for fine-tuning language models to improve their few-shot performance.",
			id: "JeremyAlain/123_test",
		},
		{
			description:"WikiSQL is a dataset of 80654 hand-annotated examples of questions and SQL queries distributed across 24241 tables from Wikipedia.",
			id: "wikisql",
		},
	],
	demo: {
		inputs: [
			{ table: [
				["Rank", "Name", "No.of reigns", "Combined days"],
				[1, 'lou Thesz', 3, 3749],
                                [2, 'Ric Flair', 8, 3103],
                                [3, 'Harley Race', 7, 1799],
                                [4, 'Dory Funk Jr.', 1, 1563],
                                [5, 'Dan Severn', 2, 1559],
                                [6, 'Gene Kiniski', 1, 1131]
			],
			  type: "tabular",
			 },
			 
			 { label: "Question",
		           content: "what is the number of reigns for Harley Race",
			   type: "text",

			 },
		],
		outputs: [
			{ label: "Result",
			  content: "7",
			  type: "text",
			},
		],
	},
	metrics: 
		[
		{ description: "checks whetherchecks whether the predicted answer(s) is equal to the ground-truth answer(s).",
		  id: "denotation accuracy",
		},
	],
	models: 
		[ 
		{
		       	description: "You can use the raw model for simulating neural SQL execution, i.e., employ TAPEX to execute a SQL query on a given table.",
		         id: "microsoft/tapex-base",
		},
		{
			description: "You can use this model for answering questions related to a table.",
			id: "google/tapas-base-finetuned-wtq",

		},
	],
	summary: "Table Question Answering (Table QA) refers to providing precise answers from tables to answer a user's question.",
	widgetModels: ["microsoft/tapex-base"],
	},


export default taskData;



		
