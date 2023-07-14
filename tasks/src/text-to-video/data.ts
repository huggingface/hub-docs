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
	metrics:       [
		{
			description: "Inception Score uses an image classification model that predicts class labels and evaluates how distinct and diverse the images are. A higher score indicates better video generation.",
			id: "is",
		},
		{
			description: "Frechet Inception Distance uses last activations before the classifier layer of an image classification model as embeddings. The metric compares mean and standard deviation of the embeddings of real and generated images. A smaller score indicates better video generation.",
			id: "fid",
		},
		{
			description: "Frechet Video Distance uses a model that captures coherence for changes in frames and the quality of each frame. A smaller score indicates better video generation.",
			id: "fvd",
		},
		{
			description: "CLIPSIM measures similarity between video frames and text using an image-text similarity model. A higher score indicates better video generation.",
			id: "clipsim",
		},
	],
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
