<script lang="ts">
	import type { WidgetProps } from "../../shared/types";

	import WidgetWrapperV2 from "../../shared/WidgetWrapperV2/WidgetWrapperV2.svelte";
	import WidgetInputAudio from "../../widgetsInput/WidgetInputAudio/WidgetInputAudio.svelte";
	import WidgetOutputClassification from "../../wigdetsOutput/WidgetOutputClassification/WidgetOutputClassification.svelte";

	export let apiToken: WidgetProps["apiToken"];
	export let apiUrl: WidgetProps["apiUrl"];
	export let callApiOnMount: WidgetProps["callApiOnMount"];
	export let model: WidgetProps["model"];
	export let noTitle: WidgetProps["noTitle"];
	export let includeCredentials: WidgetProps["includeCredentials"];
</script>

<!-- Name WidgetWrapperV2 should be renamed just to Widget -->
<WidgetWrapperV2
	{apiToken}
	{callApiOnMount}
	{apiUrl}
	{includeCredentials}
	{model}
	{noTitle}
	WidgetInputComponent={WidgetInputAudio}
	WidgetOutputComponent={WidgetOutputClassification}
/>
