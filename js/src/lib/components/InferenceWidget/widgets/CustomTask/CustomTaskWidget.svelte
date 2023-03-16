<!-- Endpoints modification -->
<script lang="ts">
	import type { WidgetProps } from "../../shared/types";

	import { getContext, setContext } from "svelte";

	import WidgetWrapper from "../../shared/WidgetWrapper/WidgetWrapper.svelte";
	import WidgetRadio from "../../shared/WidgetRadio/WidgetRadio.svelte";
	import WidgetTextarea from "../../shared/WidgetTextarea/WidgetTextarea.svelte";
	import WidgetDropzone from "../../shared/WidgetDropzone/WidgetDropzone.svelte";
	import WidgetAudioTrack from "../../shared/WidgetAudioTrack/WidgetAudioTrack.svelte";
	import WidgetOutputJson from "../../shared/WidgetOutputJson/WidgetOutputJson.svelte";
	import WidgetSubmitBtn from "../../shared/WidgetSubmitBtn/WidgetSubmitBtn.svelte";
	import IconCross from "../../../Icons/IconCross.svelte";
	import { addInferenceParameters, getResponse } from "../../shared/helpers";

	export let apiToken: WidgetProps["apiToken"];
	export let apiUrl: WidgetProps["apiUrl"];
	export let model: WidgetProps["model"];
	export let noTitle: WidgetProps["noTitle"];
	export let includeCredentials: WidgetProps["includeCredentials"];

	const widgetInput: WidgetInputStore = getContext("widgetInput");

	let customPayload = `{\n  "inputs": ""\n}`;
	let inputFile: File | Blob | undefined;
	let inputType = "json";
	let fileSrc: string | undefined;
	let outputJson: string;
	let computeTime = "";
	let error = "";
	let isLoading = false;
	let modelLoading = {
		isLoading: false,
		estimatedTime: 0,
	};

	setContext("getOutput", getOutput);

	function isInferenceJson(input: string): boolean {
		return input.replace(/\s/gm, "").startsWith('{"inputs":');
	}

	async function applyInputSample(sample: Record<string, any>) {
		if (isInferenceJson(sample.text)) {
			customPayload = JSON.stringify(sample, null, 2);
		} else {
			customPayload = JSON.stringify({ inputs: sample.text }, null, 2);
		}
	}

	function handleFormInput(): void {
		$widgetInput.body = customPayload;
	}

	function onSelectFile(file: File | Blob) {
		inputFile = file;
		getOutput(file);
	}

	function clearFile(): void {
		inputFile = undefined;
		fileSrc = undefined;
		isLoading = false;
		computeTime = "";
		error = "";
		modelLoading = {
			isLoading: false,
			estimatedTime: 0,
		};
	}

	async function getOutput(
		file: File | Blob | undefined,
		withModelLoading = false,
		onlySetInput = false
	) {
		if (
			!onlySetInput &&
			(customPayload === "" || customPayload === undefined)
		) {
			error = "Input payload must not be empty";
			outputJson = "";
			return;
		}

		computeTime = "";
		error = "";
		let requestBody;
		try {
			requestBody = file ? { file } : JSON.parse(customPayload);

			if (onlySetInput) {
				$widgetInput = {
					body: requestBody,
					type: "json",
				};

				return;
			}
		} catch (e) {
			error = "Invalid JSON";
			outputJson = "";
			return;
		}
		if (!requestBody) {
			error = "Input payload is not valid JSON";
			outputJson = "";
			return;
		}

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
		modelLoading = { isLoading: false, estimatedTime: 0 };

		if (res.status === "success") {
			computeTime = res.computeTime;

			if (inputType === "file" && !inputFile) {
				return;
			}

			outputJson = res.outputJson;
		} else if (res.status === "loading-model") {
			modelLoading = {
				isLoading: true,
				estimatedTime: res.estimatedTime,
			};
			getOutput(file, true);
		} else if (res.status === "error") {
			error = res.error;
		}
	}

	function parseOutput(body: unknown): unknown {
		return body;
	}

	$: $widgetInput.type = inputType;
	$: fileSrc = inputFile && URL.createObjectURL(inputFile);
</script>

<WidgetWrapper
	{apiUrl}
	{computeTime}
	{error}
	{isLoading}
	{model}
	{modelLoading}
	{noTitle}
	{outputJson}
	{applyInputSample}
	jsonButton={false}
>
	<svelte:fragment slot="top">
		<div class="flex gap-8 rounded-lg border border-gray-10 p-2">
			<WidgetRadio
				bind:group={inputType}
				label="JSON payload input"
				value="json"
				classNames="cursor-pointer"
			/>
			<WidgetRadio
				bind:group={inputType}
				label="File input"
				value="file"
				classNames="cursor-pointer"
			/>
		</div>
		<form class="flex flex-col space-y-2" on:input={handleFormInput}>
			{#if inputType === "json"}
				<WidgetTextarea
					pre={true}
					bind:value={customPayload}
					placeholder="JSON formatted payload"
					classNames="max-w-full text-sm mt-2 py-[11px] break-all whitespace-pre-wrap"
				/>
			{/if}
			{#if inputType === "file"}
				<WidgetDropzone
					accept="*"
					label="Drag file here or click to browse from your device"
					imgSrc={fileSrc}
					classNames="no-hover:hidden"
					{isLoading}
					{onSelectFile}
					onError={(e) => (error = e)}
				>
					{#if inputFile}
						<button
							on:click|stopPropagation={clearFile}
							class="btn block p-1 mb-2 ml-auto"
							type="button"
						>
							<IconCross />
						</button>
					{/if}
					{#if fileSrc && inputFile?.type.includes("image")}
						<img
							src={fileSrc}
							class="pointer-events-none shadow mx-auto max-h-44"
							alt=""
						/>
					{/if}
					{#if fileSrc && inputFile?.type.includes("audio")}
						<WidgetAudioTrack src={fileSrc} classNames="w-full" />
					{/if}
				</WidgetDropzone>
			{/if}
			<WidgetSubmitBtn {isLoading} onClick={() => getOutput(undefined)} />
		</form>
	</svelte:fragment>
	<svelte:fragment slot="bottom">
		{#if outputJson}
			<WidgetOutputJson
				classNames="mt-2 text-xs break-all whitespace-pre-wrap"
				output={outputJson}
			/>
		{/if}
	</svelte:fragment>
</WidgetWrapper>
