import type { TaskDataCustom } from "../Types";

const taskData: TaskDataCustom = {
	datasets: [
        {
			description: "Microsoft Research Video to Text is a large-scale dataset for open domain video captioning",
			id:          "iejMac/CLIP-MSR-VTT",
		},
        {
			description: "UCF101 Human Actions dataset consists of 13,320 video clips from YouTube, with 101 classes.",
			id:          "quchenyuan/UCF101-ZIP",
		},
        {
			description: "A high-quality dataset for human action recognition in YouTube videos.",
			id:          "nateraw/kinetics",
		},
        {
			description: "A dataset of video clips of humans performing pre-defined basic actions with everyday objects.",
			id:          "HuggingFaceM4/something_something_v2",
		},
        {
			description: "This dataset consists of text-video pairs and contains noisy samples with irrelevant video descriptions",
			id:          "HuggingFaceM4/webvid",
		},
        {
			description: "Large dataset of video clips with captions sourced from Youtube videos on complex tasks with step-by-step information.",
			id:          "totuta/youtube_subs_howto100M",
		},
        {
			description: "A dataset of short Flickr videos for the temporal localization of events with descriptions.",
			id:          "iejMac/CLIP-DiDeMo",
		},
    ],
	demo:     {
		inputs:  [],
		outputs: [],
	},
	isPlaceholder: true,
	metrics:       [],
	models:        [
		{
			description: "A strong model for video generation.",
			id:          "PAIR/text2video-zero-controlnet-canny-arcane",
		},
		{
			description: "A robust model for text-to-video generation.",
			id:          "THUDM/CogVideo",
		},
        
    ],
	spaces:        [],
	summary:       "Text-to-video is the task of generating videos from text. ",
	widgetModels:  [],
	youtubeId:     undefined,
};

export default taskData;
