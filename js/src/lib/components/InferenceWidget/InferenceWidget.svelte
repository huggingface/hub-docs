<script lang="ts">
	import type { SvelteComponent } from "svelte";
	import type { PipelineType } from "../../interfaces/Types";
	import type { WidgetProps } from "./shared/types";

	// Endpoints modification:
	import { setContext } from "svelte";
	import { writable } from "svelte/store";

	import AudioClassificationWidget from "./widgets/AudioClassificationWidget/AudioClassificationWidget.svelte";
	import AudioToAudioWidget from "./widgets/AudioToAudioWidget/AudioToAudioWidget.svelte";
	import AutomaticSpeechRecognitionWidget from "./widgets/AutomaticSpeechRecognitionWidget/AutomaticSpeechRecognitionWidget.svelte";
	import ConversationalWidget from "./widgets/ConversationalWidget/ConversationalWidget.svelte";
	import FeatureExtractionWidget from "./widgets/FeatureExtractionWidget/FeatureExtractionWidget.svelte";
	import FillMaskWidget from "./widgets/FillMaskWidget/FillMaskWidget.svelte";
	import ImageClassificationWidget from "./widgets/ImageClassificationWidget/ImageClassificationWidget.svelte";
	import ImageToTextWidget from "./widgets/ImageToTextWidget/ImageToTextWidget.svelte";
	import ImageSegmentationWidget from "./widgets/ImageSegmentationWidget/ImageSegmentationWidget.svelte";
	import ObjectDetectionWidget from "./widgets/ObjectDetectionWidget/ObjectDetectionWidget.svelte";
	import QuestionAnsweringWidget from "./widgets/QuestionAnsweringWidget/QuestionAnsweringWidget.svelte";
	import VisualQuestionAnsweringWidget from "./widgets/VisualQuestionAnsweringWidget/VisualQuestionAnsweringWidget.svelte";
	import SentenceSimilarityWidget from "./widgets/SentenceSimilarityWidget/SentenceSimilarityWidget.svelte";
	import SummarizationWidget from "./widgets/SummarizationWidget/SummarizationWidget.svelte";
	import TableQuestionAnsweringWidget from "./widgets/TableQuestionAnsweringWidget/TableQuestionAnsweringWidget.svelte";
	import TextGenerationWidget from "./widgets/TextGenerationWidget/TextGenerationWidget.svelte";
	import TextToImageWidget from "./widgets/TextToImageWidget/TextToImageWidget.svelte";
	import TextToSpeechWidget from "./widgets/TextToSpeechWidget/TextToSpeechWidget.svelte";
	import TokenClassificationWidget from "./widgets/TokenClassificationWidget/TokenClassificationWidget.svelte";
	import TabularDataWidget from "./widgets/TabularDataWidget/TabularDataWidget.svelte";
	import ReinforcementLearningWidget from "./widgets/ReinforcementLearningWidget/ReinforcementLearningWidget.svelte";
	import ZeroShotClassificationWidget from "./widgets/ZeroShowClassificationWidget/ZeroShotClassificationWidget.svelte";
	import ZeroShotImageClassificationWidget from "./widgets/ZeroShotImageClassificationWidget/ZeroShotImageClassificationWidget.svelte";
	import CustomTaskWidget from "./widgets/CustomTask/CustomTaskWidget.svelte"; // Endpoints modification

	export let apiToken: WidgetProps["apiToken"] = undefined;
	export let callApiOnMount = false;
	export let apiUrl = "https://api-inference.huggingface.co";
	export let model: WidgetProps["model"];
	export let noTitle = false;
	export let shouldUpdateUrl = false;
	export let includeCredentials = false;
	export let isLoggedIn = false;

	// Note: text2text-generation, text-generation and translation all
	// uses the TextGenerationWidget as they work almost the same.
	// Same goes for fill-mask and text-classification.
	// In the future it may be useful / easier to maintain if we created
	// a single dedicated widget for each pipeline type.
	const WIDGET_COMPONENTS: {
		[key in PipelineType]?: typeof SvelteComponent;
	} = {
		"audio-to-audio": AudioToAudioWidget,
		"audio-classification": AudioClassificationWidget,
		"automatic-speech-recognition": AutomaticSpeechRecognitionWidget,
		conversational: ConversationalWidget,
		"feature-extraction": FeatureExtractionWidget,
		"fill-mask": FillMaskWidget,
		"image-classification": ImageClassificationWidget,
		"image-to-text": ImageToTextWidget,
		"image-segmentation": ImageSegmentationWidget,
		"object-detection": ObjectDetectionWidget,
		"question-answering": QuestionAnsweringWidget,
		"sentence-similarity": SentenceSimilarityWidget,
		summarization: SummarizationWidget,
		"table-question-answering": TableQuestionAnsweringWidget,
		"text2text-generation": TextGenerationWidget,
		"text-classification": FillMaskWidget,
		"text-generation": TextGenerationWidget,
		"token-classification": TokenClassificationWidget,
		"text-to-image": TextToImageWidget,
		"text-to-speech": TextToSpeechWidget,
		translation: TextGenerationWidget,
		"tabular-classification": TabularDataWidget,
		"tabular-regression": TabularDataWidget,
		"visual-question-answering": VisualQuestionAnsweringWidget,
		"reinforcement-learning": ReinforcementLearningWidget,
		"zero-shot-classification": ZeroShotClassificationWidget,
		"document-question-answering": VisualQuestionAnsweringWidget,
		"zero-shot-image-classification": ZeroShotImageClassificationWidget,
		// Endpoints modification:
		"sentence-ranking": CustomTaskWidget,
		"sentence-embeddings": CustomTaskWidget,
		"custom": CustomTaskWidget,
	};

	// Endpoints modification:
	const widgetInput: WidgetInputStore = writable({ body: { inputs: "" } });
	setContext("widgetInput", widgetInput);

	$: widgetComponent = model && WIDGET_COMPONENTS[model.pipeline_tag ?? ""];

	// prettier-ignore
	$: widgetProps = ({
		apiToken,
		apiUrl,
		callApiOnMount,
		model,
		noTitle,
		shouldUpdateUrl,
		includeCredentials,
		isLoggedIn,
	}) as WidgetProps;

	// Endpoints modification
	$: isVisionFeatureExtraction =
		model.pipeline_tag === "feature-extraction" &&
		(model.tags?.some((t: string) =>
			[
				"vision",
				"vit",
				"clip",
				"vision-encoder-decoder",
				"image-classification",
				"image-segmentation",
				"image-to-image",
				"object-detection",
			].includes(t)
		) ||
			model.config?.architectures.some((a: string) =>
				["ViTModel", "VisionEncoderDecoderModel"].includes(a)
			) ||
			model.config?.model_type === "vit" ||
			model.config?.model_type === "vision-encoder-decoder");
</script>

// Endpoints modification:
{#if widgetComponent && !isVisionFeatureExtraction}
	<svelte:component
		this={WIDGET_COMPONENTS[model.pipeline_tag ?? ""]}
		{...widgetProps}
	/>
{:else}
	<div class="text-gray-500 italic text-lg text-center my-4">
		{isVisionFeatureExtraction ? "Feature extraction on images" : "Task"} not supported
		for inference widget. <br />
		<a
			class="underline text-sm"
			href="mailto:api-enterprise@huggingface.co?subject=Inference%20Endpoints%20widget"
			target="_blank">Contact us for an update</a
		>
	</div>
{/if}
