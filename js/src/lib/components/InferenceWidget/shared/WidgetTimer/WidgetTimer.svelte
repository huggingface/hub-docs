<script lang="ts">
	import { onDestroy } from "svelte";

	let counterSeconds = 0.0;
	let interval: ReturnType<typeof setInterval>;
	let shouldDisplay = false;

	// timer show in seconds
	$: counterHuman = counterSeconds.toLocaleString(undefined, {
		minimumFractionDigits: 1,
	});

	export function start() {
		// reset timer for new run
		stop();
		counterSeconds = 0.0;
		shouldDisplay = true;
		// new run
		interval = setInterval(() => (counterSeconds += 0.1), 100);
	}

	export function stop() {
		if (interval) {
			clearInterval(interval);
		}
	}

	onDestroy(() => stop());
</script>

{#if shouldDisplay}
	<span class="text-gray-500 font-mono text-xs">{counterHuman}</span>
{/if}
