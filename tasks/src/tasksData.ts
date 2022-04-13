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


// To make comparisons easier, task order is the same as in const.ts
export const TASKS_DATA: Record<
	PipelineType,
	TaskData | undefined
> = {
	"audio-classification":           audioClassification,
	"audio-to-audio":                 audioToAudio,
	"automatic-speech-recognition":   automaticSpeechRecognition,
	"conversational":                 undefined,
	"feature-extraction":             undefined,
	"fill-mask":                      fillMask,
	"image-classification":           imageClassification,
	"image-segmentation":             imageSegmentation,
	"image-to-image":                 undefined,
	"image-to-text":                  undefined,
	"multiple-choice":                undefined,
	"object-detection":               objectDetection,
	"other":                          undefined,
	"question-answering":             questionAnswering,
	"reinforcement-learning":         undefined,
	"sentence-similarity":            sentenceSimilarity,
	"summarization":                  summarization,
	"table-question-answering":       undefined,
	"table-to-text":                  undefined,
	"tabular-classification":         undefined,
	"tabular-to-text":                undefined,
	"text-classification":            textClassification,
	"text-generation":                textGeneration,
	"text-retrieval":                 undefined,
	"text-to-image":                  undefined,
	"text-to-speech":                 textToSpeech,
	"text2text-generation":           textGeneration,
	"time-series-forecasting":        undefined,
	"token-classification":           tokenClassification,
	"translation":                    translation,
	"unconditional-image-generation": undefined,
	"visual-question-answering":      undefined,
	"voice-activity-detection":       undefined,
	"zero-shot-classification":       undefined,
	"zero-shot-image-classification": undefined,
} as const;
