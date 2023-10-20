<script lang="ts">
	import type { WidgetProps, TableData, HighlightCoordinates } from "../../shared/types";
	import type { WidgetExampleTextAndTableInput } from "../../shared/WidgetExample";

	import { onMount } from "svelte";

	import WidgetQuickInput from "../../shared/WidgetQuickInput/WidgetQuickInput.svelte";
	import WidgetOutputTableQA from "../../shared/WidgetOutputTableQA/WidgetOutputTableQA.svelte";
	import WidgetTableInput from "../../shared/WidgetTableInput/WidgetTableInput.svelte";
	import WidgetWrapper from "../../shared/WidgetWrapper/WidgetWrapper.svelte";
	import { parseJSON } from "../../../../utils/ViewUtils";
	import {
		addInferenceParameters,
		convertDataToTable,
		convertTableToData,
		getDemoInputs,
		callInferenceApi,
		getSearchParams,
		updateUrl,
	} from "../../shared/helpers";
	import { isTextAndTableInput } from "../../shared/inputValidation";
	interface Output {
		aggregator?: string;
		answer: string;
		coordinates: [number, number][];
		cells: number[];
	}

	export let apiToken: WidgetProps["apiToken"];
	export let apiUrl: WidgetProps["apiUrl"];
	export let callApiOnMount: WidgetProps["callApiOnMount"];
	export let model: WidgetProps["model"];
	export let isInferenceEndpoints: WidgetProps["isInferenceEndpoints"];
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
	let output: Output | null = null;
	let outputJson: string;
	let table: (string | number)[][] = [[]];
	let query = "";
	let isAnswerOnlyOutput = false;

	let highlighted: HighlightCoordinates = {};
	$: highlighted =
		output?.coordinates?.reduce((acc, [yCor, xCor]) => {
			acc[`${yCor}`] = "bg-green-50 dark:bg-green-900";
			acc[`${yCor}-${xCor}`] = "bg-green-100 border-green-100 dark:bg-green-700 dark:border-green-700";
			return acc;
		}, {}) ?? {};

	onMount(() => {
		const [queryParam, tableParam] = getSearchParams(["query", "table"]);
		if (queryParam && tableParam) {
			query = queryParam;
			table = convertDataToTable((parseJSON(tableParam) as TableData) ?? {});
			getOutput();
		} else {
			const [demoQuery, demoTable] = getDemoInputs(model, ["text", "table"]);
			query = (demoQuery as string) ?? "";
			table = convertDataToTable(demoTable as TableData);
			if (query && table && callApiOnMount) {
				getOutput({ isOnLoadCall: true });
			}
		}
	});

	function onChangeTable(updatedTable: (string | number)[][]) {
		table = updatedTable;
	}

	async function getOutput({ withModelLoading = false, isOnLoadCall = false } = {}) {
		const trimmedQuery = query.trim();

		if (!trimmedQuery) {
			error = "You need to input a query";
			output = null;
			outputJson = "";
			return;
		}

		if (shouldUpdateUrl && !isOnLoadCall) {
			updateUrl({
				query: trimmedQuery,
				table: JSON.stringify(convertTableToData(table)),
			});
		}

		const requestBody = {
			inputs: {
				query: trimmedQuery,
				table: convertTableToData(table),
			},
		};
		addInferenceParameters(requestBody, model);

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

	function isValidOutput(arg: any): arg is Output {
		return (
			arg &&
			typeof arg === "object" &&
			typeof arg["answer"] === "string" &&
			(arg["aggregator"] === undefined ? true : typeof arg["aggregator"] === "string") &&
			(Array.isArray(arg["coordinates"]) || isAnswerOnlyOutput) &&
			(Array.isArray(arg["cells"]) || isAnswerOnlyOutput)
		);
	}

	function parseOutput(body: any): Output {
		if (body["coordinates"] === undefined && body["cells"] === undefined) {
			isAnswerOnlyOutput = true;
		}
		if (isValidOutput(body)) {
			return body;
		}
		throw new TypeError(
			"Invalid output: output must be of type <answer:string; coordinates?:Array; cells?:Array; aggregator?:string>"
		);
	}

	function previewInputSample(sample: WidgetExampleTextAndTableInput) {
		query = sample.text;
		table = convertDataToTable(sample.table);
	}

	function applyInputSample(sample: WidgetExampleTextAndTableInput) {
		query = sample.text;
		table = convertDataToTable(sample.table);
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
	validateExample={isTextAndTableInput}
>
	<svelte:fragment slot="top">
		<form>
			<WidgetQuickInput
				bind:value={query}
				{isLoading}
				onClickSubmitBtn={() => {
					getOutput();
				}}
			/>
		</form>
		<div class="mt-4">
			{#if output}
				<WidgetOutputTableQA {output} {isAnswerOnlyOutput} />
			{/if}
			{#if table.length > 1 || table[0].length > 1}
				<WidgetTableInput {highlighted} onChange={onChangeTable} {table} />
			{/if}
		</div>
	</svelte:fragment>
</WidgetWrapper>
