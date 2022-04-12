export const MODALITIES = [
	"nlp",
	"audio",
	"cv",
	"rl",
	"other",
] as const;

export type Modality = typeof MODALITIES[number];

export const MODALITY_LABELS: Record<Modality, string> = {
	nlp:   "Natural Language Processing",
	audio: "Audio",
	cv:    "Computer Vision",
	rl:    "Reinforcement Learning",
	other: "Other",
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
/// This also impacts the display order.
export const PIPELINE_DATA = Object.freeze({
	"text-classification": {
		name:     "Text Classification",
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
		modality: "nlp",
		color:    "indigo",
	},
	"conversational": {
		name:     "Conversational",
		modality: "nlp",
		color:    "green",
	},
	"feature-extraction": {
		name:     "Feature Extraction",
		modality: "nlp",
		color:    "red",
	},
	"text-generation": {
		name:     "Text Generation",
		modality: "nlp",
		color:    "indigo",
	},
	"text2text-generation": {
		name:     "Text2Text Generation",
		modality: "nlp",
		color:    "indigo",
	},
	"fill-mask": {
		name:     "Fill-Mask",
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
		modality: "audio",
		color:    "green",
	},
	"voice-activity-detection": {
		name:     "Voice Activity Detection",
		modality: "audio",
		color:    "red",
	},
	"image-classification": {
		name:     "Image Classification",
		modality: "cv",
		color:    "blue",
	},
	"object-detection": {
		name:     "Object Detection",
		modality: "cv",
		color:    "yellow",
	},
	"image-segmentation": {
		name:     "Image Segmentation",
		modality: "cv",
		color:    "green",
	},
	"text-to-image": {
		name:     "Text-to-Image",
		modality: "cv",
		color:    "yellow",
	},
	"image-to-text": {
		name:     "Image-to-Text",
		modality: "cv",
		color:    "red",
	},
	"reinforcement-learning": {
		name:     "Reinforcement Learning",
		modality: "rl",
		color:    "red",
	},
	"structured-data-classification": {
		name:     "Structured Data Classification",
		modality: "other",
		color:    "blue",
	},
} as const);

export type PipelineType = keyof typeof PIPELINE_DATA;
export const ALL_PIPELINE_TYPES = Object.keys(PIPELINE_DATA) as PipelineType[];

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
	widgetData?: Record<string, any>[] | undefined;
	/**
	 * Parameters that will be used by the widget when calling Inference API
	 * https://api-inference.huggingface.co/docs/python/html/detailed_parameters.html
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
