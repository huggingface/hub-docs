import type { PipelineType } from "../../js/src/lib/interfaces/Types";
import type { TaskData } from "./Types";

import audioClassification from "./audio-classification/data";
import audioToAudio from "./audio-to-audio/data";
import automaticSpeechRecognition from "./automatic-speech-recognition/data";
import fillMask from "./fill-mask/data";
import imageClassification from "./image-classification/data";
import imageSegmentation from "./image-segmentation/data";
import objectDetection from "./object-detection/data";
import questionAnswering from "./question-answering/data";
import sentenceSimilarity from "./sentence-similarity/data";
import summarization from "./summarization/data";
import textToSpeech from "./text-to-speech/data";
import tokenClassification from "./token-classification/data";
import translation from "./translation/data";
import textClassification from "./text-classification/data";
import textGeneration from "./text-generation/data";


// To make comparisons easier, task order is the same as in PIPELINE_TAGS_DISPLAY_ORDER in /lib/interfaces/Types.ts
export const TASKS_DATA: Record<
	PipelineType,
	TaskData | undefined
> = {
	/// nlp
	"fill-mask":                      fillMask,
	"question-answering":             questionAnswering,
	"summarization":                  summarization,
	"table-question-answering":       undefined,
	"text-classification":            textClassification,
	"text-generation":                textGeneration,
	"text2text-generation":           textGeneration,
	"token-classification":           tokenClassification,
	"translation":                    translation,
	"zero-shot-classification":       undefined,
	"sentence-similarity":            sentenceSimilarity,
	"conversational":                 undefined,
	"tabular-classification":         undefined,
	"tabular-to-text":                undefined,
	"table-to-text":                  undefined,
	"multiple-choice":                undefined,
	"text-retrieval":                 undefined,
	/// multimodal
	"feature-extraction":             undefined,
	"automatic-speech-recognition":   automaticSpeechRecognition,
	"text-to-speech":                 textToSpeech,
	"text-to-image":                  undefined,
	"image-to-text":                  undefined,
	"visual-question-answering":      undefined,
	"zero-shot-image-classification": undefined,
	/// audio
	"audio-to-audio":                 audioToAudio,
	"audio-classification":           audioClassification,
	"voice-activity-detection":       undefined,
	/// computer vision
	"image-classification":           imageClassification,
	"object-detection":               objectDetection,
	"image-segmentation":             imageSegmentation,
	"image-to-image":                 undefined,
	"unconditional-image-generation": undefined,
	/// rl
	"reinforcement-learning":         undefined,
	/// time-series
	"time-series-forecasting":        undefined,
	/// other
	"other":                          undefined,
} as const;
