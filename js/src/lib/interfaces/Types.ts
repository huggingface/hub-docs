export interface SubTask {
	type: string;
	name: string;
}

export interface PipelineData {
	name: string;
	subtasks: SubTask[];
	modality: Modality;
	color: "blue" | "green" | "indigo" | "orange" | "red" | "yellow";
}

export const PIPELINE_DATA = Object.freeze({
	"fill-mask": {
		name:     "Fill-Mask",
		subtasks: [],
		modality: "nlp",
		color:    "red",
	},
	"question-answering": {
		name:     "Question Answering",
		subtasks: [],
		modality: "nlp",
		color:    "blue",
	},
	"summarization": {
		name:     "Summarization",
		subtasks: [],
		modality: "nlp",
		color:    "indigo",
	},
	"table-question-answering": {
		name:     "Table Question Answering",
		subtasks: [],
		modality: "nlp",
		color:    "green",
	},
	"text-classification": {
		name:     "Text Classification",
		subtasks: [],
		modality: "nlp",
		color:    "orange",
	},
	"text-generation": {
		name:     "Text Generation",
		subtasks: [],
		modality: "nlp",
		color:    "indigo",
	},
	"text2text-generation": {
		name:     "Text2Text Generation",
		subtasks: [],
		modality: "nlp",
		color:    "indigo",
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
	"translation": {
		name:     "Translation",
		subtasks: [],
		modality: "nlp",
		color:    "green",
	},
	"zero-shot-classification": {
		name:     "Zero-Shot Classification",
		subtasks: [],
		modality: "nlp",
		color:    "yellow",
	},
	"sentence-similarity": {
		name:     "Sentence Similarity",
		subtasks: [],
		modality: "nlp",
		color:    "yellow",
	},
	"conversational": {
		name:     "Conversational",
		subtasks: [],
		modality: "nlp",
		color:    "green",
	},
	"feature-extraction": {
		name:     "Feature Extraction",
		subtasks: [],
		modality: "nlp",
		color:    "red",
	},
	"text-to-speech": {
		name:     "Text-to-Speech",
		subtasks: [],
		modality: "audio",
		color:    "yellow",
	},
	"automatic-speech-recognition": {
		name:     "Automatic Speech Recognition",
		subtasks: [],
		modality: "audio",
		color:    "yellow",
	},
	"audio-to-audio": {
		name:     "Audio-to-Audio",
		subtasks: [],
		modality: "audio",
		color:    "blue",
	},
	"audio-classification": {
		name:     "Audio Classification",
		subtasks: [],
		modality: "audio",
		color:    "green",
	},
	"voice-activity-detection": {
		name:     "Voice Activity Detection",
		subtasks: [],
		modality: "audio",
		color:    "red",
	},
	"image-classification": {
		name:     "Image Classification",
		subtasks: [],
		modality: "cv",
		color:    "blue",
	},
	"object-detection": {
		name:     "Object Detection",
		subtasks: [],
		modality: "cv",
		color:    "yellow",
	},
	"image-segmentation": {
		name:     "Image Segmentation",
		subtasks: [],
		modality: "cv",
		color:    "green",
	},
	"text-to-image": {
		name:     "Text-to-Image",
		subtasks: [],
		modality: "cv",
		color:    "yellow",
	},
	"image-to-text": {
		name:     "Image-to-Text",
		subtasks: [],
		modality: "cv",
		color:    "red",
	},
	"structured-data-classification": {
		name:     "Structured Data Classification",
		subtasks: [],
		modality: "other",
		color:    "blue",
	},
	"reinforcement-learning": {
		name:     "Reinforcement Learning",
		subtasks: [],
		modality: "other",
		color:    "red",
	},
} as const);

export type PipelineType = keyof typeof PIPELINE_DATA;
export const ALL_PIPELINE_TYPES = Object.keys(PIPELINE_DATA) as PipelineType[];

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
