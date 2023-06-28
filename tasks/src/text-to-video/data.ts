import type { TaskDataCustom } from "../Types";

const taskData: TaskDataCustom = {
	datasets: [
        {
			description: "(Microsoft Research Video to Text) is a large-scale dataset for the open domain video captioning",
			id:          "iejMac/CLIP-MSR-VTT",
		},
        {
			description: "(UCF101 Human Actions dataset) consists of 13,320 video clips from youtube, which are classified into 101 categories.",
			id:          "quchenyuan/UCF101-ZIP",
		},
        {
			description: "Kinetics Human Action Video Dataset is a large-scale, high-quality dataset for human action recognition in Youtube videos.",
			id:          "nateraw/kinetics",
		},
        {
			description: "The 20BN-SOMETHING-SOMETHING V2 dataset of labeled(174) video clips that show humans performing pre-defined basic actions with everyday objects.",
			id:          "HuggingFaceM4/something_something_v2",
		},
        {
			description: "This dataset consists of text-video pairs and contains a fair amount of noisy samples with irrelevant video descriptions",
			id:          "HuggingFaceM4/webvid",
		},
        {
			description: "136M video clips with captions sourced from 1.2M Youtube videos (15 years of video) that describe complex tasks with step-by-step information",
			id:          "totuta/youtube_subs_howto100M",
		},
        {
			description: "The Distinct Describable Moments (DiDeMo) has 30 sec Flickr videos for the temporal localization of events in videos given descriptions.",
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
