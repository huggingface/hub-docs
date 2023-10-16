<script lang="ts">
	import type { WidgetProps, ExampleRunOpts, InferenceRunFlags } from "../../shared/types";
	import type { WidgetExampleTextInput } from "../../shared/WidgetExample";

	import { onMount } from "svelte";

	import WidgetOutputText from "../../shared/WidgetOutputText/WidgetOutputText.svelte";
	import WidgetSubmitBtn from "../../shared/WidgetSubmitBtn/WidgetSubmitBtn.svelte";
	import WidgetTextarea from "../../shared/WidgetTextarea/WidgetTextarea.svelte";
	import WidgetWrapper from "../../shared/WidgetWrapper/WidgetWrapper.svelte";
	import {
		addInferenceParameters,
		getWidgetExample,
		getResponse,
		getSearchParams,
		updateUrl,
	} from "../../shared/helpers";
	import { isTextInput } from "../../shared/inputValidation";

	export let apiToken: WidgetProps["apiToken"];
	export let apiUrl: WidgetProps["apiUrl"];
	export let callApiOnMount: WidgetProps["callApiOnMount"];
	export let model: WidgetProps["model"];
	export let noTitle: WidgetProps["noTitle"];
	export let shouldUpdateUrl: WidgetProps["shouldUpdateUrl"];
	export let includeCredentials: WidgetProps["includeCredentials"];

	let computeTime = "";
	let error: string = "";
	let isLoading = false;
	let modelLoading = {
		isLoading: false,
		estimatedTime: 0,
	};
	let output = "";
	let outputJson: string;
	let text = "";
	let setTextAreaValue: (text: string) => void;

	onMount(() => {
		const [textParam] = getSearchParams(["text"]);
		if (textParam) {
			setTextAreaValue(textParam);
			getOutput();
		} else {
			const example = getWidgetExample<WidgetExampleTextInput>(model, isTextInput);
			if (example && callApiOnMount) {
				applyInputSample(example, { inferenceOpts: { isOnLoadCall: true } });
			}
		}
	});

	async function getOutput({ withModelLoading = false, isOnLoadCall = false }: InferenceRunFlags = {}) {
		const trimmedValue = text.trim();

		if (!trimmedValue) {
			error = "You need to input some text";
			output = "";
			outputJson = "";
			return;
		}

		if (shouldUpdateUrl && !isOnLoadCall) {
			updateUrl({ text: trimmedValue });
		}

		const requestBody = { inputs: trimmedValue };
		addInferenceParameters(requestBody, model);

		isLoading = true;

		const res = await getResponse(
			apiUrl,
			model.id,
			requestBody,
			apiToken,
			parseOutput,
			withModelLoading,
			includeCredentials,
			isOnLoadCall
		);

		isLoading = false;
		// Reset values
		computeTime = "";
		error = "";
		modelLoading = { isLoading: false, estimatedTime: 0 };
		output = "";
		outputJson = "";

		if (res.status === "success") {
			computeTime = res.computeTime;
			output = res.output;
			outputJson = res.outputJson;
		} else if (res.status === "loading-model") {
			modelLoading = {
				isLoading: true,
				estimatedTime: res.estimatedTime,
			};
			getOutput({ withModelLoading: true });
		} else if (res.status === "error") {
			error = res.error;
		}
	}

	function parseOutput(body: unknown): string {
		if (Array.isArray(body) && body.length) {
			return body[0]?.["summary_text"] ?? "";
		}
		throw new TypeError("Invalid output: output must be of type Array & non-empty");
	}

	function applyInputSample(
		sample: WidgetExampleTextInput,
		{ isPreview = false, inferenceOpts = {} }: ExampleRunOpts = {}
	) {
		setTextAreaValue(sample.text);
		if (isPreview) {
			return;
		}
		getOutput(inferenceOpts);
	}
</script>

<WidgetWrapper
	{apiUrl}
	{includeCredentials}
	{applyInputSample}
	{computeTime}
	{error}
	{isLoading}
	{model}
	{modelLoading}
	{noTitle}
	{outputJson}
	validateExample={isTextInput}
>
	<svelte:fragment slot="top">
		<form class="space-y-2">
			<WidgetTextarea bind:value={text} bind:setValue={setTextAreaValue} />
			<WidgetSubmitBtn
				{isLoading}
				onClick={() => {
					getOutput();
				}}
			/>
		</form>
	</svelte:fragment>
	<svelte:fragment slot="bottom">
		<WidgetOutputText classNames="mt-4" {output} />
	</svelte:fragment>
</WidgetWrapper>
