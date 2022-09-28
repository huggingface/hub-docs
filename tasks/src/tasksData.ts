import type { PipelineType } from "../../js/src/lib/interfaces/Types";
import type { TaskData } from "./Types";

import audioClassification from "./audio-classification/data";
import audioToAudio from "./audio-to-audio/data";
import automaticSpeechRecognition from "./automatic-speech-recognition/data";
import fillMask from "./fill-mask/data";
import imageClassification from "./image-classification/data";
import imageSegmentation from "./image-segmentation/data";
import objectDetection from "./object-detection/data";
import placeholder from "./placeholder/data";
import questionAnswering from "./question-answering/data";
import sentenceSimilarity from "./sentence-similarity/data";
import summarization from "./summarization/data";
import textToSpeech from "./text-to-speech/data";
import tokenClassification from "./token-classification/data";
import translation from "./translation/data";
import textClassification from "./text-classification/data";
import textGeneration from "./text-generation/data";

// To make comparisons easier, task order is the same as in const.ts
export const TASKS_DATA: Record<PipelineType, TaskData | undefined> = {
	"audio-classification":           audioClassification,
	"audio-to-audio":                 audioToAudio,
	"automatic-speech-recognition":   automaticSpeechRecognition,
	"conversational":                 placeholder("conversational"),
	"document-question-answering":    placeholder("document-question-answering"),
	"feature-extraction":             placeholder("feature-extraction"),
	"fill-mask":                      fillMask,
	"image-classification":           imageClassification,
	"image-segmentation":             imageSegmentation,
	"image-to-image":                 placeholder("image-to-image"),
	"image-to-text":                  placeholder("image-to-text"),
	"multiple-choice":                placeholder("multiple-choice"),
	"object-detection":               objectDetection,
	"other":                          undefined,
	"question-answering":             questionAnswering,
	"reinforcement-learning":         placeholder("reinforcement-learning"),
	"sentence-similarity":            sentenceSimilarity,
	"summarization":                  summarization,
	"table-question-answering":       placeholder("table-question-answering"),
	"table-to-text":                  placeholder("table-to-text"),
	"tabular-classification":         placeholder("tabular-classification"),
	"tabular-regression":             placeholder("tabular-regression"),
	"tabular-to-text":                placeholder("tabular-to-text"),
	"text-classification":            textClassification,
	"text-generation":                textGeneration,
	"text-retrieval":                 placeholder("text-retrieval"),
	"text-to-image":                  placeholder("text-to-image"),
	"text-to-speech":                 textToSpeech,
	"text2text-generation":           placeholder("text2text-generation"),
	"time-series-forecasting":        placeholder("time-series-forecasting"),
	"token-classification":           tokenClassification,
	"translation":                    translation,
	"unconditional-image-generation": placeholder(
		"unconditional-image-generation"
	),
	"visual-question-answering":      placeholder("visual-question-answering"),
	"voice-activity-detection":       placeholder("voice-activity-detection"),
	"zero-shot-classification":       placeholder("zero-shot-classification"),
	"zero-shot-image-classification": placeholder(
		"zero-shot-image-classification"
	),
} as const;
