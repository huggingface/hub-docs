import type { TaskDataCustom } from "../Types";

const taskData: TaskDataCustom = {
    datasets: [
        {
            description: "Dataset used to train Pokémon text to image model.",
            id: "lambdalabs/pokemon-blip-captions",
        },
        {
            description: "A dataset that contains more than 30K images with their corresponding text from the Shahnameh.",
            id: "sadrasabouri/ShahNegar",
        },
    ],
    demo: {
        inputs: [],
        outputs: [],
    },
    metrics: [],
    models: [
        {
            description: "A latent text-to-image diffusion model capable of generating photo-realistic images given any text input.",
            id: "CompVis/stable-diffusion-v1-4",
        },
        {
            description: "A latent text-to-image diffusion model that has been conditioned on high-quality anime images through fine-tuning.",
            id: "hakurei/waifu-diffusion",
        },
    ],
    summary: "Generating image from input text. These models that can be used to generate and modify images based on text prompts.",
    widgetModels: [],
    youtubeId: "",
};

export default taskData;
