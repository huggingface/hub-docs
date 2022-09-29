import { type PipelineType, PIPELINE_DATA } from "../../js/src/lib/interfaces/Types";
import type { TaskDataCustom, TaskData } from "./Types";

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
import { TASKS_MODEL_LIBRARIES } from "./const";

// To make comparisons easier, task order is the same as in const.ts
export const TASKS_DATA: Record<PipelineType, TaskData | undefined> = {
	"audio-classification":           getTaskData("audio-classification", audioClassification),
	"audio-to-audio":                 getTaskData("audio-to-audio", audioToAudio),
	"automatic-speech-recognition":   getTaskData("automatic-speech-recognition", automaticSpeechRecognition),
	"conversational":                 getTaskData("conversational", placeholder),
	"document-question-answering":    getTaskData("document-question-answering", placeholder),
	"feature-extraction":             getTaskData("feature-extraction", placeholder),
	"fill-mask":                      getTaskData("fill-mask", fillMask),
	"image-classification":           getTaskData("image-classification", imageClassification),
	"image-segmentation":             getTaskData("image-segmentation", imageSegmentation),
	"image-to-image":                 getTaskData("image-to-image", placeholder),
	"image-to-text":                  getTaskData("image-to-text", placeholder),
	"multiple-choice":                getTaskData("multiple-choice", placeholder),
	"object-detection":               getTaskData("object-detection", objectDetection),
	"other":                          undefined,
	"question-answering":             getTaskData("question-answering", questionAnswering),
	"reinforcement-learning":         getTaskData("reinforcement-learning", placeholder),
	"sentence-similarity":            getTaskData("sentence-similarity", sentenceSimilarity),
	"summarization":                  getTaskData("summarization", summarization),
	"table-question-answering":       getTaskData("table-question-answering", placeholder),
	"table-to-text":                  getTaskData("table-to-text", placeholder),
	"tabular-classification":         getTaskData("tabular-classification", placeholder),
	"tabular-regression":             getTaskData("tabular-regression", placeholder),
	"tabular-to-text":                getTaskData("tabular-to-text", placeholder),
	"text-classification":            getTaskData("text-classification", textClassification),
	"text-generation":                getTaskData("text-generation", textGeneration),
	"text-retrieval":                 getTaskData("text-retrieval", placeholder),
	"text-to-image":                  getTaskData("text-to-image", placeholder),
	"text-to-speech":                 getTaskData("text-to-speech", textToSpeech),
	"text2text-generation":           getTaskData("text2text-generation", placeholder),
	"time-series-forecasting":        getTaskData("time-series-forecasting", placeholder),
	"token-classification":           getTaskData("token-classification", tokenClassification),
	"translation":                    getTaskData("translation", translation),
	"unconditional-image-generation": getTaskData("unconditional-image-generation", placeholder),
	"visual-question-answering":      getTaskData("visual-question-answering", placeholder),
	"voice-activity-detection":       getTaskData("voice-activity-detection", placeholder),
	"zero-shot-classification":       getTaskData("zero-shot-classification", placeholder),
	"zero-shot-image-classification": getTaskData("zero-shot-image-classification", placeholder),
} as const;

function getTaskData(
	type: PipelineType,
	partialTaskData: TaskDataCustom
): TaskData {
	return {
		...partialTaskData,
		id:        type,
		label:     PIPELINE_DATA[type].name,
		libraries: TASKS_MODEL_LIBRARIES[type],
	};
}
