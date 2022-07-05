<script lang="ts">
	import type { WidgetProps } from "../../shared/types";
	import type { PipelineType } from "../../../../interfaces/Types";

	import { onMount } from "svelte";
	import WidgetSubmitBtn from "../../shared/WidgetSubmitBtn/WidgetSubmitBtn.svelte";
	import WidgetShortcutRunLabel from "../../shared/WidgetShortcutRunLabel/WidgetShortcutRunLabel.svelte";
	import WidgetTextarea from "../../shared/WidgetTextarea/WidgetTextarea.svelte";
	import WidgetTimer from "../../shared/WidgetTimer/WidgetTimer.svelte";
	import WidgetWrapper from "../../shared/WidgetWrapper/WidgetWrapper.svelte";
	import {
		addInferenceParameters,
		getDemoInputs,
		getResponse,
		getSearchParams,
		updateUrl,
	} from "../../shared/helpers";

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
	let warning: string = "";
	let renderTypingEffect: (outputTxt: string) => Promise<void>;
	let inferenceTimer: any;

	// Deactivate server caching for these two pipeline types
	// (translation uses this widget too and still needs caching)
	const useCache = !(
		["text-generation", "text2text-generation"] as Array<PipelineType>
	).includes(model.pipeline_tag);

	onMount(() => {
		const [textParam] = getSearchParams(["text"]);
		if (textParam) {
			text = textParam;
			getOutput();
		} else {
			const [demoText] = getDemoInputs(model, ["text"]);
			text = (demoText as string) ?? "";
			if (text && callApiOnMount) {
				getOutput();
			}
		}
	});

	async function getOutput(withModelLoading = false) {
		const trimmedValue = text.trim();

		if (!trimmedValue) {
			error = "You need to input some text";
			output = "";
			outputJson = "";
			return;
		}

		if (shouldUpdateUrl) {
			updateUrl({ text: trimmedValue });
		}

		const requestBody = { inputs: trimmedValue };
		addInferenceParameters(requestBody, model);

		isLoading = true;
		inferenceTimer.start();

		const res = await getResponse(
			apiUrl,
			model.id,
			requestBody,
			apiToken,
			parseOutput,
			withModelLoading,
			includeCredentials,
			useCache
		);

		// Reset values
		computeTime = "";
		error = "";
		warning = "";
		modelLoading = { isLoading: false, estimatedTime: 0 };
		output = "";
		outputJson = "";

		if (res.status === "success") {
			computeTime = res.computeTime;
			output = res.output;
			outputJson = res.outputJson;
			if (output.length === 0) {
				warning = "No text was generated";
			} else {
				const outputWithoutInput = output.slice(text.length);
				inferenceTimer.stop();
				await renderTypingEffect(outputWithoutInput);
			}
		} else if (res.status === "loading-model") {
			modelLoading = {
				isLoading: true,
				estimatedTime: res.estimatedTime,
			};
			getOutput(true);
		} else if (res.status === "error") {
			error = res.error;
		}

		isLoading = false;
		inferenceTimer.stop();
	}

	function parseOutput(body: unknown): string {
		if (Array.isArray(body) && body.length) {
			const firstEntry = body[0];
			return (
				firstEntry["generated_text"] ?? // text-generation + text2text-generation
				firstEntry["translation_text"] ?? // translation
				""
			);
		}
		throw new TypeError(
			"Invalid output: output must be of type Array & non-empty"
		);
	}

	function previewInputSample(sample: Record<string, any>) {
		text = sample.text;
	}

	function applyInputSample(sample: Record<string, any>) {
		text = sample.text;
		getOutput();
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
			<WidgetTextarea bind:value={text} {isLoading} bind:renderTypingEffect />
			<div class="flex items-center gap-x-2">
				<WidgetSubmitBtn
					{isLoading}
					onClick={() => {
						getOutput();
					}}
				/>
				<WidgetShortcutRunLabel {isLoading} {getOutput} />
				<WidgetTimer bind:this={inferenceTimer} />
			</div>
			{#if warning}
				<div class="alert alert-warning mt-2">{warning}</div>
			{/if}
		</form>
	</svelte:fragment>
</WidgetWrapper>
