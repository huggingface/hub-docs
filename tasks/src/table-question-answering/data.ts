import type { Task DataCustom } from "../Types";

const taskData: TaskDataCustom = {
	datasets: [
		{ 
			description:"The Fewshot Table dataset consists of tables that naturally occur on the web, that are formatted as few-shot tasks for fine-tuning language models to improve their few-shot performance.",
			id: "JeremyAlain/123_test",
		},
	],
	demo: {
		inputs: [
			{ label: "Table",
		          filename: "tableQA.jpg",
			  type: "img",
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
		{ description: "",
		  id: "execution accuracy",
		},
		{ description: "",
			id: "logical form accuracy",
		},
	],
	models: 
		[ 
		{
		       	description: "an empirically powerful pre-training approach to empower existing models with table reasoning skills.",
		         id: "microsoft/tapex-base",
		},
		{
			description: "TAPAS is a BERT-like transformers model pretrained on a large corpus of English data from Wikipedia in a self-supervised fashion.",
			id: "google/tapas-base-finetuned-wtq",

		},
	],
	summary: "Table Question Answering (Table QA) refers to providing precise answers from tables to answer a user's question.",
	widgetModels: ["microsoft/tapex-base"],
	},


export default taskData;



		
