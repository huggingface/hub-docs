import { type PipelineType, PIPELINE_DATA } from "../../js/src/lib/interfaces/Types";
import type { TaskDataCustom, TaskData } from "./Types";

import audioClassification from "./audio-classification/data";
import audioToAudio from "./audio-to-audio/data";
import automaticSpeechRecognition from "./automatic-speech-recognition/data";
import documentQuestionAnswering from "./document-question-answering/data";
import fillMask from "./fill-mask/data";
import imageClassification from "./image-classification/data";
import imageSegmentation from "./image-segmentation/data";
import objectDetection from "./object-detection/data";
import placeholder from "./placeholder/data";
import questionAnswering from "./question-answering/data";
import sentenceSimilarity from "./sentence-similarity/data";
import summarization from "./summarization/data";
import tableQuestionAnswering from "./table-question-answering/data";
import tabularClassification from "./tabular-classification/data";
import textToSpeech from "./text-to-speech/data";
import tokenClassification from "./token-classification/data";
import translation from "./translation/data";
import textClassification from "./text-classification/data";
import textGeneration from "./text-generation/data";
import visualQuestionAnswering from "./visual-question-answering/data";
import { TASKS_MODEL_LIBRARIES } from "./const";

// To make comparisons easier, task order is the same as in const.ts
// Tasks set to undefined won't have an associated task page.
// Tasks that call getData() without the second argument will
// have a "placeholder" page.
export const TASKS_DATA: Record<PipelineType, TaskData | undefined> = {
	"audio-classification":           getData("audio-classification", audioClassification),
	"audio-to-audio":                 getData("audio-to-audio", audioToAudio),
	"automatic-speech-recognition":   getData("automatic-speech-recognition", automaticSpeechRecognition),
	"conversational":                 getData("conversational"),
	"document-question-answering":    getData("document-question-answering"),
	"feature-extraction":             getData("feature-extraction"),
	"fill-mask":                      getData("fill-mask", fillMask),
	"image-classification":           getData("image-classification", imageClassification),
	"image-segmentation":             getData("image-segmentation", imageSegmentation),
	"image-to-image":                 getData("image-to-image"),
	"image-to-text":                  getData("image-to-text"),
	"multiple-choice":                undefined,
	"object-detection":               getData("object-detection", objectDetection),
	"video-classification":           getData("video-classification"),
	"other":                          undefined,
	"question-answering":             getData("question-answering", questionAnswering),
	"reinforcement-learning":         getData("reinforcement-learning"),
	"robotics":                       getData("robotics"),
	"sentence-similarity":            getData("sentence-similarity", sentenceSimilarity),
	"summarization":                  getData("summarization", summarization),
	"table-question-answering":       getData("table-question-answering", tableQuestionAnswering),
	"table-to-text":                  undefined,
	"tabular-classification":         getData("tabular-classification", tabularClassification),
	"tabular-regression":             getData("tabular-regression"),
	"tabular-to-text":                undefined,
	"text-classification":            getData("text-classification", textClassification),
	"text-generation":                getData("text-generation", textGeneration),
	"text-retrieval":                 undefined,
	"text-to-image":                  getData("text-to-image"),
	"text-to-speech":                 getData("text-to-speech", textToSpeech),
	"text2text-generation":           getData("text2text-generation"),
	"time-series-forecasting":        undefined,
	"token-classification":           getData("token-classification", tokenClassification),
	"translation":                    getData("translation", translation),
	"unconditional-image-generation": getData("unconditional-image-generation"),
	"visual-question-answering":      getData("visual-question-answering", visualQuestionAnswering),
	"voice-activity-detection":       getData("voice-activity-detection"),
	"zero-shot-classification":       getData("zero-shot-classification"),
	"zero-shot-image-classification": getData("zero-shot-image-classification"),
} as const;

/* 
 * Return the whole TaskData object for a certain task. 
 * If the partialTaskData argument is left undefined,
 * the default placholder data will be used.
 */
function getData(
	type: PipelineType,
	partialTaskData: TaskDataCustom = placeholder
): TaskData {
	return {
		...partialTaskData,
		id:        type,
		label:     PIPELINE_DATA[type].name,
		libraries: TASKS_MODEL_LIBRARIES[type],
	};
}
