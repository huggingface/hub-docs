import type { TaskDataCustom } from "../Types";

const taskData: TaskDataCustom = {
	datasets: [
		{
			// TODO write proper description
			description: "Caltech-UCSD Birds-200-2011 is an extended version of the CUB-200 dataset, with roughly double the number of images per class and new part location annotations.",
			id:          "CUB-200-2011",
		},
		{
			// TODO write proper description
			description: "Oxford-102 Flower is a 102 category dataset, consisting of 102 flower categories. The flowers are chosen to be flower commonly occurring in the United Kingdom. The images have large scale, pose and light variations.",
			id:          "Oxford-102 Flower",

		},
		{
			description:"COCO is a large-scale object detection, segmentation, and captioning dataset.",
			id: "MS-COCO"
		},
		{
			description:  "Multi-Modal-CelebA-HQ is a large-scale face image dataset for text-to-image-generation, text-guided image manipulation, sketch-to-image generation, GANs for face generation and editing, image caption, and VQA",
			id: "Multi_Modal_Celeba_HQ"
		},
		{
			description:  "CelebA-Dialog is a large-scale visual-language face dataset. It has two properties: (1) Facial images are annotated with rich fine-grained labels, which classify one attribute into multiple degrees according to its semantic meaning. (2) Accompanied with each image, there are captions describing the attributes and a user request sample.",
			id : 'CelebA_Dialog'
		},
		{
			description:  "FFHQ-Text is a small-scale face image dataset with large-scale facial attributes, designed for text-to-face generation & manipulation, text-guided facial image manipulation, and other vision-related tasks",
			id : "FFHQ-Text"
		},
		{
			description:"CelebAText-HQ is a large-scale face image dataset with large-scale facial attributes, designed for text-to-face generation",
			id: 'CelebAText-HQ'
		},
		{
			description:"CelebA-Dialog is a large-scale visual-language face dataset with the following features. Facial images are annotated with rich fine-grained labels, which classify one attribute into multiple degrees according to its semantic meaning. Accompanied with each image, there are textual captions describing the attributes and a user editing request sample",
			id :'CelebA-Dialog'
		},
		{
			description:'DeepFashion-MultiModal is a large-scale high-quality human dataset with rich multi-modal annotations.',
			id: 'DeepFashion-MultiModal'
		}

	],
	demo: {
		inputs: [],
		outputs: []
	},
	metrics: [
		{
			description: "The inception score involves using a pre-trained deep learning neural network model for image classification to classify the generated images.",
			id:          "IS",
		},
		{
			description: "The Fréchet inception distance (FID) is a metric used to assess the quality of images created by a generative model, like a generative adversarial network (GAN).",
			id:          "FID",
		},
		{
			description: "R-precision is defined as the proportion of the top-R retrieved documents that are relevant, where R is the number of relevant documents for the current query.",
			id:          "R-precision",
		},
		{
			description: "L2 loss, also known as Squared Error Loss, is the squared difference between a prediction and the actual value, calculated for each example in a dataset",
			id:          "L2",
		},
		{
			description:"'Learned Perceptual Image Patch Similarity' evaluates the distance between image patches. Higher means further/more different. Lower means more similar.",
			id:			 "LPIPS"
		},

	],
	models: [
		{
			// TO DO: write description
			description: '',
			id:          ''
		},
		
	],
	summary:      "Deep learning research has achieved several significant technological advances in the domains of Computer Vision (CV) and Natural Language Processing (NLP) over the past few decades. In these hitherto distinct domains, researchers now seem interested in fusing semantic and visual information. Numerous studies have been done on text-to-image synthesis methods, which convert the textual description (keywords or sentences) that is input into realistic visuals",
	widgetModels: [],
	youtubeId:    "SVcsDDABEkM",
};

export default taskData;
