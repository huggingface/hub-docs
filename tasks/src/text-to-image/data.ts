import type { TaskDataCustom } from "../Types";

const taskData: TaskDataCustom = {
    datasets:      [
        {
            description: "A large-scale image dataset containing images of everyday objects and people with their textual descriptions.",
            id:          "ChristophSchuhmann/MS_COCO_2017_URL_TEXT",
        },
        {
            description: "A dataset created from Midjourney User Prompts & Generated Images",
            id:          "nateraw/midjourney-texttoimage-new",
        },
    ],
    demo:          {
		inputs:  [],
		outputs: [],
	},
    metrics:       [],
    models:        [
        {
            description: "A model that can be used to generate images based on text prompts. The DALL·E Mega model is the largest version of DALLE Mini.",
            id:          "dalle-mini/dalle-mega",
        },
        {
            description: "A latent text-to-image diffusion model capable of generating photo-realistic images given any text input.",
            id:          "CompVis/stable-diffusion-v1-4",
        },
    ],
    summary:      "Generating image from input text. These models that can be used to generate and modify images based on text prompts.",
    widgetModels: [],
    youtubeId:    "",
};

export default taskData;
