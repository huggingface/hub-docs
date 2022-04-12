import type { ModelLibrary } from "../../js/src/lib/interfaces/Libraries";
import type { PipelineType } from "../../js/src/lib/interfaces/Types";

/*
 * Model libraries compatible with each ML task
 */
export const TASKS_MODEL_LIBRARIES: Record<PipelineType, Array<keyof typeof ModelLibrary>> = {
	/// nlp
	"fill-mask":                      ["transformers"],
	"question-answering":             ["adapter-transformers", "allennlp", "transformers"],
	"summarization":                  ["transformers"],
	"table-question-answering":       ["transformers"],
	"text-classification":            ["adapter-transformers", "spacy", "transformers"],
	"text-generation":                ["transformers"],
	"text2text-generation":           ["transformers"],
	"token-classification":           ["adapter-transformers", "flair", "spacy", "stanza", "transformers"],
	"translation":                    ["transformers"],
	"zero-shot-classification":       ["transformers"],
	"sentence-similarity":            ["sentence-transformers", "spacy"],
	"conversational":                 ["transformers"],
	"tabular-classification":         ["sklearn"],
	"tabular-to-text":                ["transformers"],
	"table-to-text":                  ["transformers"],
	"multiple-choice":                ["transformers"],
	"text-retrieval":                 [],
	/// multimodal
	"feature-extraction":             ["sentence-transformers", "transformers"],
	"automatic-speech-recognition":   ["espnet", "speechbrain", "transformers"],
	"text-to-speech":                 ["espnet", "tensorflowtts"],
	"text-to-image":                  [],
	"image-to-text":                  [],
	"visual-question-answering":      [],
	"zero-shot-image-classification":  [],
	/// audio
	"audio-to-audio":                 ["asteroid", "speechbrain"],
	"audio-classification":           ["speechbrain", "transformers"],
	"voice-activity-detection":       [],
	/// computer vision
	"image-classification":           ["keras", "timm", "transformers"],
	"object-detection":               ["transformers"],
	"image-segmentation":             ["transformers"],
	"image-to-image":                 [],
	"unconditional-image-generation": [],
	/// rl
	"reinforcement-learning":         ["transformers", "stable-baselines3"],
	/// time-series
	"time-series-forecasting":        [],
	/// other
	"other":        [],
};
