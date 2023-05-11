<script lang="ts">
	import { onMount } from "svelte";

	type Alignement = "left" | "right";

	export let centerOnMobile = false;
	export let classNames = "";
	export let dropdownElement: HTMLElement | undefined = undefined;
	export let forceAlignement: Alignement | undefined = undefined;
	export let onClose: () => void;

	// MUST be set to left if forceAlignement is undefined or else
	// the browser won't be able to properly compute x and width
	let alignement: Alignement = forceAlignement ?? "left";
	let element: HTMLElement | undefined;

	onMount(() => {
		document.addEventListener("click", handleClickDocument);
		window.addEventListener("blur", onClose);

		if (!forceAlignement) {
			const docWidth = document.documentElement.clientWidth;
			const domRect = element?.getBoundingClientRect() || {};
			const left = domRect["left"] ?? 0;
			const width = domRect["width"] ?? 0;
			alignement = left + width > docWidth ? "right" : "left";
		}

		return () => {
			document.removeEventListener("click", handleClickDocument);
			window.removeEventListener("blur", onClose);
		};
	});

	function handleClickDocument(e: MouseEvent) {
		// We ignore clicks that happens inside the Dropdown itself
		// (prevent race condition  with other click handlers)
		const targetElement = e.target as HTMLElement;
		if (
			targetElement !== dropdownElement &&
			!dropdownElement?.contains(targetElement)
		) {
			onClose();
		}
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	bind:this={element}
	class="z-10 mt-1 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg
		{centerOnMobile
		? 'fixed left-1/2 w-auto max-w-xs -translate-x-1/2 sm:absolute sm:w-auto sm:min-w-full sm:translate-x-0'
		: 'absolute top-full min-w-full'}
		{alignement === 'right' ? 'right-0 sm:left-auto' : 'left-0'}
		{classNames}"
	on:click|stopPropagation={onClose}
	on:touchmove={(e) => {
		if (centerOnMobile) {
			e.preventDefault();
		}
	}}
>
	<ul class="min-w-full">
		<slot />
	</ul>
</div>
