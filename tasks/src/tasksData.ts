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
	"conversational":                 placeholder,
	"document-question-answering":    placeholder,
	"feature-extraction":             placeholder,
	"fill-mask":                      fillMask,
	"image-classification":           imageClassification,
	"image-segmentation":             imageSegmentation,
	"image-to-image":                 placeholder,
	"image-to-text":                  placeholder,
	"multiple-choice":                placeholder,
	"object-detection":               objectDetection,
	"other":                          placeholder,
	"question-answering":             questionAnswering,
	"reinforcement-learning":         placeholder,
	"sentence-similarity":            sentenceSimilarity,
	"summarization":                  summarization,
	"table-question-answering":       placeholder,
	"table-to-text":                  placeholder,
	"tabular-classification":         placeholder,
	"tabular-regression":             placeholder,
	"tabular-to-text":                placeholder,
	"text-classification":            textClassification,
	"text-generation":                textGeneration,
	"text-retrieval":                 placeholder,
	"text-to-image":                  placeholder,
	"text-to-speech":                 textToSpeech,
	"text2text-generation":           placeholder,
	"time-series-forecasting":        placeholder,
	"token-classification":           tokenClassification,
	"translation":                    translation,
	"unconditional-image-generation": placeholder,
	"visual-question-answering":      placeholder,
	"voice-activity-detection":       placeholder,
	"zero-shot-classification":       placeholder,
	"zero-shot-image-classification": placeholder,
} as const;
