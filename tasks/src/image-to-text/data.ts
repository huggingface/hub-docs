import type { TaskDataCustom } from "../Types";

const taskData: TaskDataCustom = {
    datasets: [
        {
            description: "Benchmark dataset used for image-to-text containing 12M image-text pairs.",
            id: "red_caps"
        },
        {
            description: "Dataset consisting of more than 3M image-text pairs harvested from the web.",
            id: "conceptual_captions"
        }
    ],
    demo: {
        inputs: [
            {
                filename: "image-to-text-input.jpg",
                type: "img",
            },
        ],
        outputs: [
            {
                label: "Output",
                content: "a dog running in the water with a frisbee.",
                type: "text"
            }
        ]
    },
    metrics: [
        {
            description: "BLEU score is calculated by counting the number of shared single or subsequent tokens between the generated sequence and the reference. Subsequent n tokens are called “n-grams”. Unigram refers to a single token while bi-gram refers to token pairs and n-grams refer to n subsequent tokens. The score ranges from 0 to 1, where 1 means the translation perfectly matched and 0 did not match at all",
            id: "bleu",
        },
    ],
    models: [
        {
            description: "Resonable Image Captioning model using encoder-decoder architecture.",
            id: "nlpconnect/vit-gpt2-image-captioning",
        },
        {
            description: "TrOCR model is fine-tuned on the SROIE dataset.",
            id: "microsoft/trocr-base-printed",
        },
    ],
    summary: "Image-to-Text or Image Captioning is the task of describing contents of an image in natural-language sentence.",
    widgetModels: ["nlpconnect/vit-gpt2-image-captioning"],
    youtubeId: "",
};

export default taskData;