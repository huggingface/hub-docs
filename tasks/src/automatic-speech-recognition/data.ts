import type { TaskDataCustom } from "../Types";

const taskData: TaskDataCustom = {
	datasets: [
		{
			description: "An English dataset with 1,000 hours of data.",
			id:          "librispeech_asr",
		},
		{
			description: "Dataset in 60 languages including demographic information.",
			id:          "common_voice",
		},
		{
			description: "High quality, multi-speaker audio data and their transcriptions  in various languages.",
			id: "openslr",
		},
	],
	demo: {
		inputs: [
			{
				filename: "input.flac",
				type:     "audio",
			},
		],
		outputs: [
			{
				/// GOING ALONG SLUSHY COUNTRY ROADS AND SPEAKING TO DAMP AUDIENCES I
				label:   "Transcript",
				content: "Going along slushy country roads and speaking to damp audiences in...",
				type:    "text",
			},
		],
	},
	metrics: [
		{
			description: "",
			id:          "wer",
		},
		{
			description: "",
			id:          "cer",
		},
	],
	models: [
		{
			description: "A good generic ASR model.",
			id:          "facebook/wav2vec2-base-960h",
		},
		{
			description: "An end-to-end model that performs Automatic Speech Recognition and Speech Translation.",
			id:          "facebook/s2t-small-mustc-en-fr-st",
		},
	],
	summary:      "Automatic Speech Recognition (ASR), also known as Speech to Text (STT), is the task of transcribing a given audio to text. It has many applications, such as voice user interfaces.",
	widgetModels: ["facebook/wav2vec2-base-960h"],
	youtubeId:    "TksaY_FDgnk",
};

export default taskData;
