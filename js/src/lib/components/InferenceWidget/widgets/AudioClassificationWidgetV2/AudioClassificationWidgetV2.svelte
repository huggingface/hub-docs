<script lang="ts">
	import type { WidgetProps } from "../../shared/types";
	import type { WidgetOutput } from "../../wigdetsOutput/Types";
	import type { WidgetInput } from "../../widgetsInput/Types";

	import WidgetWrapper from "../../shared/WidgetWrapper/WidgetWrapperV2.svelte";
	import WidgetInputAudio from "../../widgetsInput/WidgetInputAudio/WidgetInputAudio.svelte";
	import WidgetOutputClassification from "../../wigdetsOutput/WidgetOutputClassification/WidgetOutputClassification.svelte";

	export let apiToken: WidgetProps["apiToken"];
	export let apiUrl: WidgetProps["apiUrl"];
	export let callApiOnMount: WidgetProps["callApiOnMount"];
	export let model: WidgetProps["model"];
	export let noTitle: WidgetProps["noTitle"];
	export let includeCredentials: WidgetProps["includeCredentials"];

	export let widgetInput: WidgetInput;
	export let widgetOutput: WidgetOutput;
	export let isLoading = false;
	export let getOutput: ({withModelLoading = false,isOnLoadCall = false,}) => Promise<void>;
</script>

<WidgetWrapper
	{apiToken}
	{callApiOnMount}
	{apiUrl}
	{includeCredentials}
	{isLoading}
	{model}
	{noTitle}
	{widgetInput}
	{widgetOutput}
	bind:getOutput
>
	<svelte:fragment slot="input" let:isDisabled>
		<WidgetInputAudio bind:widgetInput {isLoading} {isDisabled} on:click={() => getOutput()} />
	</svelte:fragment>
	<svelte:fragment slot="output">
		<WidgetOutputClassification bind:widgetOutput />
	</svelte:fragment>
</WidgetWrapper>
