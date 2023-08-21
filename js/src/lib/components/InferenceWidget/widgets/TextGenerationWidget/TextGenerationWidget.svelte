<script lang="ts">
	import type { WidgetProps } from "../../shared/types";
	import type { PipelineType } from "../../../../interfaces/Types";

	import { onMount } from "svelte";
	import WidgetSubmitBtn from "../../shared/WidgetSubmitBtn/WidgetSubmitBtn.svelte";
	import WidgetShortcutRunLabel from "../../shared/WidgetShortcutRunLabel/WidgetShortcutRunLabel.svelte";
	import WidgetBloomDecoding from "../../shared/WidgetBloomDecoding/WidgetBloomDecoding.svelte";
	import WidgetTextarea from "../../shared/WidgetTextarea/WidgetTextarea.svelte";
	import WidgetTimer from "../../shared/WidgetTimer/WidgetTimer.svelte";
	import WidgetOutputText from "../../shared/WidgetOutputText/WidgetOutputText.svelte";
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
	export let appendRepoPath: WidgetProps["appendRepoPath"];
	export let callApiOnMount: WidgetProps["callApiOnMount"];
	export let model: WidgetProps["model"];
	export let noModelLoading: WidgetProps["noModelLoading"];
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
			getOutput({ useCache: true });
		} else {
			const [demoText] = getDemoInputs(model, ["text"]);
			setTextAreaValue(demoText ?? "");
			if (text && callApiOnMount) {
				getOutput({ isOnLoadCall: true, useCache: true });
			}
		}
	});

	async function getOutput({
		withModelLoading = false,
		isOnLoadCall = false,
		useCache = true,
	} = {}) {
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

		if (shouldUpdateUrl && !isOnLoadCall) {
			updateUrl({ text: trimmedValue });
		}

		const requestBody = { inputs: trimmedValue };
		addInferenceParameters(requestBody, model);

		if (model.id === "bigscience/bloom") {
			// see https://huggingface.co/docs/api-inference/detailed_parameters#text-generation-task
			const parameters = {
				seed: Date.now() % 100,
				early_stopping: false,
				length_penalty: 0.0,
				max_new_tokens: 20,
			};
			if (decodingStrategy === "sampling") {
				parameters["do_sample"] = true;
				parameters["top_p"] = 0.9;
			} else {
				parameters["do_sample"] = false;
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
			isOnLoadCall,
			useCache,
			appendRepoPath,
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
			} else if (model?.pipeline_tag === "text-generation") {
				const outputWithoutInput = noModelLoading ? output : output.slice(text.length);
				inferenceTimer.stop();
				if (outputWithoutInput.length === 0) {
					warning = "No text was generated";
				} else {
					await renderTypingEffect(outputWithoutInput);
				}
			}
		} else if (res.status === "loading-model") {
			modelLoading = {
				isLoading: true,
				estimatedTime: res.estimatedTime,
			};
			getOutput({ withModelLoading: true, useCache });
		} else if (res.status === "error") {
			error = res.error;
		}

		isLoading = false;
		inferenceTimer.stop();
	}

	function parseOutput(body: unknown): string {
		if (Array.isArray(body) && body.length) {
			const firstEntry = body[0] ?? {};
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
		getOutput({ useCache });
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
	{noModelLoading}
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
						getOutput({ useCache });
					}}
				/>
				<WidgetShortcutRunLabel {isLoading} />
				<div class="ml-auto self-start">
					<WidgetTimer bind:this={inferenceTimer} />
				</div>
			</div>
			{#if warning}
				<div class="alert alert-warning mt-2">{warning}</div>
			{/if}
			{#if isBloomLoginRequired}
				<div class="alert alert-warning mt-2">
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					Please
					<span class="underline cursor-pointer" on:click={redirectLogin}
						>login</span
					>
					or
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<span class="underline cursor-pointer" on:click={redirectJoin}
						>register</span
					> to try BLOOM 🌸
				</div>
			{/if}
		</form>
	</svelte:fragment>
	<svelte:fragment slot="bottom">
		{#if model?.pipeline_tag !== "text-generation"}
			<!-- for pipelines: text2text-generation & translation -->
			<WidgetOutputText classNames="mt-4" {output} />
		{/if}
	</svelte:fragment>
</WidgetWrapper>
