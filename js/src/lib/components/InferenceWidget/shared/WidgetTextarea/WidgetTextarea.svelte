<script lang="ts">
	import { tick } from "svelte";
	import { delay } from "../../../../utils/ViewUtils";
	import WidgetLabel from "../WidgetLabel/WidgetLabel.svelte";

	export let label: string = "";
	export let placeholder: string = "Your sentence here...";
	export let value: string;
	export let isLoading = false;
	export let size: "small" | "big" = "small";

	let containerSpanEl: HTMLSpanElement;
	const typingEffectSpeedMs = 12;
	const classNamesInput = "font-normal text-black dark:text-white";
	const classNamesOutput = "text-blue-600 dark:text-blue-400";

	export async function renderTypingEffect(outputTxt: string) {
		const spanEl = document.createElement("span");
		spanEl.contentEditable = "true";
		spanEl.className = classNamesOutput;
		containerSpanEl?.appendChild(spanEl);
		await tick();
		// split on whitespace or any other character to correctly render newlines \n
		for (const char of outputTxt.split(/(\s|.)/g)) {
			await delay(typingEffectSpeedMs);
			spanEl.textContent += char;
			moveCaretToEnd();
		}
		updateInnerTextValue();
	}

	function moveCaretToEnd() {
		containerSpanEl?.focus();
		if (containerSpanEl) {
			const range = document.createRange();
			range.selectNodeContents(containerSpanEl);
			range.collapse(false);
			const selection = window.getSelection();
			selection.removeAllRanges();
			selection.addRange(range);
		}
	}

	// handle FireFox contenteditable paste bug
	function handlePaste(e: ClipboardEvent) {
		if (isLoading) {
			return e.preventDefault();
		}
		const copiedTxt = e.clipboardData.getData("text/plain");
		const selection = window.getSelection();
		if (selection.rangeCount && !!copiedTxt.length) {
			const range = selection.getRangeAt(0);
			range.deleteContents();
			const spanEl = document.createElement("span");
			spanEl.contentEditable = "true";
			spanEl.className = classNamesInput;
			spanEl.innerText = copiedTxt;
			range.insertNode(spanEl);
		}
		window.getSelection().collapseToEnd();
		updateInnerTextValue();
	}

	function updateInnerTextValue() {
		value = containerSpanEl?.textContent ?? "";
	}

	export function setValue(text: string) {
		containerSpanEl.textContent = text;
		updateInnerTextValue();
	}
</script>

<WidgetLabel {label}>
	<svelte:fragment slot="after">
		<!-- `whitespace-pre-wrap inline-block` are needed to get correct newlines from `el.textContent` on Chrome -->
		<span
			class="{isLoading ? 'pointer-events-none' : ''} {label
				? 'mt-1.5'
				: ''} block overflow-auto resize-y py-2 px-3 w-full {size === 'small'
				? 'min-h-[42px]'
				: 'min-h-[144px]'} max-h-[500px] whitespace-pre-wrap inline-block border border-gray-200 rounded-lg shadow-inner outline-none focus:ring focus:ring-blue-200 focus:shadow-inner dark:bg-gray-925"
			role="textbox"
			contenteditable
			style="--placeholder: '{placeholder}'"
			spellcheck="false"
			dir="auto"
			bind:this={containerSpanEl}
			on:paste|preventDefault={handlePaste}
			on:input={updateInnerTextValue}
		/>
	</svelte:fragment>
</WidgetLabel>

<style>
	span[contenteditable]:empty::before {
		content: var(--placeholder);
		color: rgba(156, 163, 175);
	}
</style>
