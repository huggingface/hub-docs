<script lang="ts">
	import type { WidgetProps } from "../../shared/types";
	import type { PipelineType } from "../../../../interfaces/Types";

	import { onMount } from "svelte";
	import WidgetSubmitBtn from "../../shared/WidgetSubmitBtn/WidgetSubmitBtn.svelte";
	import WidgetShortcutRunLabel from "../../shared/WidgetShortcutRunLabel/WidgetShortcutRunLabel.svelte";
	import WidgetBloomDecoding from "../../shared/WidgetBloomDecoding/WidgetBloomDecoding.svelte";
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
	export let isLoggedIn: WidgetProps["includeCredentials"];

	const isBloomLoginRequired =
		isLoggedIn === false && model.id === "bigscience/bloom";

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
	let setTextAreaValue: (text: string) => void;
	let decodingStrategy: "sampling" | "greedy" = "sampling";

	// Deactivate server caching for these two pipeline types
	// (translation uses this widget too and still needs caching)
	const useCache = !(
		["text-generation", "text2text-generation"] as Array<PipelineType>
	).includes(model.pipeline_tag);

	onMount(() => {
		const [textParam] = getSearchParams(["text"]);
		if (textParam) {
			setTextAreaValue(textParam);
			getOutput();
		} else {
			const [demoText] = getDemoInputs(model, ["text"]);
			setTextAreaValue(demoText ?? "");
			if (text && callApiOnMount) {
				getOutput();
			}
		}
	});

	async function getOutput(withModelLoading = false) {
		if (isBloomLoginRequired) {
			return;
		}

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

		if (model.id === "bigscience/bloom") {
			// see https://huggingface.co/docs/api-inference/detailed_parameters#text-generation-task
			let parameters = {};
			if (decodingStrategy === "sampling") {
				parameters = {
					do_sample: true,
					top_p: 0.9,
					seed: Date.now() % 100,
					early_stopping: false,
					length_penalty: 0.0,
				};
			} else {
				parameters = {
					do_sample: false,
					seed: Date.now() % 100,
					early_stopping: false,
					length_penalty: 0.0,
					max_new_tokens: 32,
				};
			}
			requestBody["parameters"] = parameters;
		}

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
		setTextAreaValue(sample.text);
	}

	function applyInputSample(sample: Record<string, any>) {
		setTextAreaValue(sample.text);
		getOutput();
	}

	function redirectLogin() {
		window.location.href = `/login?next=${encodeURIComponent(
			window.location.href
		)}`;
	}

	function redirectJoin() {
		window.location.href = `/join?next=${encodeURIComponent(
			window.location.href
		)}`;
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
			<WidgetTextarea
				bind:value={text}
				bind:setValue={setTextAreaValue}
				{isLoading}
				size="big"
				bind:renderTypingEffect
			/>
			{#if model.id === "bigscience/bloom"}
				<WidgetBloomDecoding bind:decodingStrategy />
			{/if}
			<div
				class="flex items-center gap-x-2 {isBloomLoginRequired
					? 'opacity-50 pointer-events-none'
					: ''}"
			>
				<WidgetSubmitBtn
					{isLoading}
					onClick={() => {
						getOutput();
					}}
				/>
				<WidgetShortcutRunLabel {isLoading} {getOutput} />
				<div class="ml-auto self-start">
					<WidgetTimer bind:this={inferenceTimer} />
				</div>
			</div>
			{#if warning}
				<div class="alert alert-warning mt-2">{warning}</div>
			{/if}
			{#if isBloomLoginRequired}
				<div class="alert alert-warning mt-2">
					Please <span class="underline cursor-pointer" on:click={redirectLogin}
						>login</span
					>
					or
					<span class="underline cursor-pointer" on:click={redirectJoin}
						>register</span
					> to try BLOOM 🌸
				</div>
			{/if}
		</form>
	</svelte:fragment>
</WidgetWrapper>
