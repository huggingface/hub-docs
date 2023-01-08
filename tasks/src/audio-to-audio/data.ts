import type { TaskDataCustom } from "../Types";

const taskData: TaskDataCustom = {
	datasets: [
	],
	demo: {
		inputs: [
			{
				filename: "input.wav",
				type:     "audio",
			},
		],
		outputs: [
			{
				filename: "label-0.wav",
				type:     "audio",
			},
			{
				filename: "label-1.wav",
				type:     "audio",
			},
		],
	},
	metrics: [
		{
			description: "The Signal-to-Noise ratio is the relationship between the target signal level and the background noise level. It is calculated as the logarithm of the target signal divided by the background noise, in decibels.",
			id:          "snri",
		},
		{
			description: "The Signal-to-Distortion ratio is the relationship between the target signal and the sum of noise, interference, and artifact errors",
			id:          "sdri",
		},
	],
	models: [
		{
			description: "A solid model of audio source separation.",
			id:          "speechbrain/sepformer-wham",
		},
		{
			description: "A speech enhancement model.",
			id:          "speechbrain/metricgan-plus-voicebank",
		},
	],
	spaces:       [
		{
			description: "An application that can separate speech.",
			id:          "akhaliq/speechbrain-speech-seperation",
		},
		{
			description: "An application that can translate from speech to speech between Hokkien and English.",
			id:          "facebook/Hokkien_Translation",
		},
	],
	summary:      "Audio-to-Audio is a family of tasks in which the input is an audio and the output is one or multiple generated audios. Some example tasks are speech enhancement and source separation.",
	widgetModels: ["speechbrain/sepformer-wham"],
	youtubeId:    "iohj7nCCYoM",
};

export default taskData;
