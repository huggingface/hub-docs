<script lang="ts">
	import IconSpin from "../../../Icons/IconSpin.svelte";

	export let isLoading: boolean;
	export let getOutput: () => void;

	function onKeyDown(e: KeyboardEvent) {
		const { key } = e;
		if (key === "Tab") {
			e.preventDefault();
			if (!isLoading) {
				getOutput();
			}
		}
	}
</script>

<svelte:window on:keydown={onKeyDown} />

<div
	class="no-hover:hidden flex items-center space-x-1 mt-16 {isLoading
		? 'opacity-40'
		: 'opacity-70'}"
>
	<span class="text-xs border-2 py-1 px-1.5 rounded-lg">Tab</span>
	{#if isLoading}
		<IconSpin classNames="text-gray-600 animate-spin" />
	{:else}
		<span>to run</span>
	{/if}
</div>
