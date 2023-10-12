<script lang="ts">
	import type { WidgetProps } from "../../shared/types";

	import { onMount } from "svelte";

	import WidgetQuickInput from "../../shared/WidgetQuickInput/WidgetQuickInput.svelte";
	import WidgetTextarea from "../../shared/WidgetTextarea/WidgetTextarea.svelte";
	import WidgetWrapper from "../../shared/WidgetWrapper/WidgetWrapper.svelte";
	import { addInferenceParameters, getDemoInputs, getResponse, getSearchParams, updateUrl } from "../../shared/helpers";

	export let apiToken: WidgetProps["apiToken"];
	export let apiUrl: WidgetProps["apiUrl"];
	export let callApiOnMount: WidgetProps["callApiOnMount"];
	export let model: WidgetProps["model"];
	export let isInferenceEndpoints: WidgetProps["isInferenceEndpoints"];
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
			const [demoContext, demoQuestion] = getDemoInputs(model, ["context", "text"]);
			question = (demoQuestion as string) ?? "";
			setTextAreaValue(demoContext ?? "");
			if (context && question && callApiOnMount) {
				getOutput({ isOnLoadCall: true });
			}
		}
	});

	async function getOutput({ withModelLoading = false, isOnLoadCall = false } = {}) {
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
			isOnLoadCall,
			true,
			!isInferenceEndpoints,
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
		if (body && typeof body === "object" && "answer" in body && "score" in body) {
			return { answer: body["answer"], score: body["score"] };
		}
		throw new TypeError("Invalid output: output must be of type <answer:string; score:number>");
	}

	function previewInputSample(sample: Record<string, any>) {
		question = sample.text;
		setTextAreaValue(sample.context);
	}

	function applyInputSample(sample: Record<string, any>) {
		question = sample.text;
		setTextAreaValue(sample.context);
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
	{isInferenceEndpoints}
	{noTitle}
	{outputJson}
	{previewInputSample}
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
