<script lang="ts">
	import type { WidgetProps, ExampleRunOpts, InferenceRunFlags } from "../../shared/types";
	import type { WidgetExampleAssetAndPromptInput } from "../../shared/WidgetExample";

	import { onMount } from "svelte";

	import WidgetFileInput from "../../shared/WidgetFileInput/WidgetFileInput.svelte";
	import WidgetDropzone from "../../shared/WidgetDropzone/WidgetDropzone.svelte";
	import WidgetTextInput from "../../shared/WidgetTextInput/WidgetTextInput.svelte";
	import WidgetSubmitBtn from "../../shared/WidgetSubmitBtn/WidgetSubmitBtn.svelte";
	import WidgetWrapper from "../../shared/WidgetWrapper/WidgetWrapper.svelte";
	import { addInferenceParameters, getWidgetExample, getResponse } from "../../shared/helpers";
	import { isAssetAndPromptInput } from "../../shared/inputValidation";

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
	let output = "";
	let outputJson = "";
	let prompt = "";
	let imgSrc = "";
	let imageBase64 = "";

	async function onSelectFile(file: File | Blob) {
		imgSrc = URL.createObjectURL(file);
		await updateImageBase64(file);
	}

	function updateImageBase64(file: File | Blob): Promise<void> {
		return new Promise((resolve, reject) => {
			const fileReader: FileReader = new FileReader();
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
			fileReader.onerror = e => reject(e);
			isLoading = true;
			fileReader.readAsDataURL(file);
		});
	}

	function parseOutput(body: unknown): string {
		if (body && typeof body === "object" && body instanceof Blob) {
			return URL.createObjectURL(body);
		}
		throw new TypeError("Invalid output: output must be of type object & of instance Blob");
	}

	async function applyInputSample(
		sample: WidgetExampleAssetAndPromptInput,
		{ isPreview = false, inferenceOpts = {} }: ExampleRunOpts = {}
	) {
		prompt = sample.prompt;
		imgSrc = sample.src;
		if (isPreview) {
			return;
		}
		const res = await fetch(imgSrc);
		const blob = await res.blob();
		await updateImageBase64(blob);
		getOutput(inferenceOpts);
	}

	async function getOutput({ withModelLoading = false, isOnLoadCall = false }: InferenceRunFlags = {}) {
		const trimmedPrompt = prompt.trim();

		if (!imageBase64) {
			error = "You need to upload an image";
			output = "";
			outputJson = "";
			return;
		}

		const requestBody = {
			inputs: imageBase64,
			parameters: {
				prompt: trimmedPrompt,
			},
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

	onMount(() => {
		(async () => {
			const example = getWidgetExample<WidgetExampleAssetAndPromptInput>(model, isAssetAndPromptInput);
			if (callApiOnMount && example) {
				applyInputSample(example, { inferenceOpts: { isOnLoadCall: true } });
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
	{noTitle}
	{outputJson}
	validateExample={isAssetAndPromptInput}
>
	<svelte:fragment slot="top">
		<form class="space-y-2">
			<WidgetDropzone classNames="hidden md:block" {isLoading} {imgSrc} {onSelectFile} onError={e => (error = e)}>
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
			<WidgetTextInput
				bind:value={prompt}
				label="(Optional) Text-guidance if the model has support for it"
				placeholder="Your prompt here..."
			/>
			<WidgetSubmitBtn
				{isLoading}
				onClick={() => {
					getOutput();
				}}
			/>
		</form>
	</svelte:fragment>
	<svelte:fragment slot="bottom">
		{#if output.length}
			<div class="mt-4 flex justify-center bg-gray-50 dark:bg-gray-925">
				<img class="max-w-sm object-contain" src={output} alt="" />
			</div>
		{/if}
	</svelte:fragment>
</WidgetWrapper>
