import type { TaskDataCustom } from "../Types";

const taskData: TaskDataCustom = {
	datasets: [
		{
			// TODO write proper description
			description: "Dataset from the 2020 DocVQA challenge. The documents are taken from the UCSF Industry Documents Library.",
			id:          "eliolio/docvqa",
		},
	],
	demo: {
		inputs: [
			{
				label:   "Question",
				content: "Which is the most critical issue for live rep support?",
				type:    "text",
			},
			{
				filename: "document-question-answering-input.jpeg",
				type:    "img",
			},
		],
		outputs: [
			{
				label:   "Answer",
				content: "Product Quality/Liability Issues",
				type:    "text",
			},
		],
	},
	metrics: [
		{
			description: "The evaluation metric for the DocVQA challenge is the Average Normalized Levenshtein Similarity (ANLS). This metric is robust to OCR errors and is based on the Levenshtein distance between the predicted answer and the ground truth answer.",
			id:          "anls",
		},
		{
			description: "Exact Match is a metric based on the strict character match of the predicted answer and the right answer. For answers predicted correctly, the Exact Match will be 1. Even if only one character is different, Exact Match will be 0",
			id:          "exact-match",
		}
	],
	models: [
		{
			description: "A robust baseline model for Document QA task. LayoutLM fine-tuned on DocVQA and SQuAD2.0. OCR based on Tesseract.",
			id:          "impira/layoutlm-document-qa",
		},
		{
			description: "A special model for OCR-free Document QA task. Donut model fine-tuned on DocVQA.",
			id:          "naver-clova-ix/donut-base-finetuned-docvqa",
		},
	],
	summary:      "Document Question Answering (also known as Document **Visual** Question Answering) is the task of answering questions on document images. Document question answering models take a (document, question) pair as input and return an answer in natural language. Models usually rely on multi-modal features, combining text, position of words (bounding-boxes) and image.",
	widgetModels: ["impira/layoutlm-document-qa"],
	youtubeId:    "None",
};


export default taskData;
