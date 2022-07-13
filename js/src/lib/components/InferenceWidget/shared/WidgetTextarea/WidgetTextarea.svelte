<script lang="ts">
	import { tick } from "svelte";
	import { delay } from "../../../../utils/ViewUtils";
	import WidgetLabel from "../WidgetLabel/WidgetLabel.svelte";

	export let label: string = "";
	export let placeholder: string = "Your sentence here...";
	export let value: string;
	export let isLoading = false;
	export let size: "small" | "big" = "small";

	let newValue = "";
	let isOnFreshLine = true;
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
		newValue = "";
		isOnFreshLine = true;
		parseChildNodesForValueAndLines(containerSpanEl.childNodes);
		value = newValue;
	}

	// from https://stephenhaney.com/2020/get-contenteditable-plaintext-with-correct-linebreaks/
	// Recursive function to navigate childNodes and build linebreaks with text
	function parseChildNodesForValueAndLines(childNodes: NodeListOf<ChildNode>) {
		for (let i = 0; i < childNodes.length; i++) {
			const childNode = childNodes[i];

			if (childNode.nodeName === "BR") {
				// BRs are always line breaks which means the next loop is on a fresh line
				newValue += "\n";
				isOnFreshLine = true;
				continue;
			}

			// We may or may not need to create a new line
			if (childNode.nodeName === "DIV" && isOnFreshLine === false) {
				// Divs create new lines for themselves if they aren't already on one
				newValue += "\n";
			}

			// Whether we created a new line or not, we'll use it for this content so the next loop will not be on a fresh line:
			isOnFreshLine = false;

			// Add the text content if this is a text node:
			if (childNode.nodeType === 3 && childNode.textContent) {
				newValue += childNode.textContent;
			}

			// If this node has children, get into them as well:
			parseChildNodesForValueAndLines(childNode.childNodes);
		}
	}

	export function setValue(text: string) {
		containerSpanEl.textContent = text;
		updateInnerTextValue();
	}
</script>

<WidgetLabel {label}>
	<svelte:fragment slot="after">
		<span
			class="{isLoading ? 'pointer-events-none' : ''} {label
				? 'mt-1.5'
				: ''} block overflow-auto resize-y py-2 px-3 w-full {size === 'small'
				? 'min-h-[42px]'
				: 'min-h-[144px]'} max-h-[500px] whitespace-pre-wrap border border-gray-200 rounded-lg shadow-inner outline-none focus:ring focus:ring-blue-200 focus:shadow-inner dark:bg-gray-925"
			role="textbox"
			contenteditable
			style="--placeholder: '{placeholder}'"
			spellcheck="false"
			dir="auto"
			bind:this={containerSpanEl}
			on:paste|preventDefault={handlePaste}
			on:keypress={updateInnerTextValue}
		/>
	</svelte:fragment>
</WidgetLabel>

<style>
	span[contenteditable]:empty::before {
		content: var(--placeholder);
		color: rgba(156, 163, 175);
	}
</style>
