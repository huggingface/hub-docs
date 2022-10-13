<script lang="ts">
	import type { WidgetProps, LoadingStatus } from "../types";

	import IconAzureML from "../../../Icons/IconAzureML.svelte";

	export let model: WidgetProps["model"];
	export let computeTime: string;
	export let error: string;
	export let modelStatus: LoadingStatus = "unknown";

	const status = {
		error: "⚠️ This model could not be loaded by the inference API. ⚠️",
		loaded: "This model is currently loaded and running on the Inference API.",
		unknown: "This model can be loaded on the Inference API on-demand.",
	} as const;

	const azureStatus = {
		error: "⚠️ This model could not be loaded.",
		loaded: "This model is loaded and running on AzureML Managed Endpoint",
		unknown: "This model can be loaded loaded on AzureML Managed Endpoint",
	} as const;
</script>

<div class="mt-2">
	<div class="text-gray-400 text-xs">
		{#if computeTime}
			Computation time on cpu: {computeTime}
		{:else if model.id === "bigscience/bloom"}
			<div class="flex items-baseline">
				<div class="flex items-center whitespace-nowrap text-gray-700">
					<IconAzureML classNames="mr-1 flex-none" /> Powered by&nbsp;
					<a
						class="underline hover:text-gray-800"
						href="https://azure.microsoft.com/products/machine-learning"
						target="_blank">AzureML</a
					>
				</div>
				<div
					class="flex border-dotter border-b border-gray-100 flex-1 mx-2 -translate-y-px"
				/>
				<div>
					{azureStatus[modelStatus]}
				</div>
			</div>
		{:else}
			{status[modelStatus]}
		{/if}
	</div>
	{#if error}
		<div class="alert alert-error mt-3">{error}</div>
	{/if}
</div>
