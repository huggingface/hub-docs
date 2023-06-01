import type { TaskDataCustom } from "../Types";

const taskData: TaskDataCustom = {
	datasets: [
        {
			description: "(Microsoft Research Video to Text) is a large-scale dataset for the open domain video captioning, which consists of 10,000 video clips from 20 categories, and each video clip is annotated with 20 English sentences.There are about 29,000 unique words in all captions. The standard splits uses 6,513 clips for training, 497 clips for validation, and 2,990 clips for testing.",
			id:          "MSR-VTT",
		},
        {
			description: "(UCF101 Human Actions dataset) is an extension of UCF50 and consists of 13,320 video clips, which are classified into 101 categories. These 101 categories can be classified into 5 types (Body motion, Human-human interactions, Human-object interactions, Playing musical instruments and Sports). The total length of these video clips is over 27 hours. All the videos are collected from YouTube and have a fixed frame rate of 25 FPS with the resolution of 320 × 240.",
			id:          "UCF101",
		},
        {
			description: "Kinetics Human Action Video Dataset is a large-scale, high-quality dataset for human action recognition in videos. The dataset consists of around 500,000 video clips covering 600 human action classes with at least 600 video clips for each action class. Each video clip lasts around 10 seconds and is labeled with a single action class. The videos are collected from YouTube.",
			id:          "Kinetics",
		},
        {
			description: "The 20BN-SOMETHING-SOMETHING V2 dataset is a large collection of labeled video clips that show humans performing pre-defined basic actions with everyday objects.  It contains 220,847 videos, with 168,913 in the training set, 24,777 in the validation set and 27,157 in the test set. There are 174 labels.",
			id:          "Something-Something V2",
		},
        {
			description: "CelebV-Text comprises 70,000 in-the-wild face video clips with diverse visual content, each paired with 20 texts generated using the proposed semi-automatic text generation strategy. The provided texts describes both static and dynamic attributes precisely.",
			id:          "CelebV-Text",
		},
        {
			description: "This dataset consists of 10.7 million pairs of text-video pairs (52K video hours) and contains a fair amount of noisy samples with irrelevant video descriptions",
			id:          "WebVid",
		},
        {
			description: "This dataset consists of 136M video clips with captions that describe complex tasks with step-by-step information on how to perform 23k activities from domains such as cooking, hand crafting, personal care, gardening or fitness. It has 136M video clips with captions sourced from 1.2M Youtube videos (15 years of video)",
			id:          "Howto100M",
		},
        {
			description: "This dataset focuses on the event localization task such that the captions of videos describe the relative location of objects and actions in detail.",
			id:          "QuerYD",
		},
        {
			description: "The Distinct Describable Moments (DiDeMo) dataset is one of the largest and most diverse datasets for the temporal localization of events in videos given natural language descriptions. The videos are collected from Flickr and each video is trimmed to a maximum of 30 seconds.",
			id:          "DiDeMo",
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
			description: "Text-to-Video Generation without Text-Video Data",
			id:          "Make-A-Video",
		},
        {
			description: "Diffusion over Diffusion for eXtremely Long Video Generation",
			id:          "NUWA-XL",
		},
        {
			description: "A multi-modal AI system that can generate novel videos with text, images, or video clips",
			id:          "Runway Gen2",
		},
        {
			description: "Masked Generative Video Transformer",
			id:          "MAGVIT",
		},
        {
			description: "Generating Open-DomaIn Videos from nAtural Descriptions",
			id:          "GODIVA",
		},
        {
			description: "Text-to-Image Diffusion Models are Zero-Shot Video Generators",
			id:          "Text2Video-Zero",
		},
        {
			description: "Visual Synthesis Pre-training for Neural visUal World creAtion",
			id:          "NUWA",
		},
        {
			description: "Structure and Content-Guided Video Synthesis with Diffusion Models",
			id:          "Runway Gen1",
		},
        {
			description: "Large-scale Pretraining for Text-to-Video Generation via Transformers",
			id:          "CogVideo",
		},
    ],
	spaces:        [],
	summary:       "",
	widgetModels:  [],
	youtubeId:     undefined,
};

export default taskData;
