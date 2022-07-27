<script lang="ts">
	import type { WidgetProps } from "../../shared/types";

	import WidgetFileInput from "../../shared/WidgetFileInput/WidgetFileInput.svelte";
	import WidgetDropzone from "../../shared/WidgetDropzone/WidgetDropzone.svelte";
	import WidgetQuickInput from "../../shared/WidgetQuickInput/WidgetQuickInput.svelte";
	import WidgetWrapper from "../../shared/WidgetWrapper/WidgetWrapper.svelte";
	import { addInferenceParameters, getResponse } from "../../shared/helpers";

	export let apiToken: WidgetProps["apiToken"];
	export let apiUrl: WidgetProps["apiUrl"];
	export let model: WidgetProps["model"];
	export let noTitle: WidgetProps["noTitle"];
	export let includeCredentials: WidgetProps["includeCredentials"];

	let computeTime = "";
	let error: string = "";
	let isLoading = false;
	let modelLoading = {
		isLoading: false,
		estimatedTime: 0,
	};
	let output: Array<{ label: string; score: number }> = [];
	let outputJson: string;
	let question = "";
	let imgSrc = "";
	let imageBase64 = "";

	function onSelectFile(file: File | Blob) {
		imgSrc = URL.createObjectURL(file);
		updateImageBase64(file);
	}

	function updateImageBase64(file: File | Blob) {
		let fileReader: FileReader = new FileReader();
		fileReader.onload = () => {
			const imageBase64WithPrefix: string = fileReader.result as string;
			imageBase64 = imageBase64WithPrefix.split(",")[1]; // remove prefix
			isLoading = false;
		};
		isLoading = true;
		fileReader.readAsDataURL(file);
	}

	function isValidOutput(arg: any): arg is { label: string; score: number }[] {
		return (
			Array.isArray(arg) &&
			arg.every(
				(x) => typeof x.label === "string" && typeof x.score === "number"
			)
		);
	}

	function parseOutput(body: unknown): Array<{ label: string; score: number }> {
		if (isValidOutput(body)) {
			return body;
		}
		throw new TypeError(
			"Invalid output: output must be of type Array<label: string, score:number>"
		);
	}

	function previewInputSample(sample: Record<string, any>) {
		question = sample.text;
		imgSrc = sample.img;
	}

	async function applyInputSample(sample: Record<string, any>) {
		question = sample.text;
		imgSrc = sample.src;
		const res = await fetch(imgSrc);
		const blob = await res.blob();
		updateImageBase64(blob);
		getOutput();
	}

	async function getOutput(withModelLoading = false) {
		const trimmedQuestion = question.trim();

		if (!trimmedQuestion) {
			error = "You need to input a question";
			output = null;
			outputJson = "";
			return;
		}

		if (!imageBase64) {
			error = "You need to upload an image";
			output = null;
			outputJson = "";
			return;
		}

		const requestBody = {
			inputs: { question: trimmedQuestion, image: imageBase64 },
		};
		addInferenceParameters(requestBody, model);

		isLoading = true;

		const res = await getResponse(
			apiUrl,
			model.id,
			requestBody,
			apiToken,
			parseOutput,
			withModelLoading,
			includeCredentials
		);

		isLoading = false;
		// Reset values
		computeTime = "";
		error = "";
		modelLoading = { isLoading: false, estimatedTime: 0 };
		output = null;
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
			getOutput(true);
		} else if (res.status === "error") {
			error = res.error;
		}
	}
</script>

<WidgetWrapper
	{apiUrl}
	{applyInputSample}
	{computeTime}
	{error}
	{isLoading}
	{model}
	{modelLoading}
	{noTitle}
	{outputJson}
	{previewInputSample}
>
	<svelte:fragment slot="top">
		<form class="space-y-2">
			<WidgetDropzone
				classNames="no-hover:hidden"
				{isLoading}
				{imgSrc}
				{onSelectFile}
				onError={(e) => (error = e)}
			>
				{#if imgSrc}
					<img
						src={imgSrc}
						class="pointer-events-none shadow mx-auto max-h-44"
						alt=""
					/>
				{/if}
			</WidgetDropzone>
			<!-- Better UX for mobile/table through CSS breakpoints -->
			{#if imgSrc}
				{#if imgSrc}
					<div
						class="mb-2 flex justify-center bg-gray-50 dark:bg-gray-900 with-hover:hidden"
					>
						<img src={imgSrc} class="pointer-events-none max-h-44" alt="" />
					</div>
				{/if}
			{/if}
			<WidgetFileInput
				accept="image/*"
				classNames="mr-2 with-hover:hidden"
				{isLoading}
				label="Browse for image"
				{onSelectFile}
			/>
			<WidgetQuickInput
				bind:value={question}
				{isLoading}
				onClickSubmitBtn={() => {
					getOutput();
				}}
			/>
		</form>
	</svelte:fragment>
	<svelte:fragment slot="bottom">
		{#if output}
			<div class="mt-4 alert alert-success flex items-baseline">
				<span>{output.answer}</span>
				<span class="font-mono text-xs ml-auto">{output.score.toFixed(3)}</span>
			</div>
		{/if}
	</svelte:fragment>
</WidgetWrapper>
