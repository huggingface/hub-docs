<script lang="ts">
	export let decodingStrategy: "sampling" | "greedy" = "sampling";
	$: isSampling = decodingStrategy === "sampling";
	$: description =
		decodingStrategy === "sampling"
			? "imaginative completions (may be not super accurate e.g. math/history)"
			: "accurate completions (may be more boring or have repetitions)";

	function toggleState() {
		decodingStrategy = decodingStrategy === "sampling" ? "greedy" : "sampling";
	}
</script>

<div>
	<div class="flex items-center gap-x-2">
		<span class="transition-opacity {isSampling ? 'opacity-80' : 'opacity-40'}"
			>sampling</span
		>
		<div class="cursor-pointer" on:click={toggleState}>
			<div class="w-8 h-2 border-2 border-blue-200 dark:border-blue-800 rounded-full relative">
				<div
					class="absolute w-4 h-4 bg-blue-400 dark:bg-blue-600 rounded-full -mt-1.5 transition-transform {!isSampling
						? 'translate-x-3.5'
						: '-translate-x-0.5'}"
				/>
			</div>
		</div>
		<span class="transition-opacity {!isSampling ? 'opacity-80' : 'opacity-40'}"
			>greedy</span
		>
	</div>
	<span
		class="opacity-70 bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 py-0.5 px-1.5 rounded leading-none border border-gray-200"
		>{description}</span
	>
</div>
