import type { TaskDataCustom } from "../Types";

const taskData: TaskDataCustom = {
	datasets: [
		{
			description: "Scene segmentation dataset.",
			id:          "scene_parse_150",
		},
	],
	demo: {
		inputs: [
			{
				filename: "image-segmentation-input.jpeg",
				type:     "img",
			},
		],
		outputs: [
			{
				filename: "image-segmentation-output.png",
				type:     "img",
			},
		],
	},
	metrics: [
		{
			description: "Average Precision (AP) is the Area Under the PR Curve (AUC-PR). It is calculated for each semantic class separately",
			id:          "Average Precision",
		},
		{
			description: "Mean Average Precision (mAP) is the overall average of the AP values",
			id:          "Mean Average Precision",
		},
		{
			description: "Intersection over Union (IoU) is the overlap of segmentation masks. Mean IoU is the average of the IoU of all semantic classes",
			id:          "Mean Intersection over Union",
		},
		{
			description: "APα is the Average Precision at the IoU threshold of a α value, for example, AP50 and AP75",
			id:          "APα",
		},
	],
	models: [
		{
			// TO DO: write description
			description: "Solid panoptic segmentation model trained on the COCO 2017 benchmark dataset.",
			id:          "facebook/detr-resnet-50-panoptic",
		},
		{
			description: "Semantic segmentation model trained on ADE20k benchmark dataset.",
			id:          "microsoft/beit-large-finetuned-ade-640-640",
		},
		{
			description: "Semantic segmentation model trained on ADE20k benchmark dataset with 512x512 resolution.",
			id:          "nvidia/segformer-b0-finetuned-ade-512-512",
		},
		{
			description: "Semantic segmentation model trained Cityscapes dataset.",
			id:          "facebook/mask2former-swin-large-cityscapes-semantic",
		},
		{
			description: "Panoptic segmentation model trained COCO (common objects) dataset.",
			id:          "facebook/mask2former-swin-large-coco-panoptic",
		},
	],
	spaces:       [
		{
			description: "A semantic segmentation application that can predict unseen instances out of the box.",
			id:          "facebook/ov-seg",
		},
		{
			description: "One of the strongest segmentation applications.",
			id:          "jbrinkma/segment-anything",
		},
		{
			description: "A semantic segmentation application that predicts human silhouettes.",
			id:          "keras-io/Human-Part-Segmentation",
		},
		{
			description: "An instance segmentation application to predict neuronal cell types from microscopy images.",
			id:          "rashmi/sartorius-cell-instance-segmentation",
		},
		{
			description: "An application that segments videos.",
			id:          "ArtGAN/Segment-Anything-Video",
		},
		{
			description: "An panoptic segmentation application built for outdoor environments.",
			id:          "segments/panoptic-segment-anything",
		},
	],
	summary:      "Image Segmentation divides an image into segments where each pixel in the image is mapped to an object. This task has multiple variants such as instance segmentation, panoptic segmentation and semantic segmentation.",
	widgetModels: ["facebook/detr-resnet-50-panoptic"],
	youtubeId:    "dKE8SIt9C-w",
};

export default taskData;
