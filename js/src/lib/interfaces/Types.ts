// Warning: order of modalities here determine how they are listed on the /tasks page
export const MODALITIES = [
	"cv",
	"nlp",
	"audio",
	"tabular",
	"multimodal",
	"rl",
	"other",
] as const;

export type Modality = typeof MODALITIES[number];

export const MODALITY_LABELS: Record<Modality, string> = {
	multimodal: "Multimodal",
	nlp:        "Natural Language Processing",
	audio:      "Audio",
	cv:         "Computer Vision",
	rl:         "Reinforcement Learning",
	tabular:    "Tabular",
	other:      "Other",
};

/**
 * Public interface for a sub task.
 * 
 * This can be used in a model card's `model-index` metadata.
 * and is more granular classification that can grow significantly
 * over time as new tasks are added.
 */
export interface SubTask {
	/**
	 * type of the task (e.g. audio-source-separation)
	 */
	type: string;
	/**
	 * displayed name of the task (e.g. Audio Source Separation)
	 */
	name: string;
}

/**
 * Public interface for a PipelineData.
 * 
 * This information corresponds to a pipeline type (aka task)
 * in the Hub.
 */
export interface PipelineData {
	/**
	 * displayed name of the task (e.g. Text Classification)
	 */
	name: string;
	subtasks?: SubTask[];
	modality: Modality;
	/**
	 * color for the tag icon.
	 */
	color: "blue" | "green" | "indigo" | "orange" | "red" | "yellow";
	/**
	 * whether to hide in /models filters
	 */
	hideInModels?: boolean;
	/**
	 * whether to hide in /datasets filters
	 */
	hideInDatasets?: boolean;
}

function ensureRecordOfPipelines<Keys extends string>(record: Record<Keys, PipelineData>): Record<Keys, PipelineData> {
	return record;
}

/// Coarse-grained taxonomy of tasks
///
/// This type is used in multiple places in the Hugging Face
/// ecosystem:
///  - To determine which widget to show.
///  - To determine which endpoint of Inference API to use.
///  - As filters at the left of models and datasets page.
///
/// Note that this is sensitive to order.
/// For each domain, the order should be of decreasing specificity. 
/// This will impact the default pipeline tag of a model when not
/// specified. 
export const PIPELINE_DATA = ensureRecordOfPipelines({
	"text-classification": {
		name:     "Text Classification",
		subtasks: [
			{
				type: "acceptability-classification",
				name: "Acceptability Classification",
			},
			{
				type: "entity-linking-classification",
				name: "Entity Linking Classification",
			},
			{
				type: "fact-checking",
				name: "Fact Checking",
			},
			{
				type: "intent-classification",
				name: "Intent Classification",
			},
			{
				type: "language-identification",
				name: "Language Identification",
			},
			{
				type: "multi-class-classification",
				name: "Multi Class Classification",
			},
			{
				type: "multi-label-classification",
				name: "Multi Label Classification",
			},
			{
				type: "multi-input-text-classification",
				name: "Multi-input Text Classification",
			},
			{
				type: "natural-language-inference",
				name: "Natural Language Inference",
			},
			{
				type: "semantic-similarity-classification",
				name: "Semantic Similarity Classification",
			},
			{
				type: "sentiment-classification",
				name: "Sentiment Classification",
			},
			{
				type: "topic-classification",
				name: "Topic Classification",
			},
			{
				type: "semantic-similarity-scoring",
				name: "Semantic Similarity Scoring",
			},
			{
				type: "sentiment-scoring",
				name: "Sentiment Scoring",
			},
			{
				type: "sentiment-analysis",
				name: "Sentiment Analysis",
			},
			{
				type: "hate-speech-detection",
				name: "Hate Speech Detection",
			},
			{
				type: "text-scoring",
				name: "Text Scoring",
			},
		],
		modality: "nlp",
		color:    "orange",
	},
	"token-classification": {
		name:     "Token Classification",
		subtasks: [
			{
				type: "named-entity-recognition",
				name: "Named Entity Recognition",
			},
			{
				type: "part-of-speech",
				name: "Part of Speech",
			},
			{
				type: "parsing",
				name: "Parsing",
			},
			{
				type: "lemmatization",
				name: "Lemmatization",
			},
			{
				type: "word-sense-disambiguation",
				name: "Word Sense Disambiguation",
			},
			{
				type: "coreference-resolution",
				name: "Coreference-resolution",
			},
		],
		modality: "nlp",
		color:    "blue",
	},
	"table-question-answering": {
		name:     "Table Question Answering",
		modality: "nlp",
		color:    "green",
	},
	"question-answering": {
		name:     "Question Answering",
		subtasks: [
			{
				type: "extractive-qa",
				name: "Extractive QA",
			},
			{
				type: "open-domain-qa",
				name: "Open Domain QA",
			},
			{
				type: "closed-domain-qa",
				name: "Closed Domain QA",
			},
		],
		modality: "nlp",
		color:    "blue",
	},
	"zero-shot-classification": {
		name:     "Zero-Shot Classification",
		modality: "nlp",
		color:    "yellow",
	},
	"translation": {
		name:     "Translation",
		modality: "nlp",
		color:    "green",
	},
	"summarization": {
		name:     "Summarization",
		subtasks: [
			{
				type: "news-articles-summarization",
				name: "News Articles Summarization",
			},
			{
				type: "news-articles-headline-generation",
				name: "News Articles Headline Generation",
			},
		],
		modality: "nlp",
		color:    "indigo",
	},
	"conversational": {
		name:     "Conversational",
		subtasks: [
			{
				type: "dialogue-generation",
				name: "Dialogue Generation",
			},
		],
		modality: "nlp",
		color:    "green",
	},
	"feature-extraction": {
		name:     "Feature Extraction",
		modality: "multimodal",
		color:    "red",
	},
	"text-generation": {
		name:     "Text Generation",
		subtasks: [
			{
				type: "dialogue-modeling",
				name: "Dialogue Modeling",
			},
			{
				type: "language-modeling",
				name: "Language Modeling",
			},
		],
		modality: "nlp",
		color:    "indigo",
	},
	"text2text-generation": {
		name:     "Text2Text Generation",
		subtasks: [
			{
				type: "text-simplification",
				name: "Text simplification",
			},
			{
				type: "explanation-generation",
				name: "Explanation Generation",
			},
			{
				type: "abstractive-qa",
				name: "Abstractive QA",
			},
			{
				type: "open-domain-abstractive-qa",
				name: "Open Domain Abstractive QA",
			},
			{
				type: "closed-domain-qa",
				name: "Closed Domain QA",
			},
			{
				type: "open-book-qa",
				name: "Open Book QA",
			},
			{
				type: "closed-book-qa",
				name: "Closed Book QA",
			},
		],
		modality: "nlp",
		color:    "indigo",
	},
	"fill-mask": {
		name:     "Fill-Mask",
		subtasks: [
			{
				type: "slot-filling",
				name: "Slot Filling",
			},
			{
				type: "masked-language-modeling",
				name: "Masked Language Modeling",
			},
		],
		modality: "nlp",
		color:    "red",
	},
	"sentence-similarity": {
		name:     "Sentence Similarity",
		modality: "nlp",
		color:    "yellow",
	},
	"text-to-speech": {
		name:     "Text-to-Speech",
		modality: "audio",
		color:    "yellow",
	},
	"automatic-speech-recognition": {
		name:     "Automatic Speech Recognition",
		modality: "audio",
		color:    "yellow",
	},
	"audio-to-audio": {
		name:     "Audio-to-Audio",
		modality: "audio",
		color:    "blue",
	},
	"audio-classification": {
		name:     "Audio Classification",
		subtasks: [
			{
				type: "keyword-spotting",
				name: "Keyword Spotting",
			},
			{
				type: "speaker-identification",
				name: "Speaker Identification",
			},
			{
				type: "audio-intent-classification",
				name: "Audio Intent Classification",
			},
			{
				type: "audio-emotion-recognition",
				name: "Audio Emotion Recognition",
			},
			{
				type: "audio-language-identification",
				name: "Audio Language Identification",
			},
		],
		modality: "audio",
		color:    "green",
	},
	"voice-activity-detection": {
		name:     "Voice Activity Detection",
		modality: "audio",
		color:    "red",
	},
	"depth-estimation": {
		name:     "Depth Estimation",
		modality: "cv",
		color:    "yellow",
	},
	"image-classification": {
		name:     "Image Classification",
		subtasks: [
			{
				type: "multi-label-image-classification",
				name: "Multi Label Image Classification",
			},
			{
				type: "multi-class-image-classification",
				name: "Multi Class Image Classification",
			},
		],
		modality: "cv",
		color:    "blue",
	},
	"object-detection": {
		name:     "Object Detection",
		subtasks: [
			{
				type: "face-detection",
				name: "Face Detection",
			},
			{
				type: "vehicle-detection",
				name: "Vehicle Detection",
			},
		],
		modality: "cv",
		color:    "yellow",
	},
	"image-segmentation": {
		name:     "Image Segmentation",
		subtasks: [
			{
				type: "instance-segmentation",
				name: "Instance Segmentation",
			},
			{
				type: "semantic-segmentation",
				name: "Semantic Segmentation",
			},
			{
				type: "panoptic-segmentation",
				name: "Panoptic Segmentation",
			},
		],
		modality: "cv",
		color:    "green",
	},
	"text-to-image": {
		name:     "Text-to-Image",
		modality: "multimodal",
		color:    "yellow",
	},
	"image-to-text": {
		name:     "Image-to-Text",
		subtasks: [
			{
				type: "image-captioning",
				name: "Image Captioning",
			},
		],
		modality: "multimodal",
		color:    "red",
	},
	"image-to-image": {
		name:     "Image-to-Image",
		modality: "cv",
		color:    "indigo",
	},
	"unconditional-image-generation": {
		name:     "Unconditional Image Generation",
		modality: "cv",
		color:    "green",
	},
	"video-classification": {
		name:     "Video Classification",
		modality: "cv",
		color:    "blue",
	},
	"reinforcement-learning": {
		name:           "Reinforcement Learning",
		modality:       "rl",
		color:          "red",
		hideInDatasets: true,
	},
	"robotics": {
		name:     "Robotics",
		modality: "rl",
		subtasks: [
			{
				type: "grasping",
				name: "Grasping",
			},
			{
				type: "task-planning",
				name: "Task Planning",
			},
		],
		color:          "blue",
		hideInDatasets: true,
	},
	"tabular-classification": {
		name:     "Tabular Classification",
		modality: "tabular",
		subtasks: [
			{
				type: "tabular-multi-class-classification",
				name: "Tabular Multi Class Classification",
			},
			{
				type: "tabular-multi-label-classification",
				name: "Tabular Multi Label Classification",
			},
		],
		color: "blue",
	},
	"tabular-regression": {
		name:     "Tabular Regression",
		modality: "tabular",
		subtasks: [
			{
				type: "tabular-single-column-regression",
				name: "Tabular Single Column Regression",
			},
		],
		color: "blue",
	},
	"tabular-to-text": {
		name:     "Tabular to Text",
		modality: "tabular",
		subtasks: [
			{
				type: "rdf-to-text",
				name: "RDF to text",
			},
		],
		color:        "blue",
		hideInModels: true,
	},
	"table-to-text": {
		name:         "Table to Text",
		modality:     "nlp",
		color:        "blue",
		hideInModels: true,
	},
	"multiple-choice": {
		name:     "Multiple Choice",
		subtasks: [
			{
				type: "multiple-choice-qa",
				name: "Multiple Choice QA",
			},
			{
				type: "multiple-choice-coreference-resolution",
				name: "Multiple Choice Coreference Resolution",
			},
		],
		modality:     "nlp",
		color:        "blue",
		hideInModels: true,
	},
	"text-retrieval": {
		name:     "Text Retrieval",
		subtasks: [
			{
				type: "document-retrieval",
				name: "Document Retrieval",
			},
			{
				type: "utterance-retrieval",
				name: "Utterance Retrieval",
			},
			{
				type: "entity-linking-retrieval",
				name: "Entity Linking Retrieval",
			},
			{
				type: "fact-checking-retrieval",
				name: "Fact Checking Retrieval",
			},
		],
		modality:     "nlp",
		color:        "indigo",
		hideInModels: true,
	},
	"time-series-forecasting": {
		name:     "Time Series Forecasting",
		modality: "tabular",
		subtasks: [
			{
				type: "univariate-time-series-forecasting",
				name: "Univariate Time Series Forecasting",
			},
			{
				type: "multivariate-time-series-forecasting",
				name: "Multivariate Time Series Forecasting",
			},
		],
		color:        "blue",
		hideInModels: true,
	},
	"text-to-video": {
		name:     "Text-to-Video",
		modality: "multimodal",
		color:    "green",
	},
	"visual-question-answering": {
		name:     "Visual Question Answering",
		subtasks: [
			{
				type: "visual-question-answering",
				name: "Visual Question Answering",
			},
		],
		modality: "multimodal",
		color:    "red",
	},
	"document-question-answering": {
		name:     "Document Question Answering",
		subtasks: [
			{
				type: "document-question-answering",
				name: "Document Question Answering",
			},
		],
		modality:       "multimodal",
		color:          "blue",
		hideInDatasets: true,
	},
	"zero-shot-image-classification": {
		name:     "Zero-Shot Image Classification",
		modality: "cv",
		color:    "yellow",
	},
	"graph-ml": {
		name:     "Graph Machine Learning",
		modality: "multimodal",
		color:    "green",
	},
	"other": {
		name:           "Other",
		modality:       "other",
		color:          "blue",
		hideInModels:   true,
		hideInDatasets: true,
	},
});

export type PipelineType = keyof typeof PIPELINE_DATA;
export const ALL_PIPELINE_TYPES = Object.keys(PIPELINE_DATA) as PipelineType[];
export const ALL_PIPELINE_TYPES_SET = new Set(ALL_PIPELINE_TYPES);

export const ALL_SUBTASKS = Object.values(PIPELINE_DATA).flatMap(data => data.subtasks ?? []);
export const ALL_SUBTASK_TYPES = ALL_SUBTASKS.map(s => s.type);
export const ALL_SUBTASK_TYPES_SET = new Set(ALL_SUBTASK_TYPES);


export const TAG_NFAE_CONTENT = "not_for_all_eyes";
export const TAG_TEXT_GENERATION_INFERENCE = "text-generation-inference";

/**
 * Tags that are suggested inside the metadata GUI
 * (above model card or dataset card editor)
 * 
 * Usually tags for domains or industries.
 * 
 * Let's keep their number not too high to not spread out models/datasets too much.
 */
export const OTHER_TAGS_SUGGESTIONS = [
	"chemistry",
	"biology",
	"finance",
	"legal",
	"music",
	"art",
	"code",
	"climate",
	"medical",
	TAG_NFAE_CONTENT,
];


export type WidgetInputSample = Record<string | "example_title" | "group", string>;

/**
 * Public interface for model metadata
 */
export interface ModelData {
	/**
	 * id of model (e.g. 'user/repo_name')
	 */
	id: string;
	/**
	 * Kept for backward compatibility
	 */
	modelId?: string;
	/**
	 * is this model private?
	 */
	private?: boolean;
	/**
	 * this dictionary has useful information about the model configuration
	 */
	config?: Record<string, any>;
	/**
	 * all the model tags
	 */
	tags?: string[];
	/**
	 * transformers-specific info to display in the code sample.
	 */
	transformersInfo?: TransformersInfo;
	/**
	 * Pipeline type
	 */
	pipeline_tag?: PipelineType | undefined;
	/**
	 * for relevant models, get mask token
	 */
	mask_token?: string | undefined;
	/**
	 * Example data that will be fed into the widget.
	 *
	 * can be set in the model card metadata (under `widget`),
	 * or by default in `DefaultWidget.ts`
	 */
	widgetData?: WidgetInputSample[] | undefined;
	/**
	 * Parameters that will be used by the widget when calling Inference API
	 * https://huggingface.co/docs/api-inference/detailed_parameters
	 *
	 * can be set in the model card metadata (under `inference/parameters`)
	 * Example:
	 * inference:
	 *     parameters:
	 *         key: val
	 */
	cardData?: {
		inference?: boolean | {
			parameters?: Record<string, any>;
		};
	};
	/**
	 * Library name
	 * Example: transformers, SpeechBrain, Stanza, etc.
	 */
	library_name?: string;
}


/**
 * transformers-specific info to display in the code sample.
 */
export interface TransformersInfo {
	/**
	 * e.g. AutoModelForSequenceClassification
	 */
	auto_model: string;
	/**
	 * e.g. text-classification
	 */
	pipeline_tag?: PipelineType;
	/**
	 * e.g. "AutoTokenizer" | "AutoFeatureExtractor" | "AutoProcessor"
	 */
	processor?: string;
}
