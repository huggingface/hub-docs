<script lang="ts">
	import type { WidgetProps } from "../../shared/types";
	import type { WidgetExampleTextInput } from "../../shared/WidgetExample";

	import { onMount } from "svelte";

	import WidgetAudioTrack from "../../shared/WidgetAudioTrack/WidgetAudioTrack.svelte";
	import WidgetTextarea from "../../shared/WidgetTextarea/WidgetTextarea.svelte";
	import WidgetSubmitBtn from "../../shared/WidgetSubmitBtn/WidgetSubmitBtn.svelte";
	import WidgetWrapper from "../../shared/WidgetWrapper/WidgetWrapper.svelte";
	import {
		addInferenceParameters,
		getDemoInputs,
		callInferenceApi,
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
	let outputJson = "";
	let text = "";
	let setTextAreaValue: (text: string) => void;

	onMount(() => {
		const [textParam] = getSearchParams(["text"]);
		if (textParam) {
			setTextAreaValue(textParam);
			getOutput();
		} else {
			const [demoText] = getDemoInputs(model, ["text"]);
			setTextAreaValue(demoText ?? "");
			if (text && callApiOnMount) {
				getOutput({ isOnLoadCall: true });
			}
		}
	});

	async function getOutput({ withModelLoading = false, isOnLoadCall = false } = {}) {
		const trimmedText = text.trim();

		if (!trimmedText) {
			error = "You need to input some text";
			output = "";
			return;
		}

		if (shouldUpdateUrl && !isOnLoadCall) {
			updateUrl({ text: trimmedText });
		}

		const requestBody = { inputs: trimmedText };
		addInferenceParameters(requestBody, model);

		isLoading = true;

		const res = await callInferenceApi(
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
		if (body && typeof body === "object" && body instanceof Blob) {
			return URL.createObjectURL(body);
		}
		throw new TypeError("Invalid output: output must be of type object & instance of Blob");
	}

	function applyInputSample(sample: WidgetExampleTextInput, { isPreview = false } = {}) {
		setTextAreaValue(sample.text);
		if (isPreview) {
			return;
		}
		getOutput();
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
		<form>
			<WidgetTextarea bind:value={text} bind:setValue={setTextAreaValue} />
			<WidgetSubmitBtn
				classNames="mt-2"
				{isLoading}
				onClick={() => {
					getOutput();
				}}
			/>
		</form>
	</svelte:fragment>
	<svelte:fragment slot="bottom">
		{#if output.length}
			<WidgetAudioTrack classNames="mt-4" src={output} />
		{/if}
	</svelte:fragment>
</WidgetWrapper>
