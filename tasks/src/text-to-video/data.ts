import type { TaskDataCustom } from "../Types";

const taskData: TaskDataCustom = {
	datasets: [
        {
			description: "(Microsoft Research Video to Text) is a large-scale dataset for the open domain video captioning, which consists of 10,000 video clips from 20 categories, and each video clip is annotated with 20 English sentences.There are about 29,000 unique words in all captions. The standard splits uses 6,513 clips for training, 497 clips for validation, and 2,990 clips for testing.",
			id:          "iejMac/CLIP-MSR-VTT",
		},
        {
			description: "(UCF101 Human Actions dataset) is an extension of UCF50 and consists of 13,320 video clips, which are classified into 101 categories. These 101 categories can be classified into 5 types (Body motion, Human-human interactions, Human-object interactions, Playing musical instruments and Sports). The total length of these video clips is over 27 hours. All the videos are collected from YouTube and have a fixed frame rate of 25 FPS with the resolution of 320 × 240.",
			id:          "quchenyuan/UCF101-ZIP",
		},
        {
			description: "Kinetics Human Action Video Dataset is a large-scale, high-quality dataset for human action recognition in videos. The dataset consists of around 500,000 video clips covering 600 human action classes with at least 600 video clips for each action class. Each video clip lasts around 10 seconds and is labeled with a single action class. The videos are collected from YouTube.",
			id:          "nateraw/kinetics",
		},
        {
			description: "The 20BN-SOMETHING-SOMETHING V2 dataset is a large collection of labeled video clips that show humans performing pre-defined basic actions with everyday objects.  It contains 220,847 videos, with 168,913 in the training set, 24,777 in the validation set and 27,157 in the test set. There are 174 labels.",
			id:          "HuggingFaceM4/something_something_v2",
		},
        {
			description: "This dataset consists of 10.7 million pairs of text-video pairs (52K video hours) and contains a fair amount of noisy samples with irrelevant video descriptions",
			id:          "HuggingFaceM4/webvid",
		},
        {
			description: "This dataset consists of 136M video clips with captions that describe complex tasks with step-by-step information on how to perform 23k activities from domains such as cooking, hand crafting, personal care, gardening or fitness. It has 136M video clips with captions sourced from 1.2M Youtube videos (15 years of video)",
			id:          "totuta/youtube_subs_howto100M",
		},
        {
			description: "The Distinct Describable Moments (DiDeMo) dataset is one of the largest and most diverse datasets for the temporal localization of events in videos given natural language descriptions. The videos are collected from Flickr and each video is trimmed to a maximum of 30 seconds.",
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
			description: "Text-to-Image Diffusion Models are Zero-Shot Video Generators",
			id:          "PAIR/text2video-zero-controlnet-canny-arcane",
		},
		{
			description: "Large-scale Pretraining for Text-to-Video Generation via Transformers",
			id:          "THUDM/CogVideo",
		},
        
    ],
	spaces:        [],
	summary:       "",
	widgetModels:  [],
	youtubeId:     undefined,
};

export default taskData;
