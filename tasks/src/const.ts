import type { ModelLibrary } from "../../js/src/lib/interfaces/Libraries";
import type { PipelineType } from "../../js/src/lib/interfaces/Types";

/*
 * Model libraries compatible with each ML task
 */
export const TASKS_MODEL_LIBRARIES: Record<PipelineType, Array<keyof typeof ModelLibrary>> = {
	"audio-classification":           ["speechbrain", "transformers"],
	"audio-to-audio":                 ["asteroid", "speechbrain"],
	"automatic-speech-recognition":   ["espnet", "speechbrain", "transformers"],
	"conversational":                 ["transformers"],
	"feature-extraction":             ["sentence-transformers", "transformers"],
	"fill-mask":                      ["transformers"],
	"image-classification":           ["keras", "timm", "transformers"],
	"image-segmentation":             ["transformers"],
	"image-to-image":                 [],
	"image-to-text":                  [],
	"multiple-choice":                ["transformers"],
	"object-detection":               ["transformers"],
	"other":                          [],
	"question-answering":             ["adapter-transformers", "allennlp", "transformers"],
	"reinforcement-learning":         ["transformers", "stable-baselines3"],
	"sentence-similarity":            ["sentence-transformers", "spacy"],
	"summarization":                  ["transformers"],
	"table-question-answering":       ["transformers"],
	"table-to-text":                  ["transformers"],
	"tabular-classification":         ["sklearn"],
	"tabular-to-text":                ["transformers"],
	"text-classification":            ["adapter-transformers", "spacy", "transformers"],
	"text-generation":                ["transformers"],
	"text-retrieval":                 [],
	"text-to-image":                  [],
	"text-to-speech":                 ["espnet", "tensorflowtts"],
	"text2text-generation":           ["transformers"],
	"time-series-forecasting":        [],
	"token-classification":           ["adapter-transformers", "flair", "spacy", "stanza", "transformers"],
	"translation":                    ["transformers"],
	"unconditional-image-generation": [],
	"visual-question-answering":      [],
	"voice-activity-detection":       [],
	"zero-shot-classification":       ["transformers"],
	"zero-shot-image-classification": [],
};
