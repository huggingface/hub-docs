<script lang="ts">
	import type { WidgetProps } from "../../shared/types";

	import WidgetFileInput from "../../shared/WidgetFileInput/WidgetFileInput.svelte";
	import WidgetDropzone from "../../shared/WidgetDropzone/WidgetDropzone.svelte";
	import WidgetQuickInput from "../../shared/WidgetQuickInput/WidgetQuickInput.svelte";
	import WidgetWrapper from "../../shared/WidgetWrapper/WidgetWrapper.svelte";
	import WidgetOutputChart from "../../shared/WidgetOutputChart/WidgetOutputChart.svelte";
	import {
		addInferenceParameters,
		getDemoInputs,
		getResponse,
	} from "../../shared/helpers";
	import { onMount } from "svelte";

	export let apiToken: WidgetProps["apiToken"];
	export let apiUrl: WidgetProps["apiUrl"];
	export let callApiOnMount: WidgetProps["callApiOnMount"];
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
	let output: Array<{ answer: string; score: number }> = [];
	let outputJson: string;
	let question = "";
	let imgSrc = "";
	let imageBase64 = "";

	async function onSelectFile(file: File | Blob) {
		imgSrc = URL.createObjectURL(file);
		await updateImageBase64(file);
	}

	function updateImageBase64(file: File | Blob): Promise<void> {
		return new Promise((resolve, reject) => {
			let fileReader: FileReader = new FileReader();
			fileReader.onload = async () => {
				try {
					const imageBase64WithPrefix: string = fileReader.result as string;
					imageBase64 = imageBase64WithPrefix.split(",")[1]; // remove prefix
					isLoading = false;
					resolve();
				} catch (err) {
					reject(err);
				}
			};
			fileReader.onerror = (e) => reject(e);
			isLoading = true;
			fileReader.readAsDataURL(file);
		});
	}

	function isValidOutput(arg: any): arg is { answer: string; score: number }[] {
		return (
			Array.isArray(arg) &&
			arg.every(
				(x) => typeof x.answer === "string" && typeof x.score === "number"
			)
		);
	}

	function parseOutput(
		body: unknown
	): Array<{ answer: string; score: number }> {
		if (isValidOutput(body)) {
			return body;
		}
		throw new TypeError(
			"Invalid output: output must be of type Array<answer: string, score:number>"
		);
	}

	function previewInputSample(sample: Record<string, any>) {
		question = sample.text;
		imgSrc = sample.src;
	}

	async function applyInputSample(sample: Record<string, any>) {
		question = sample.text;
		imgSrc = sample.src;
		const res = await fetch(imgSrc);
		const blob = await res.blob();
		await updateImageBase64(blob);
		getOutput();
	}

	async function getOutput(withModelLoading = false, isOnLoadCall = false) {
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
			includeCredentials,
			isOnLoadCall
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

	onMount(() => {
		(async () => {
			const [text, src] = getDemoInputs(model, ["text", "src"]);
			if (callApiOnMount && text && src) {
				question = text;
				imgSrc = src;
				const res = await fetch(imgSrc);
				const blob = await res.blob();
				await updateImageBase64(blob);
				getOutput(false, true);
			}
		})();
	});
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
			<WidgetOutputChart labelField="answer" classNames="pt-4" {output} />
		{/if}
	</svelte:fragment>
</WidgetWrapper>
