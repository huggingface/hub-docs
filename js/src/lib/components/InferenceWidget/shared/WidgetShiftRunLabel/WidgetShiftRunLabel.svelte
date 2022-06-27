<script lang="ts">
	import IconSpin from "../../../Icons/IconSpin.svelte";

	export let isLoading: boolean;
</script>

<div
	class="no-hover:hidden flex items-center space-x-1 mt-16 {isLoading
		? 'opacity-40'
		: 'opacity-70'}"
>
	<span class="text-xs border-2 py-1 px-1.5 rounded-lg"
		>Shift + Enter</span
	>
	{#if isLoading}
		<IconSpin classNames="text-gray-600 animate-spin" />
	{:else}
		<span>to run</span>
	{/if}
</div>
