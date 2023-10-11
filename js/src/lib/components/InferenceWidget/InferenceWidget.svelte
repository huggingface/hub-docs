<script lang="ts">
	import type { SvelteComponent } from "svelte";
	import type { PipelineType } from "../../interfaces/Types";
	import type { WidgetProps } from "./shared/types";

	import { InferenceDisplayability } from "../../interfaces/InferenceDisplayability";
	import IconInfo from "../Icons/IconInfo.svelte";

	import AudioClassificationWidget from "./widgets/AudioClassificationWidget/AudioClassificationWidget.svelte";
	import AudioToAudioWidget from "./widgets/AudioToAudioWidget/AudioToAudioWidget.svelte";
	import AutomaticSpeechRecognitionWidget from "./widgets/AutomaticSpeechRecognitionWidget/AutomaticSpeechRecognitionWidget.svelte";
	import ConversationalWidget from "./widgets/ConversationalWidget/ConversationalWidget.svelte";
	import FeatureExtractionWidget from "./widgets/FeatureExtractionWidget/FeatureExtractionWidget.svelte";
	import FillMaskWidget from "./widgets/FillMaskWidget/FillMaskWidget.svelte";
	import ImageClassificationWidget from "./widgets/ImageClassificationWidget/ImageClassificationWidget.svelte";
	import ImageSegmentationWidget from "./widgets/ImageSegmentationWidget/ImageSegmentationWidget.svelte";
	import ImageToImageWidget from "./widgets/ImageToImageWidget/ImageToImageWidget.svelte";
	import ImageToTextWidget from "./widgets/ImageToTextWidget/ImageToTextWidget.svelte";
	import ObjectDetectionWidget from "./widgets/ObjectDetectionWidget/ObjectDetectionWidget.svelte";
	import QuestionAnsweringWidget from "./widgets/QuestionAnsweringWidget/QuestionAnsweringWidget.svelte";
	import ReinforcementLearningWidget from "./widgets/ReinforcementLearningWidget/ReinforcementLearningWidget.svelte";
	import SentenceSimilarityWidget from "./widgets/SentenceSimilarityWidget/SentenceSimilarityWidget.svelte";
	import SummarizationWidget from "./widgets/SummarizationWidget/SummarizationWidget.svelte";
	import TableQuestionAnsweringWidget from "./widgets/TableQuestionAnsweringWidget/TableQuestionAnsweringWidget.svelte";
	import TabularDataWidget from "./widgets/TabularDataWidget/TabularDataWidget.svelte";
	import TextGenerationWidget from "./widgets/TextGenerationWidget/TextGenerationWidget.svelte";
	import TextToImageWidget from "./widgets/TextToImageWidget/TextToImageWidget.svelte";
	import TextToSpeechWidget from "./widgets/TextToSpeechWidget/TextToSpeechWidget.svelte";
	import TokenClassificationWidget from "./widgets/TokenClassificationWidget/TokenClassificationWidget.svelte";
	import VisualQuestionAnsweringWidget from "./widgets/VisualQuestionAnsweringWidget/VisualQuestionAnsweringWidget.svelte";
	import ZeroShotClassificationWidget from "./widgets/ZeroShowClassificationWidget/ZeroShotClassificationWidget.svelte";
	import ZeroShotImageClassificationWidget from "./widgets/ZeroShotImageClassificationWidget/ZeroShotImageClassificationWidget.svelte";
	import WidgetHeader from "./shared/WidgetHeader/WidgetHeader.svelte";
	import { modelLoadStates } from "./stores";

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
		"conversational": ConversationalWidget,
		"feature-extraction": FeatureExtractionWidget,
		"fill-mask": FillMaskWidget,
		"image-classification": ImageClassificationWidget,
		"image-to-image": ImageToImageWidget,
		"image-to-text": ImageToTextWidget,
		"image-segmentation": ImageSegmentationWidget,
		"object-detection": ObjectDetectionWidget,
		"question-answering": QuestionAnsweringWidget,
		"sentence-similarity": SentenceSimilarityWidget,
		"summarization": SummarizationWidget,
		"table-question-answering": TableQuestionAnsweringWidget,
		"text2text-generation": TextGenerationWidget,
		"text-classification": FillMaskWidget,
		"text-generation": TextGenerationWidget,
		"token-classification": TokenClassificationWidget,
		"text-to-image": TextToImageWidget,
		"text-to-speech": TextToSpeechWidget,
		"text-to-audio": TextToSpeechWidget,
		"translation": TextGenerationWidget,
		"tabular-classification": TabularDataWidget,
		"tabular-regression": TabularDataWidget,
		"visual-question-answering": VisualQuestionAnsweringWidget,
		"reinforcement-learning": ReinforcementLearningWidget,
		"zero-shot-classification": ZeroShotClassificationWidget,
		"document-question-answering": VisualQuestionAnsweringWidget,
		"zero-shot-image-classification": ZeroShotImageClassificationWidget,
	};

	const hasExampleWithOutput = model.widgetData?.some(sample => !!sample.output);
	$: modelTooBig = $modelLoadStates[model.id]?.state === "TooBig";

	$: widgetComponent = WIDGET_COMPONENTS[model.pipeline_tag ?? ""];

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
</script>

{#if widgetComponent}
	{#if (model.inference === InferenceDisplayability.Yes || model.pipeline_tag === "reinforcement-learning") && !modelTooBig}
		<svelte:component this={WIDGET_COMPONENTS[model.pipeline_tag ?? ""]} {...widgetProps} />
	{:else}
		<!-- All the cases why inference widget is disabled -->
		{#if !hasExampleWithOutput}
			<WidgetHeader pipeline={model.pipeline_tag} noTitle={true} />
		{/if}
		{#if model.inference === InferenceDisplayability.ExplicitOptOut}
			<span class="text-sm text-gray-500">Inference API has been turned off for this model.</span>
		{:else if model.inference === InferenceDisplayability.CustomCode}
			<span class="text-sm text-gray-500">Inference API does not yet support model repos that contain custom code.</span
			>
		{:else if model.inference === InferenceDisplayability.LibraryNotDetected}
			<span class="text-sm text-gray-500">
				Unable to determine this model's library. Check the
				<a class="color-inherit" href="/docs/hub/model-cards#specifying-a-library">
					docs <IconInfo classNames="inline" />
				</a>.
			</span>
		{:else if model.inference === InferenceDisplayability.PipelineNotDetected}
			<span class="text-sm text-gray-500">
				Unable to determine this model’s pipeline type. Check the
				<a class="color-inherit" href="/docs/hub/models-widgets#enabling-a-widget">
					docs <IconInfo classNames="inline" />
				</a>.
			</span>
		{:else if model.inference === InferenceDisplayability.PipelineLibraryPairNotSupported}
			<span class="text-sm text-gray-500">
				Inference API does not yet support {model.library_name} models for this pipeline type.
			</span>
		{:else if modelTooBig}
			<span class="text-sm text-gray-500">
				Model is too large to load onto the free Inference API. To try the model, launch it on <a
					class="underline"
					href="https://ui.endpoints.huggingface.co/new?repository={encodeURIComponent(model.id)}"
					>Inference Endpoints</a
				>
				instead.
			</span>
		{:else}
			<!-- added as a failsafe but this case cannot currently happen -->
			<span class="text-sm text-gray-500">
				Inference API is disabled for an unknown reason. Please open a
				<a class="color-inherit underline" href="/{model.id}/discussions/new">Discussion in the Community tab</a>.
			</span>
		{/if}

		<!-- If there is an example with output, then show the widget with disabled interaction -->
		{#if hasExampleWithOutput}
			<span class="text-sm text-gray-500">
				However, you can still play with
				<a class="color-inherit underline" href="/docs/hub/models-widgets#example-outputs"
					>examples that have an output</a
				>.
			</span>
			<svelte:component this={WIDGET_COMPONENTS[model.pipeline_tag ?? ""]} {...widgetProps} isDisabled={true} />
		{/if}
	{/if}
{/if}
