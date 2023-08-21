<script lang="ts">
import type { WidgetProps, ModelLoadInfo, LoadingStatus } from '../types';

import IconAzureML from '../../../Icons/IconAzureML.svelte';

export let model: WidgetProps['model'];
export let computeTime: string;
export let error: string;
export let modelLoadInfo: ModelLoadInfo = { status: 'unknown' };

const status = {
	ignored: '',
	error: '⚠️ This model could not be loaded by the inference API. ⚠️',
	loaded: 'This model is currently loaded and running on the Inference API.',
	unknown: 'This model can be loaded on the Inference API on-demand.',
} as const;

const azureStatus = {
	ignored: '',
	error: '⚠️ This model could not be loaded.',
	loaded: 'This model is loaded and running on AzureML Managed Endpoint',
	unknown: 'This model can be loaded loaded on AzureML Managed Endpoint',
} as const;

function getStatusReport(
	modelLoadInfo: ModelLoadInfo,
	statuses: Record<LoadingStatus, string>,
	isAzure = false
): string {
	if (modelLoadInfo.status === 'ignored') {
		return '';
	} else if (modelLoadInfo.compute_type === 'cpu' && modelLoadInfo.status === 'loaded' && !isAzure) {
		return `The model is loaded and running on <a class="hover:underline" href="https://huggingface.co/intel" target="_blank">Intel Xeon 3rd Gen Scalable CPU</a>`;
	}
	return statuses[modelLoadInfo.status];
}

function getComputeTypeMsg(): string {
	let compute_type = modelLoadInfo?.compute_type ?? 'cpu';
	if (compute_type === 'cpu') {
		return 'Intel Xeon 3rd Gen Scalable cpu';
	}
	return compute_type;
}
</script>

<div class="mt-2">
	{#if modelLoadInfo.status !== 'ignored'}
		<div class="text-gray-400 text-xs">
			{#if model.id === 'bigscience/bloom'}
				<div class="flex items-baseline">
					<div class="flex items-center whitespace-nowrap text-gray-700">
						<IconAzureML classNames="mr-1 flex-none" /> Powered by&nbsp;
						<a
							class="underline hover:text-gray-800"
							href="https://azure.microsoft.com/products/machine-learning"
							target="_blank">AzureML</a
						>
					</div>
					<div class="flex border-dotter border-b border-gray-100 flex-1 mx-2 -translate-y-px" />
					<div>
						{@html getStatusReport(modelLoadInfo, azureStatus, true)}
					</div>
				</div>
			{:else if computeTime}
				Computation time on {getComputeTypeMsg()}: {computeTime}
			{:else}
				{@html getStatusReport(modelLoadInfo, status)}
			{/if}
		</div>
	{/if}
	{#if error}
		<div class="alert alert-error mt-3">{error}</div>
	{/if}
</div>
