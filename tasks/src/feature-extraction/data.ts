import type { TaskDataCustom } from "../Types";

const taskData: TaskDataCustom = {
	datasets: [
		{
			description: "Wikipedia dataset containing cleaned articles of all languages. The datasets are built from the Wikipedia dump (https://dumps.wikimedia.org/) with one split per language. Each example contains the content of one full Wikipedia article with cleaning to strip markdown and unwanted sections (references, etc.).",
			id:"wikipedia",
		}
	],
	demo: {
		inputs: [
			{
				label:   "Input",
				content:
						"India, officially the Republic of India, is a country in South Asia.",
				type: "text",
			},

		],
		outputs: [
			{
				table:
						["array of shape (1,m,768) where m is the number of tokens in the input."][""],
				type: "tabular",
			},
		],
	},
	metrics: [
		{
			description: "",
			id:          "",
		},
	],
	models: [
		{
			description: "BART model pre-trained on English language. It was introduced in the paper BART: Denoising Sequence-to-Sequence Pre-training for Natural Language Generation, Translation, and Comprehension",
			id:          "facebook/bart-base",
		},
		{
			description: "Pretrained weights for CodeBERT: A Pre-Trained Model for Programming and Natural Languages.",
			id:          "microsoft/codebert-base",
		},
	],
	spaces:       [

	],
	summary:      "Feature-Extraction starts from initial set of measured data and builds derived values (features) intended to be informative and non-redundant, facilitating the subsequent learning and generalization steps in text, image & audio processing.",
	widgetModels: ["facebook/bart-base"]
};

export default taskData;
