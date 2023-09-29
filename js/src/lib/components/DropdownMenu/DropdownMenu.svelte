<script lang="ts">
	import { onMount } from "svelte";

	type Alignement = "left" | "right" | "screen-center";

	export let classNames = "";
	export let dropdownElement: HTMLElement | undefined = undefined;
	export let forceAlignement: Alignement | undefined = undefined;
	export let onClose: () => void;

	// MUST be set to left if forceAlignement is undefined or else
	// the browser won't be able to properly compute x and width
	let alignement: Alignement = forceAlignement ?? "left";
	let element: HTMLElement | undefined;
	let docWidth: number | undefined;

	onMount(() => {
		document.addEventListener("click", handleClickDocument);
		screen?.orientation?.addEventListener("change", onClose);

		docWidth = document.documentElement.clientWidth;
		const bbox = element?.getBoundingClientRect();
		if (bbox) {
			const left = bbox.left ?? 0;
			const width = bbox.width ?? 0;
			if (!forceAlignement) {
				alignement = left + width > docWidth ? "right" : "left";
			}
			if (element && alignement === "screen-center") {
				element.style.transform = `translateX(${docWidth / 2 - width / 2 - bbox.left}px)`;
			}
		}
		return () => {
			document.removeEventListener("click", handleClickDocument);
			screen?.orientation?.removeEventListener("change", onClose);
		};
	});

	function handleClickDocument(e: MouseEvent) {
		// We ignore clicks that happens inside the Dropdown itself
		// (prevent race condition  with other click handlers)
		const targetElement = e.target as HTMLElement;
		if (targetElement !== dropdownElement && !dropdownElement?.contains(targetElement)) {
			onClose();
		}
	}

	function handleResize() {
		if (docWidth !== document.documentElement.clientWidth) {
			onClose();
		}
	}
</script>

<svelte:window on:resize={handleResize} on:blur={onClose} />

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	bind:this={element}
	class="absolute top-full z-10 mt-1 w-auto min-w-0 max-w-xs overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg
		{alignement === 'right' ? 'right-0' : 'left-0'}
		{classNames}"
	on:click|stopPropagation={onClose}
>
	<ul class="min-w-full">
		<slot />
	</ul>
</div>
