import type { TaskDataCustom } from "../Types";

const taskData: TaskDataCustom = {
	datasets: [
		{
			// TODO write proper description
			description: "Benchmark dataset used for depth estimation with images that belong to 100 classes.",
			id:          "cifar100",
		},
		{
			// TODO write proper description
			description: "Dataset consisting of images of garments.",
			id:          "fashion_mnist",
		},
	],
	demo: {
		inputs: [
			{
				filename: "depth-estimation-input.jpeg",
				type:     "img",
			},
		],
		outputs: [
			{
				filename: "depth-estimation-output.png",
				type:     "img",
			},
		],
	},
	metrics: [],
	models: [
		{
			// TO DO: write description
			description: "Strong Depth Estimation model trained on 1.4 million images.",
			id:          "Intel/dpt-large",
		},
		{
			// TO DO: write description
			description: "Strong Depth Estimation model trained on the KITTI dataset.",
			id:          "vinvino02/glpn-kitti",
		},
	],
	summary:      "Depth estimation is the task of predicting depth of the objects present in an image.",
	widgetModels: ["Intel/dpt-large"],
	youtubeId:    "",
};

export default taskData;
