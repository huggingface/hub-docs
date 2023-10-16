<script lang="ts">
	import type { WidgetProps, ExampleRunOpts, InferenceRunFlags } from "../../shared/types";
	import type {
		WidgetExample,
		WidgetExampleOutputAnswerScore,
		WidgetExampleTextAndContextInput,
	} from "../../shared/WidgetExample";

	import { onMount } from "svelte";

	import WidgetQuickInput from "../../shared/WidgetQuickInput/WidgetQuickInput.svelte";
	import WidgetTextarea from "../../shared/WidgetTextarea/WidgetTextarea.svelte";
	import WidgetWrapper from "../../shared/WidgetWrapper/WidgetWrapper.svelte";
	import {
		addInferenceParameters,
		getWidgetExample,
		getResponse,
		getSearchParams,
		updateUrl,
	} from "../../shared/helpers";
	import { isValidOutputAnswerScore } from "../../shared/outputValidation";
	import { isTextAndContextInput } from "../../shared/inputValidation";

	export let apiToken: WidgetProps["apiToken"];
	export let apiUrl: WidgetProps["apiUrl"];
	export let callApiOnMount: WidgetProps["callApiOnMount"];
	export let model: WidgetProps["model"];
	export let noTitle: WidgetProps["noTitle"];
	export let shouldUpdateUrl: WidgetProps["shouldUpdateUrl"];
	export let includeCredentials: WidgetProps["includeCredentials"];

	let context = "";
	let computeTime = "";
	let error: string = "";
	let isLoading = false;
	let modelLoading = {
		isLoading: false,
		estimatedTime: 0,
	};
	let output: { answer: string; score: number } | null = null;
	let outputJson: string;
	let question = "";
	let setTextAreaValue: (text: string) => void;

	onMount(() => {
		const [contextParam, questionParam] = getSearchParams(["context", "question"]);
		if (contextParam && questionParam) {
			question = questionParam;
			setTextAreaValue(contextParam);
			getOutput();
		} else {
			const example = getWidgetExample<WidgetExampleTextAndContextInput<WidgetExampleOutputAnswerScore>>(
				model,
				validateExample
			);
			if (example && callApiOnMount) {
				applyInputSample(example, { inferenceOpts: { isOnLoadCall: true } });
			}
		}
	});

	async function getOutput({ withModelLoading = false, isOnLoadCall = false }: InferenceRunFlags = {}) {
		const trimmedQuestion = question.trim();
		const trimmedContext = context.trim();

		if (!trimmedQuestion) {
			error = "You need to input a question";
			output = null;
			outputJson = "";
			return;
		}

		if (!trimmedContext) {
			error = "You need to input some context";
			output = null;
			outputJson = "";
			return;
		}

		if (shouldUpdateUrl && !isOnLoadCall) {
			updateUrl({ context: trimmedContext, question: trimmedQuestion });
		}

		const requestBody = {
			inputs: { question: trimmedQuestion, context: trimmedContext },
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
			getOutput({ withModelLoading: true });
		} else if (res.status === "error") {
			error = res.error;
		}
	}

	function parseOutput(body: any): { answer: string; score: number } {
		if (isValidOutputAnswerScore(body)) {
			return body;
		}
		throw new TypeError("Invalid output: output must be of type <answer:string; score:number>");
	}

	function applyInputSample(
		sample: WidgetExampleTextAndContextInput<WidgetExampleOutputAnswerScore>,
		{ isPreview = false, inferenceOpts = {} }: ExampleRunOpts = {}
	) {
		question = sample.text;
		setTextAreaValue(sample.context);
		if (isPreview) {
			return;
		}
		getOutput(inferenceOpts);
	}

	function validateExample(
		sample: WidgetExample
	): sample is WidgetExampleTextAndContextInput<WidgetExampleOutputAnswerScore> {
		return isTextAndContextInput(sample) && (!sample.output || isValidOutputAnswerScore(sample.output));
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
	{validateExample}
>
	<svelte:fragment slot="top">
		<form class="space-y-2">
			<WidgetQuickInput
				bind:value={question}
				{isLoading}
				onClickSubmitBtn={() => {
					getOutput();
				}}
			/>
			<WidgetTextarea
				bind:value={context}
				bind:setValue={setTextAreaValue}
				placeholder="Please input some context..."
				label="Context"
			/>
		</form>
	</svelte:fragment>
	<svelte:fragment slot="bottom">
		{#if output}
			<div class="alert alert-success mt-4 flex items-baseline">
				<span>{output.answer}</span>
				<span class="ml-auto font-mono text-xs">{output.score.toFixed(3)}</span>
			</div>
		{/if}
	</svelte:fragment>
</WidgetWrapper>
