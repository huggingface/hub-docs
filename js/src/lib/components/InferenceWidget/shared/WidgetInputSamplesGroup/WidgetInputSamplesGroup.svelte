<script lang="ts">
	import { slide } from "svelte/transition";
	import IconCaretDownV2 from "../../../Icons/IconCaretDownV2.svelte";

	export let classNames = "";
	export let isLoading = false;
	export let inputGroups: string[];
	export let selectedInputGroup: string;

	let containerEl: HTMLElement;
	let isOptionsVisible = false;
	let title = "Groups";

	function chooseInputGroup(idx: number) {
		hideOptions();
		const inputGroup = inputGroups[idx];
		title = inputGroup;
		selectedInputGroup = inputGroup;
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
		class="with-hover:hidden inline-flex justify-between w-32 lg:w-44 rounded-md border border-gray-100 px-4 py-1"
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
				{#each inputGroups as inputGroup, i}
					<div
						class="px-4 py-2 text-sm truncate hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-200"
						on:click={() => chooseInputGroup(i)}
					>
						{inputGroup}
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>
