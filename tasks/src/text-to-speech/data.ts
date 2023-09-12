import type { TaskDataCustom } from "../Types";

const taskData: TaskDataCustom = {
	datasets: [
		{
			description: "Thousands of short audio clips of a single speaker.",
			id:          "lj_speech",
		},
		{
			description: "Multi-speaker English dataset.",
			id:          "LibriTTS",
		},
	],
	demo: {
		inputs: [
			{
				label:   "Input",
				content:
						"I love audio models on the Hub!",
				type: "text",
			},
			
		],
		outputs: [
			{
				filename: "audio.wav",
				type:     "audio",
			},
		],
	},
	metrics: [
		{
			description: "The Mel Cepstral Distortion (MCD) metric is used to calculate the quality of generated speech.",
			id:          "mel cepstral distortion",
		},
	],
	models: [
		{
			description: "A powerful TTS model.",
			id:          "suno/bark",
		},
		{
			description: "A massively multi-lingual TTS model.",
			id:          "facebook/mms-tts",
		},
		{
			description: "An end-to-end speech synthesis model.",
			id:          "microsoft/speecht5_tts",
		},
	],
	spaces:       [
		{
			description: "An application for generate highly realistic, multilingual speech.",
			id:          "suno/bark",
		},
		{
			description: "An application that contains multiple speech synthesis models for various languages and accents.",
			id:          "coqui/CoquiTTS",
		},
		{
			description: "An application that synthesizes speech for various speaker types.",
			id:          "Matthijs/speecht5-tts-demo",
		},
	],
	summary:      "Text-to-Speech (TTS) is the task of generating natural sounding speech given text input. TTS models can be extended to have a single model that generates speech for multiple speakers and multiple languages.",
	widgetModels: ["microsoft/speecht5_tts"],
	youtubeId:    "NW62DpzJ274",
};

export default taskData;
