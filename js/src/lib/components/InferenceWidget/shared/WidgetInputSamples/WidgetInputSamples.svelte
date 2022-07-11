<script lang="ts">
	import type { WidgetInputSample } from "../../../../interfaces/Types";
	import { slide } from "svelte/transition";
	import IconCaretDownV2 from "../../../Icons/IconCaretDownV2.svelte";

	export let classNames = "";
	export let isLoading = false;
	export let inputSamples: WidgetInputSample[];
	export let applyInputSample: (sample: Record<string, any>) => void;
	export let previewInputSample: (sample: Record<string, any>) => void;

	let containerEl: HTMLElement;
	let isOptionsVisible = false;
	let title = "Examples";

	$: {
		// reset title on inputSamples change (i.e. input group change)
		inputSamples;
		title = "Examples";
	}

	function _applyInputSample(idx: number) {
		hideOptions();
		const sample = inputSamples[idx];
		title = sample.example_title;
		applyInputSample(sample);
	}

	function _previewInputSample(idx: number, isTouch = false) {
		const sample = inputSamples[idx];
		previewInputSample(sample);
		if (isTouch) {
			_applyInputSample(idx);
		}
	}

	function toggleOptionsVisibility() {
		isOptionsVisible = !isOptionsVisible;
	}

	function onClick(e: MouseEvent | TouchEvent) {
		let targetElement = e.target;
		do {
			if (targetElement == containerEl) {
				// This is a click inside. Do nothing, just return.
				return;
			}
			targetElement = (targetElement as HTMLElement).parentElement;
		} while (targetElement);
		// This is a click outside
		hideOptions();
	}

	function hideOptions() {
		isOptionsVisible = false;
	}
</script>

<svelte:window on:click={onClick} />

<div
	class="relative mb-1.5 {classNames}
		{isLoading && 'pointer-events-none opacity-50'} 
		{isOptionsVisible && 'z-10'}"
	bind:this={containerEl}
>
	<div
		class="no-hover:hidden inline-flex justify-between w-32 rounded-md border border-gray-100 px-4 py-1"
		on:click={toggleOptionsVisibility}
	>
		<div class="text-sm truncate">{title}</div>
		<IconCaretDownV2
			classNames="-mr-1 ml-2 h-5 w-5 transition ease-in-out transform {isOptionsVisible &&
				'-rotate-180'}"
		/>
	</div>
	<div
		class="with-hover:hidden inline-flex justify-between w-32 rounded-md border border-gray-100 px-4 py-1"
		on:click={toggleOptionsVisibility}
	>
		<div class="text-sm truncate">{title}</div>
		<IconCaretDownV2
			classNames="-mr-1 ml-2 h-5 w-5 transition ease-in-out transform {isOptionsVisible &&
				'-rotate-180'}"
		/>
	</div>

	{#if isOptionsVisible}
		<div
			class="origin-top-right absolute right-0 mt-1 w-full rounded-md ring-1 ring-black ring-opacity-10"
			transition:slide
		>
			<div class="py-1 bg-white rounded-md" role="none">
				{#each inputSamples as { example_title }, i}
					<div
						class="no-hover:hidden px-4 py-2 text-sm truncate hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-200"
						on:mouseover={() => _previewInputSample(i)}
						on:click={() => _applyInputSample(i)}
					>
						{example_title}
					</div>
					<!-- Better UX for mobile/table through CSS breakpoints -->
					<div
						class="with-hover:hidden px-4 py-2 text-sm truncate hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-200"
						on:click={() => _previewInputSample(i, true)}
					>
						{example_title}
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>
