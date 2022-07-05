<script lang="ts">
	import { onMount } from "svelte";

	export let isLoading: boolean;
	export let getOutput: () => void;

	let shortcutLabel = "";

	onMount(() => {
		const isMac = navigator.platform.includes("Mac");
		shortcutLabel = isMac ? "⌘+Enter" : "Ctrl+Enter";
	});

	function onKeyDown(e: KeyboardEvent) {
		if (isLoading) {
			return;
		}
		if (e.code === "Enter" && (e.metaKey || e.ctrlKey)) {
			e.preventDefault();
			getOutput();
		}
	}
</script>

<svelte:window on:keydown={onKeyDown} />

<kbd
	class="no-hover:hidden text-sm bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 py-0.5 px-1.5 rounded leading-none border border-gray-200 {isLoading
		? 'opacity-40'
		: 'opacity-70'}"
	>{shortcutLabel}
</kbd>
