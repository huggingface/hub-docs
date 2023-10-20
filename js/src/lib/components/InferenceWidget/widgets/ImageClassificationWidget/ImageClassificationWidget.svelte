<script lang="ts">
	import type { WidgetProps } from "../../shared/types";
	import type { WidgetExample, WidgetExampleAssetInput, WidgetExampleOutputLabels } from "../../shared/WidgetExample";

	import { onMount } from "svelte";

	import WidgetFileInput from "../../shared/WidgetFileInput/WidgetFileInput.svelte";
	import WidgetDropzone from "../../shared/WidgetDropzone/WidgetDropzone.svelte";
	import WidgetOutputChart from "../../shared/WidgetOutputChart/WidgetOutputChart.svelte";
	import WidgetWrapper from "../../shared/WidgetWrapper/WidgetWrapper.svelte";
	import { callInferenceApi, getBlobFromUrl, getDemoInputs } from "../../shared/helpers";
	import { isValidOutputLabels } from "../../shared/outputValidation";
	import { isTextInput } from "../../shared/inputValidation";

	export let apiToken: WidgetProps["apiToken"];
	export let apiUrl: WidgetProps["apiUrl"];
	export let callApiOnMount: WidgetProps["callApiOnMount"];
	export let model: WidgetProps["model"];
	export let isInferenceEndpoints: WidgetProps["isInferenceEndpoints"];
	export let noTitle: WidgetProps["noTitle"];
	export let includeCredentials: WidgetProps["includeCredentials"];

	let computeTime = "";
	let error: string = "";
	let isLoading = false;
	let imgSrc = "";
	let modelLoading = {
		isLoading: false,
		estimatedTime: 0,
	};
	let output: Array<{ label: string; score: number }> = [];
	let outputJson: string;
	let warning: string = "";

	function onSelectFile(file: File | Blob) {
		imgSrc = URL.createObjectURL(file);
		getOutput(file);
	}

	async function getOutput(file: File | Blob, { withModelLoading = false, isOnLoadCall = false } = {}) {
		if (!file) {
			return;
		}

		// Reset values
		computeTime = "";
		error = "";
		warning = "";
		output = [];
		outputJson = "";

		const requestBody = { file };

		isLoading = true;

		const res = await callInferenceApi(
			apiUrl,
			model.id,
			requestBody,
			apiToken,
			parseOutput,
			withModelLoading,
			includeCredentials,
			isOnLoadCall,
			true,
			!isInferenceEndpoints,
		);

		isLoading = false;
		modelLoading = { isLoading: false, estimatedTime: 0 };

		if (res.status === "success") {
			computeTime = res.computeTime;
			output = res.output;
			outputJson = res.outputJson;
			if (output.length === 0) {
				warning = "No classes were detected";
			}
		} else if (res.status === "loading-model") {
			modelLoading = {
				isLoading: true,
				estimatedTime: res.estimatedTime,
			};
			getOutput(file, { withModelLoading: true });
		} else if (res.status === "error") {
			error = res.error;
		}
	}

	function parseOutput(body: unknown): Array<{ label: string; score: number }> {
		if (isValidOutputLabels(body)) {
			return body;
		}
		throw new TypeError("Invalid output: output must be of type Array<label: string, score:number>");
	}

	async function applyInputSample(sample: WidgetExampleAssetInput<WidgetExampleOutputLabels>) {
		imgSrc = sample.src;
		const blob = await getBlobFromUrl(imgSrc);
		getOutput(blob);
	}

	function previewInputSample(sample: WidgetExampleAssetInput<WidgetExampleOutputLabels>) {
		imgSrc = sample.src;
		if (isValidOutputLabels(sample.output)) {
			output = sample.output;
			outputJson = "";
		} else {
			output = [];
			outputJson = "";
		}
	}

	function validateExample(sample: WidgetExample): sample is WidgetExampleAssetInput<WidgetExampleOutputLabels> {
		return isTextInput(sample) && (!sample.output || isValidOutputLabels(sample.output));
	}

	onMount(() => {
		(async () => {
			const [src] = getDemoInputs(model, ["src"]);
			if (callApiOnMount && src) {
				imgSrc = src;
				const blob = await getBlobFromUrl(imgSrc);
				getOutput(blob, { isOnLoadCall: true });
			}
		})();
	});
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
	{isInferenceEndpoints}
	{noTitle}
	{outputJson}
	{previewInputSample}
	{validateExample}
>
	<svelte:fragment slot="top">
		<form>
			<WidgetDropzone classNames="no-hover:hidden" {isLoading} {imgSrc} {onSelectFile} onError={e => (error = e)}>
				{#if imgSrc}
					<img src={imgSrc} class="pointer-events-none mx-auto max-h-44 shadow" alt="" />
				{/if}
			</WidgetDropzone>
			<!-- Better UX for mobile/table through CSS breakpoints -->
			{#if imgSrc}
				{#if imgSrc}
					<div class="mb-2 flex justify-center bg-gray-50 dark:bg-gray-900 md:hidden">
						<img src={imgSrc} class="pointer-events-none max-h-44" alt="" />
					</div>
				{/if}
			{/if}
			<WidgetFileInput
				accept="image/*"
				classNames="mr-2 md:hidden"
				{isLoading}
				label="Browse for image"
				{onSelectFile}
			/>
			{#if warning}
				<div class="alert alert-warning mt-2">{warning}</div>
			{/if}
		</form>
	</svelte:fragment>
	<svelte:fragment slot="bottom">
		<WidgetOutputChart classNames="pt-4" {output} />
	</svelte:fragment>
</WidgetWrapper>
