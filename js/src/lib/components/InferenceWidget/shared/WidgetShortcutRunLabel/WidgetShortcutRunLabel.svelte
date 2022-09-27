<script lang="ts">
	import { onMount } from "svelte";

	export let isLoading: boolean;

	let shortcutLabel = "";

	onMount(() => {
		const isMac = navigator.platform.includes("Mac");
		shortcutLabel = isMac ? "⌘+Enter" : "ctrl+Enter";
	});
</script>

<kbd
	class="no-hover:hidden text-xs bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 py-0.5 px-1.5 rounded leading-none border border-gray-200 {isLoading
		? 'opacity-40'
		: 'opacity-70'}"
	>{shortcutLabel}
</kbd>
