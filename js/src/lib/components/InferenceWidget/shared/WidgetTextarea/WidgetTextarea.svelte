<script lang="ts">
	import { tick } from "svelte";
	import { delay } from "../../../../utils/ViewUtils";
	import WidgetLabel from "../WidgetLabel/WidgetLabel.svelte";

	export let label: string = "";
	export let placeholder: string = "Your sentence here...";
	export let value: string;
	export let isLoading = false;

	let containerSpanEl: HTMLSpanElement;
	const typingEffectSpeedMs = 15;
	const classNamesInput = "font-normal";
	const classNamesOutput = "font-semibold";


	export async function renderTypingEffect(outputTxt: string) {
		const spanEl = document.createElement("span");
		spanEl.contentEditable = "true";
		spanEl.className = classNamesOutput;
		containerSpanEl?.appendChild(spanEl);
		await tick();
		for (const char of outputTxt) {
			await delay(typingEffectSpeedMs);
			spanEl.textContent += char;
		}
		value += outputTxt;
	}

	// handle FireFox contenteditable paste bug
	function handlePaste(e: ClipboardEvent) {
		if(isLoading){
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
	}

	// user input should always look different from computed output
	function handleKeyPress(e: KeyboardEvent){
		if(isLoading){
			return e.preventDefault();
		}
		const range = window.getSelection().getRangeAt(0);
		const spanEl = document.createElement("span");
		spanEl.contentEditable = "true";
		spanEl.innerHTML = "&#8203";
		spanEl.className = classNamesInput;
		range.deleteContents();
		range.insertNode(spanEl);
		spanEl.focus();
	}
</script>

<WidgetLabel {label}>
	<svelte:fragment slot="after">
		<span
			class="{label
				? 'mt-1.5'
				: ''} select-none block overflow-auto resize-y py-2 px-3 w-full min-h-[90px] max-h-[500px] border border-gray-200 rounded-lg shadow-inner outline-none focus:ring-1 focus:ring-inset focus:ring-indigo-200 focus:shadow-inner dark:bg-gray-925"
			role="textbox"
			contenteditable
			style="--placeholder: '{placeholder}'"
			bind:textContent={value}
			bind:this={containerSpanEl}
			on:paste|preventDefault={handlePaste}
			on:keypress={handleKeyPress}
		>
			<span contenteditable />
		</span>
	</svelte:fragment>
</WidgetLabel>

<style>
	span[contenteditable]:empty::before {
		content: var(--placeholder);
		color: rgba(156, 163, 175);
	}
</style>
