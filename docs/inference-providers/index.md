# Inference Providers

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/Inference-providers-banner-light.png"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/inference-providers/Inference-providers-banner-dark.png"/>
</div>

Hugging Face’s Inference Providers give developers access to hundreds of machine learning models, powered by world-class inference providers. They are also integrated into our client SDKs (for JS and Python), making it easy to explore serverless inference of models on your favorite providers.

## Quick Setup for Agents

Using a coding agent? Point it at Inference Providers to run [the latest open models available](https://huggingface.co/models?inference_provider=all) with a single Hugging Face token. Pick your tool below to jump straight to its setup guide.

<div class="grid grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-4 my-6">
    <a href="./integrations/opencode" class="flex flex-col items-center justify-center gap-2 sm:gap-3 px-3 py-4 sm:px-4 sm:py-6 rounded-xl border border-gray-200 dark:border-gray-800 no-underline transition-none hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-inner">
        <svg class="h-8 w-8 sm:h-10 sm:w-10" width="40" height="40" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img"><rect width="512" height="512" rx="96" fill="#131010"/><path d="M320 224V352H192V224H320Z" fill="#5A5858"/><path fill-rule="evenodd" clip-rule="evenodd" d="M384 416H128V96H384V416ZM320 160H192V352H320V160Z" fill="white"/></svg>
        <span class="font-semibold text-center leading-tight text-gray-900 dark:text-gray-100">OpenCode</span>
    </a>
    <a href="./integrations/pi" class="flex flex-col items-center justify-center gap-2 sm:gap-3 px-3 py-4 sm:px-4 sm:py-6 rounded-xl border border-gray-200 dark:border-gray-800 no-underline transition-none hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-inner">
        <svg class="text-black dark:text-white h-8 w-8 sm:h-10 sm:w-10" width="40" height="40" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img"><path fill="currentColor" fill-rule="evenodd" d="M165.29 165.29H517.36V400H400V517.36H282.65V634.72H165.29ZM282.65 282.65V400H400V282.65Z"/><path fill="currentColor" d="M517.36 400H634.72V634.72H517.36Z"/></svg>
        <span class="font-semibold text-center leading-tight text-gray-900 dark:text-gray-100">Pi</span>
    </a>
    <a href="./integrations/codex" class="flex flex-col items-center justify-center gap-2 sm:gap-3 px-3 py-4 sm:px-4 sm:py-6 rounded-xl border border-gray-200 dark:border-gray-800 no-underline transition-none hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-inner">
        <svg class="text-black dark:text-white h-8 w-8 sm:h-10 sm:w-10" width="40" height="40" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img"><path d="M10.28 5.1a2.5 2.5 0 0 0-.21-2.05 2.52 2.52 0 0 0-2.71-1.21 2.53 2.53 0 0 0-4.29.9 2.5 2.5 0 0 0-1.66 1.21 2.52 2.52 0 0 0 .3 2.96 2.5 2.5 0 0 0 .22 2.04 2.52 2.52 0 0 0 2.72 1.21 2.5 2.5 0 0 0 1.87.84 2.52 2.52 0 0 0 2.4-1.75 2.5 2.5 0 0 0 2-2.73 2.52 2.52 0 0 0-.64-1.43Zm-3.76 5.25c-.43 0-.86-.16-1.2-.44l.06-.03 2-1.15a.33.33 0 0 0 .16-.28V5.64l.84.49a.03.03 0 0 1 .02.02v2.32a1.88 1.88 0 0 1-1.88 1.88ZM2.5 8.63c-.22-.38-.3-.83-.22-1.26l.06.04 1.99 1.15a.32.32 0 0 0 .32 0l2.44-1.4v.96a.03.03 0 0 1-.02.03L5.06 9.3a1.87 1.87 0 0 1-2.56-.68Zm-.53-4.34c.23-.38.58-.67.99-.82v2.36a.32.32 0 0 0 .16.29l2.42 1.4L4.7 8a.03.03 0 0 1-.03 0l-2-1.16a1.88 1.88 0 0 1-.7-2.56v.01Zm6.92 1.6L6.46 4.5 7.3 4a.03.03 0 0 1 .03 0l2.01 1.16a1.87 1.87 0 0 1-.28 3.38V6.17a.33.33 0 0 0-.17-.27Zm.84-1.25-.06-.04-1.99-1.16a.32.32 0 0 0-.33 0l-2.43 1.4v-.97a.03.03 0 0 1 .01-.02l2.01-1.16a1.87 1.87 0 0 1 2.79 1.94ZM4.46 6.36l-.84-.49a.03.03 0 0 1-.02-.02V3.53A1.87 1.87 0 0 1 6.68 2.1l-.06.04-2 1.14a.33.33 0 0 0-.16.29v2.8Zm.46-.99L6 4.75l1.09.62v1.25L6 7.25l-1.09-.63V5.37Z" fill="currentColor"/></svg>
        <span class="font-semibold text-center leading-tight text-gray-900 dark:text-gray-100">Codex</span>
    </a>
    <a href="./integrations/claude-code" class="flex flex-col items-center justify-center gap-2 sm:gap-3 px-3 py-4 sm:px-4 sm:py-6 rounded-xl border border-gray-200 dark:border-gray-800 no-underline transition-none hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-inner">
        <svg class="h-8 w-8 sm:h-10 sm:w-10" width="40" height="40" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img"><g clip-path="url(#quick-setup-claude-clip)"><path d="m2.96 7.65 1.97-1.1.03-.1-.03-.05h-.1l-.33-.02-1.12-.03-.97-.04-.95-.06-.24-.05L1 5.91l.02-.15.2-.13.29.02.63.05.95.06.69.04 1.02.11h.16L5 5.84l-.06-.04-.04-.04-.99-.66-1.06-.7-.56-.41-.3-.2-.15-.2-.07-.42.28-.3.36.03.1.02.37.29.8.61 1.03.77.16.12.06-.04v-.03l-.06-.11-.57-1.02-.6-1.04-.27-.43-.07-.26c-.03-.1-.04-.2-.04-.3l.3-.42L3.8 1l.42.06.17.15.26.59.42.93.64 1.26.2.37.1.35.03.1h.07v-.06l.05-.7.1-.88.1-1.12.03-.32.16-.38.3-.2.25.11.2.29-.03.18-.12.77-.23 1.21-.15.81h.09l.1-.1.41-.54.69-.86.3-.34.36-.38.22-.18h.43l.32.47-.14.49-.44.56-.37.47-.53.71-.33.57.03.04h.08l1.2-.26.63-.11.77-.13.35.16.04.16-.14.34-.82.2-.96.2-1.44.33-.01.01.02.03.64.06.28.02h.68l1.25.09.33.22.2.26-.03.2-.5.26-.7-.16-1.59-.38-.54-.13h-.08v.04l.46.45.83.75 1.05.97.05.24-.13.2-.15-.03-.92-.69-.35-.31-.8-.68h-.06v.08l.19.27.98 1.46.05.45-.07.15-.26.09-.28-.05-.57-.8-.59-.9-.47-.82-.06.04-.28 3.02-.13.15-.3.12-.26-.2-.14-.3.14-.62.16-.8.13-.64.12-.79.07-.26v-.02H5.9l-.6.83-.9 1.22-.73.77-.17.07-.3-.15.03-.28.17-.24 1-1.27.6-.78.38-.46v-.06h-.03L2.72 8.73l-.47.06-.2-.19.02-.3.1-.1.8-.55Z" fill="#D97757"/></g><defs><clipPath id="quick-setup-claude-clip"><path fill="#fff" transform="translate(1 1)" d="M0 0h10v10H0z"/></clipPath></defs></svg>
        <span class="font-semibold text-center leading-tight text-gray-900 dark:text-gray-100">Claude Code</span>
    </a>
    <a href="./integrations/hermes-agent" class="flex flex-col items-center justify-center gap-2 sm:gap-3 px-3 py-4 sm:px-4 sm:py-6 rounded-xl border border-gray-200 dark:border-gray-800 no-underline transition-none hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-inner">
        <svg class="text-black dark:text-white h-8 w-8 sm:h-10 sm:w-10" width="40" height="40" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img"><path fill="currentColor" d="M6.07.83a3.4 3.4 0 0 1 3 2.14q.16.36.28.73.12.42.2.86l.12.65.21.93a18 18 0 0 0 .4 1.5q.07.29.1.58.04.18.04.36v.38q-.03.27-.1.52-.15.4-.4.71l-.06.07h.01l.05-.02q.14-.09.23-.21.27-.3.42-.66a1.5 1.5 0 0 0 .02-1.27l-.02-.05.05.03q.07.08.13.17.2.33.21.71a1.6 1.6 0 0 1-.86 1.5q-.12.08-.26.13a.3.3 0 0 0-.13.16.2.2 0 0 0-.02.18v.06q-.01.05-.05.07-.05 0-.07-.05l-.02-.1a1 1 0 0 0-.14-.38q-.12-.22-.31-.4a1 1 0 0 0-.39-.22l-.3-.06h-.1l.24.09a2 2 0 0 1 .85.7l.1.2.03.17q0 .04-.02.06-.04.02-.07 0L9.4 11q0-.06-.03-.1a3 3 0 0 0-.62-.72 1 1 0 0 0-.23-.14 1 1 0 0 0-.5-.06q-.13 0-.27.02a1 1 0 0 0-.32.12q-.2.14-.36.3l-.41.46a1 1 0 0 0-.13.23l-.01.03-.01.02h-.16q-.04 0-.03-.03l.03-.14q.04-.21.15-.4.01-.03.05-.03v.02l.02.03q.17-.28.42-.49l.35-.24-.21.06q-.25.09-.48.25-.1.05-.18.14-.28.35-.46.76l-.02.05-.03.03h-.21q-.03 0-.02-.04l.16-.18q.2-.17.34-.38l.04-.06q.16-.2.35-.38l.12-.11.03-.04-.07.01-.04.02-.32.19q-.27.14-.52.3-.19.14-.39.24H5.4c0-.05.06-.08.05-.14l-.04.02-.14.13-.37.41h-.52l.01-.01q.03-.05.04-.12-.06-.02-.09.03l-.06.1h-.06l.08-.12v-.01h-.02l-.23.12-.07.02H2.85v-.03q.14-.1.23-.26a2 2 0 0 0 .29-.74l-.03.04-.15.18a.7.7 0 0 1-.42.2 1 1 0 0 1-.37-.05.6.6 0 0 1-.35-.46c0-.08 0-.08-.08-.1a2 2 0 0 1-.51-.25 1 1 0 0 1-.35-.49 2 2 0 0 1-.07-.53l.01-.05.02.03.04.2q.06.23.22.4a1 1 0 0 0 .4.23q.22.08.46-.01.16-.07.27-.2.2-.22.28-.52v-.05h-.01l-.04.07q-.18.32-.52.49a.7.7 0 0 1-.9-.2 1 1 0 0 1-.15-.4 1 1 0 0 1 0-.39c.02-.19.2-.5.32-.55l-.02.07-.05.15c-.06.2-.04.43.06.61q.09.16.27.2l.14.01q.1 0 .17-.05a1 1 0 0 0 .16-.21q.09-.25.13-.51l.1-.75.04-.3.03-.3.03-.3.01-.17.02-.18.03-.33q0-.04-.04-.07a1 1 0 0 1-.33-.33q-.02-.03-.06-.05a1 1 0 0 0 .2.37q.06.04.11.1h-.03l-.1-.02q-.31-.1-.55-.36-.28-.31-.3-.74-.03-.22 0-.46.05-.38.2-.75l.22-.48q.14-.24.33-.46.34-.36.75-.62a6 6 0 0 1 1.66-.77q.43-.13.86-.18l.3-.03zm-1.18 9.92q-.15.17-.29.38l-.02.04.04-.02.35-.42.02-.05h-.01zm.65-1.55-.13.13-.16.17a.4.4 0 0 1-.16.1l-.2.05h-.07l.03.06.2.31.16.29.07.17q.04.02.09-.02l.37-.18q.15-.06.28-.13l.44-.3.01-.01-.02-.02q-.18-.08-.33-.21l-.22-.18a1 1 0 0 1-.18-.28l-.03-.07zm-2.43.12q-.08.24-.24.43a.6.6 0 0 1-.33.22l-.3.03h-.07l.02.04q.06.09.17.12.1.03.22.01a1 1 0 0 0 .2-.1q.15-.13.24-.31a2 2 0 0 0 .15-.57zm6.5-2.1.02.04.03.2.03.28q.02.23 0 .45l-.05.4a3 3 0 0 1-.2.7l.03-.03.11-.1a1.4 1.4 0 0 0 .32-1.12 4 4 0 0 0-.26-.81l-.01-.02zM3.12 4.4v.07l.17.32q.03.03.01.07-.18.03-.38.11l.06.04q.04.01.04.05l-.05.03.03.02q.11.06.19.16.1.12.08.27a.7.7 0 0 1-.3.5l-.07.04-.03.05-.01.06.02.08q.06.13.17.22l.1.1a.2.2 0 0 1 0 .17l-.03.06q-.02.04 0 .07l.06.06q.01.04.06.03.08-.03.14 0 .1.02.2.08l.21.11h.05q.05-.01.07.03.01.05-.04.06l-.09.04q-.06.02-.13.03.02-.04.05-.07c-.09-.05-.28-.06-.34-.01q.03.08-.04.13c-.06-.04-.02-.08 0-.12h-.04l-.06.03-.01.04c0 .04.03.1.07.1l.15-.01h.08q-.07.06-.15.08c0 .02.03.04 0 .06q-.02.02-.05-.01l-.1-.09a.2.2 0 0 1-.07-.13q0-.04-.02-.08-.02-.05.02-.08l-.02-.03-.09-.16q-.03-.09.02-.16l.03-.05.02-.07q0-.1-.08-.17a1 1 0 0 1-.2-.23l-.01-.02-.01.02-.02.24q0 .24.07.48.08.26.2.5l.45.77a.4.4 0 0 0 .3.12q.14 0 .27-.02.19-.01.38-.05l.24-.03q.13-.01.22.1a2 2 0 0 1 .43.58q.03.06.07.01l.17-.15q.04-.04.03-.1a2 2 0 0 1-.03-.54l.02-.29.16-1 .12-.63.1-.8-.01-.53c-.01-.07 0-.07-.07-.09l-.26-.04q-.1 0-.1-.09 0-.03-.02-.06l-.01-.04-.02.12q.01.05-.05.05h-.69q-.06.02-.1-.04L4.6 4.7q-.03-.05-.08-.02l-.25.09q-.15.06-.3.17L3.84 5h-.06l.02-.06.1-.13.02-.04v-.01l-.09.01q-.1.02-.19.06-.08.02-.17-.03-.18-.15-.31-.34zm3.64 3.9-.4.26q-.05.05-.03.12l.06.13q.03.04.1.06h.14q.14-.06.23-.16a.1.1 0 0 0 .04-.13l-.06-.24-.01-.07zm-.18-.68-.2.57h.04l.34-.22q.03-.01.02-.05l-.01-.17-.03-.39-.01-.13H6.7q-.08.18-.14.4m1.47-3.9.04.12.1.31.25.84.47 1.66.06.28q0 .07.03.14l-.02-.16-.05-.28-.02-.09-.12-.51-.27-.88-.3-1.01-.06-.15-.05-.14zM3.29 7q-.04 0-.06.04a.2.2 0 0 0 .18 0zm-.12-.63q.09-.03.16.06l.02.06q0 .01-.02.02l-.15-.12zm-.34-.37v.05q.04-.02.03-.05 0-.02-.03 0m.04-.5-.02.01v.25l.03.09q.04.09.13.04.03 0 0-.04l-.05-.1c0-.02-.03-.05-.01-.08.02-.04-.04-.06-.03-.09v-.06q0-.03-.03-.03zm1.68-.62.26.1.03.02V5l-.12-.04-.14-.04c-.1-.02-.1-.02-.12 0l.25.06.35.18q.03 0 .05.04t.05.03l.1-.01-.03.04c.03.03.06 0 .1.02-.04.06-.11.04-.15.09l.03.03-.05.04c0 .05-.02.07-.14.1l.02.04-.09.02.03.05h-.1v.06l-.11-.01-.03.05h-.03q-.04-.04-.08 0h-.04l-.03-.02c-.05.04-.05.04-.1 0q-.03.04-.07 0-.05.01-.08 0-.04 0-.06-.03l-.05.02c0-.1-.09-.09-.15-.1q0-.03.04-.03h.07q.1.05.21.07l.26-.01a.5.5 0 0 0 .3-.16L5 5.41l-.01-.05-.17-.1q.03.08-.04.1v.01q.05.06 0 .12l-.1.09a.2.2 0 0 1-.28-.02l-.06-.07c-.03-.04-.03-.04-.01-.1q-.09-.06-.04-.16 0-.03.02-.07l-.04.02a.4.4 0 0 0-.15.17l-.01.02-.03-.02v-.03H4l.03-.07-.02-.02.05-.13-.06.03h-.04v-.04q.1-.17.26-.21.13-.03.25-.02zm-1.67.19a.4.4 0 0 0-.2.05q-.04.02-.02.07l.05.11q.03.07.09.03.08-.03.15-.02.12.02.21.12l.04.03h.01q0-.08-.06-.12-.1-.04-.22-.05h-.1c.1-.08.19-.02.3 0q-.06-.07-.1-.09l-.12-.06q-.04-.01-.03-.07m4.42.14a.4.4 0 0 0-.26.1l-.05.04.1.03.06-.02a.5.5 0 0 1 .39.01q.07.04.16 0l-.02-.03a.4.4 0 0 0-.2-.12Q7.4 5.2 7.3 5.2M4.06 3.68l.1.41q.08.25.2.48l.04.04q.06 0 .1-.03l-.2-.36zm1.03-2.64-.26.01-.3.07-.37.11-.04.03h.03q.27-.05.55-.02.12 0 .24.04.3.07.55.24a2.7 2.7 0 0 1 .98 1.15q.21.5.3 1.04 0 .06.07.08.08 0 .1.1 0 .07-.06.11l-.12.15.04-.01.1-.12q.06-.06.06-.14V3.8q.02-.07-.05-.07h-.04q-.05 0-.05-.06-.04-.14.1-.18l.11-.02.2-.02q.1-.02.1.07l.02.04q.02.1-.07.12l-.03.02-.02.03c-.02.06.03.16.09.19l.29.14h.03l-.01-.02-.23-.13-.08-.04-.04-.03-.01-.05a.1.1 0 0 1 .05-.08h.03q.05-.03.05-.09V3.6l-.1-.38q-.12-.46-.35-.87a3 3 0 0 0-.6-.78 2 2 0 0 0-.51-.36 2 2 0 0 0-.75-.17M8 3.6l.02.01zM2.36 2.5l-.01.02-.02.02-.16.15-.11.11a1 1 0 0 0-.24.4l.02.08h.03l-.02.07-.07.21v.04l.1-.21q.18-.45.48-.85v-.01l.01-.02m5.62 1.04zv.02H8zM2.4 2.76l-.07.1q-.03.03-.08.01-.09-.01-.12.06l-.12.25q-.04.06-.05.15h.2l-.04.12-.01.07.04-.07.08-.18q.01-.04.05-.04v.11c.05.02.03.08.04.12.04-.01.04-.09.1-.06v.08h.01l.2-.45q-.09-.01-.16.01h-.05l.1-.2v-.01l.01-.01h-.01l-.01.03-.02.01c-.05.07-.04.07-.1.05q-.05 0-.03-.07l.04-.06zm.9-.29a3 3 0 0 0-.32.48 1 1 0 0 1-.25.2l-.04.01.02-.07.1-.22H2.8l-.04.07c-.11.19-.2.36-.2.41h.04c.08.01.08.01.11-.06a.1.1 0 0 1 .07-.07l.07-.03q.03-.01.06-.01l.01.06q.02.05.02.08l.01.07.02-.04.19-.5q.07-.18.14-.33zm1.73-.1.06.21v.22c-.05-.02-.03-.07-.05-.09H5q0 .05-.02.09l-.1.1q-.03.01-.05-.02l-.02-.04-.07.05-.16.06q-.04.02-.03.06l.03.1q0 .05.05.05.16.02.28.12.03-.06.07-.07l.04-.02q.05 0 .07.03l.03.07c.02-.06-.02-.12 0-.18q.08.12.17.24v-.2l.02-.04q.07.1.1.22v-.17q0-.03.02-.04.04.04.1.07a2 2 0 0 0-.35-.7q-.06-.1-.14-.17zm-1.17.28-.08.24q-.02.06-.08.08L3.59 3h-.05l-.02-.05q-.02.05-.07.03l-.17-.1q-.03-.02-.07 0l-.06.16c-.04.12-.04.1.04.2q.03.01.07 0l.06-.01c.06 0 .12-.03.16 0l.25-.08q.03 0 .05.02 0 .03.03.05c.02-.02 0-.05.03-.07l.06.1-.02-.63zm.13.12q-.05 0-.04.05v.05q.02.13.07.25h.01l.04-.02q.02.04.06.04h.27q.06 0 .09.06 0 .01.03.03l-.03-.17-.07-.26q-.04.03-.08.02l-.06-.01zm4.43-.74q.07.1.06.21.01.11-.02.22l-.05-.03q-.07.01-.1-.05l-.12-.12-.05-.05.04.07.05.09q.03.03.02.08h-.1q-.05-.01-.06.02 0 .05-.07.04l.03.05q.03.05-.01.08l-.08.08-.04.02H7.9l-.29-.07-.04-.03-.03-.06-.06-.09v.21q.02.06-.04.05l-.14-.03-.08.01.03.1h.1q.12.01.2.1l.1.12h.01v-.02c0-.03-.03-.05 0-.08l.04.04.08.11.03.06h.02l-.19-.4h.05l.34.13q.04.01.07-.01l.07-.07q.03-.04.05 0l.11.22.07.14h.01l-.06-.15q-.04-.11-.09-.24.1.04.25.32l.02.03h.01l-.02-.06-.06-.19q-.02-.05 0-.11l.06.02-.01-.08V2.7q.03 0 .04.03l.09.14.02.02c-.02-.1-.09-.17-.1-.27l.06.04q0-.1.02-.2t-.02-.19l.02.01.12.16.03.04.02.03V2.5l-.02-.03-.14-.22q-.14-.2-.21-.22m-2.84.14c0 .07.04.12.03.18l-.16.04q.05.08-.02.14l-.06.08q-.03.02 0 .05l.06.12q.01.03.06.03h.1q.07-.02.11.06l.02.02v-.06q.01-.04.04-.04l.1-.02.03.01.03.03c0-.04-.04-.08-.01-.13l.05.02q-.02-.08-.03-.16t.05-.16q.06.05.1.11.13.17.21.36c.07-.03.12.03.18.04a1 1 0 0 0-.09-.21l-.04-.01-.08.02-.04-.05a2 2 0 0 0-.2-.34l-.1-.1-.17.11q-.03.03-.05 0l-.08-.1z"/></svg>
        <span class="font-semibold text-center leading-tight text-gray-900 dark:text-gray-100">Hermes Agent</span>
    </a>
</div>

## Partners

Our platform integrates with leading AI infrastructure providers, giving you access to their specialized capabilities through a single, consistent API. Here's what each partner supports:

| Provider                                     | Chat completion (LLM) | Chat completion (VLM) | Feature Extraction | Text to Image | Text to video | Speech to text |
| -------------------------------------------- | :-------------------: | :-------------------: | :----------------: | :-----------: | :-----------: | :------------: |
| [Cerebras](./providers/cerebras)             |          ✅           |                       |                    |               |               |                |
| [Cohere](./providers/cohere)                 |          ✅           |          ✅           |                    |               |               |                |
| [DeepInfra](./providers/deepinfra)           |          ✅           |          ✅           |                    |               |               |                |
| [Fal AI](./providers/fal-ai)                 |                       |                       |                    |      ✅       |      ✅       |       ✅       |
| [Featherless AI](./providers/featherless-ai) |          ✅           |          ✅           |                    |               |               |                |
| [Fireworks](./providers/fireworks-ai)        |          ✅           |          ✅           |                    |               |               |                |
| [Groq](./providers/groq)                     |          ✅           |          ✅           |                    |               |               |                |
| [HF Inference](./providers/hf-inference)     |          ✅           |          ✅           |         ✅         |      ✅       |               |       ✅       |
| [Hyperbolic](./providers/hyperbolic)         |          ✅           |          ✅           |                    |               |               |                |
| [Novita](./providers/novita)                 |          ✅           |          ✅           |                    |               |      ✅       |                |
| [Nscale](./providers/nscale)                 |          ✅           |          ✅           |                    |      ✅       |               |                |
| [OVHcloud AI Endpoints](./providers/ovhcloud)|          ✅           |          ✅           |                    |               |               |                |
| [Public AI](./providers/publicai)            |          ✅           |                       |                    |               |               |                |
| [Replicate](./providers/replicate)           |                       |                       |                    |      ✅       |      ✅       |       ✅       |
| [SambaNova](./providers/sambanova)           |          ✅           |                       |         ✅         |               |               |                |
| [Scaleway](./providers/scaleway)             |          ✅           |                       |         ✅         |               |               |                |
| [TextCLF](./providers/textclf)               |          ✅           |                       |                     |               |               |                |
| [Together](./providers/together)             |          ✅           |          ✅           |                    |      ✅       |               |                |
| [WaveSpeedAI](./providers/wavespeed)         |                       |                       |                    |      ✅       |      ✅       |                |
| [Z.ai](./providers/zai-org)                  |          ✅           |          ✅           |                    |               |               |                |

## Why Choose Inference Providers?

When you build AI applications, it's tough to manage multiple provider APIs, comparing model performance, and dealing with varying reliability. Inference Providers solves these challenges by offering:

**Instant Access to Cutting-Edge Models**: Go beyond mainstream providers to access thousands of specialized models across multiple AI tasks. Whether you need the latest language models, state-of-the-art image generators, or domain-specific embeddings, you'll find them here.

**Zero Vendor Lock-in**: Unlike being tied to a single provider's model catalog, you get access to models from Cerebras, Groq, Together AI, Replicate, and more — all through one consistent interface.

**Production-Ready Performance**: Built for enterprise workloads with the reliability your applications demand.

Here's what you can build:

- **Text Generation**: Use Large language models with tool-calling capabilities for chatbots, content generation, and code assistance
- **Image and Video Generation**: Create custom images and videos, including support for LoRAs and style customization
- **Search & Retrieval**: State-of-the-art embeddings for semantic search, RAG systems, and recommendation engines
- **Traditional ML Tasks**: Ready-to-use models for classification, NER, summarization, and speech recognition

⚡ **Get Started for Free**: Inference Providers includes a generous free tier, with additional credits for [PRO users](https://hf.co/subscribe/pro) and [Team & Enterprise organizations](https://huggingface.co/enterprise).

## Key Features

- **🎯 All-in-One API**: A single API for text generation, image generation, document embeddings, NER, summarization, image classification, and more.
- **🔀 Multi-Provider Support**: Easily run models from top-tier providers like fal, Replicate, Sambanova, Together AI, and others.
- **🚀 Scalable & Reliable**: Built for high availability and low-latency performance in production environments.
- **🔧 Developer-Friendly**: Simple requests, fast responses, and a consistent developer experience across Python and JavaScript clients.
- **👷 Easy to integrate**: Drop-in replacement for the OpenAI chat completions API.
- **💰 Cost-Effective**: No extra markup on provider rates.

## Getting Started

Inference Providers works with your existing development workflow. Whether you prefer Python, JavaScript, or direct HTTP calls, we provide native SDKs and OpenAI-compatible APIs to get you up and running quickly.

We'll walk through a practical example using [openai/gpt-oss-120b](https://huggingface.co/openai/gpt-oss-120b), a state-of-the-art open-weights conversational model.

### Inference Playground

Before diving into integration, explore models interactively with our [Inference Playground](https://huggingface.co/playground). Test different [chat completion models](http://huggingface.co/models?inference_provider=all&sort=trending&other=conversational) with your prompts and compare responses to find the perfect fit for your use case.

<a href="https://huggingface.co/playground" target="blank"><img src="https://cdn-uploads.huggingface.co/production/uploads/5f17f0a0925b9863e28ad517/9_Tgf0Tv65srhBirZQMTp.png" alt="Inference Playground thumbnail" style="max-width: 550px; width: 100%;"/></a>

### Authentication

You'll need a Hugging Face token to authenticate your requests. Create one by visiting your [token settings](https://huggingface.co/settings/tokens/new?ownUserPermissions=inference.serverless.write&tokenType=fineGrained) and generating a `fine-grained` token with `Make calls to Inference Providers` permissions.

For complete token management details, see our [security tokens guide](https://huggingface.co/docs/hub/en/security-tokens).

### Quick Start - LLM

Let's start with the most common use case: conversational AI using large language models. This section demonstrates how to perform chat completions using DeepSeek V3, showcasing the different ways you can integrate Inference Providers into your applications.

Whether you prefer our native clients, want OpenAI compatibility, or need direct HTTP access, we'll show you how to get up and running with just a few lines of code.

#### Python

Here are three ways to integrate Inference Providers into your Python applications, from high-level convenience to low-level control:

<hfoptions id="python-clients">

<hfoption id="huggingface_hub">

For convenience, the `huggingface_hub` library provides an [`InferenceClient`](https://huggingface.co/docs/huggingface_hub/guides/inference) that automatically handles provider selection and request routing.

In your terminal, install the Hugging Face Hub Python client and log in:

```shell
pip install huggingface_hub
hf auth login # get a read token from hf.co/settings/tokens
```

You can now use the client with a Python interpreter.

By default, our system automatically selects the fastest available provider for the specified model (equivalent to the `:fastest` policy — highest throughput in tokens per second).

You can change the provider selection policy by appending a policy suffix to the model id: `:cheapest` for the most cost-efficient provider (lowest price per output token), or `:preferred` to follow your preference order in [Inference Provider settings](https://hf.co/settings/inference-providers). For example, `openai/gpt-oss-120b:cheapest`.

You can also select the provider of your choice by appending the provider name to the model id (e.g. `"openai/gpt-oss-120b:sambanova"`).

```python
import os
from huggingface_hub import InferenceClient

client = InferenceClient()

completion = client.chat.completions.create(
    model="openai/gpt-oss-120b",
    messages=[
        {
            "role": "user",
            "content": "How many 'G's in 'huggingface'?"
        }
    ],
)

print(completion.choices[0].message)
```

</hfoption>

<hfoption id="openai">

If you're already using OpenAI's Python client, then you need a **drop-in OpenAI replacement**. Just swap-out the base URL to instantly access hundreds of additional open-weights models through our provider network.

By default, our system automatically selects the fastest available provider for the specified model (equivalent to the `:fastest` policy — highest throughput in tokens per second).

You can change the provider selection policy by appending a policy suffix to the model id: `:cheapest` for the most cost-efficient provider (lowest price per output token), or `:preferred` to follow your preference order in [Inference Provider settings](https://hf.co/settings/inference-providers). For example, `openai/gpt-oss-120b:cheapest`.

You can also select the provider of your choice by appending the provider name to the model id (e.g. `"openai/gpt-oss-120b:sambanova"`).

```python
import os
from openai import OpenAI

client = OpenAI(
    base_url="https://router.huggingface.co/v1",
    api_key=os.environ["HF_TOKEN"],
)

completion = client.chat.completions.create(
    model="openai/gpt-oss-120b:fastest",
    messages=[
        {
            "role": "user",
            "content": "How many 'G's in 'huggingface'?"
        }
    ],
)
```

</hfoption>

<hfoption id="requests">

For maximum control and interoperability with custom frameworks, use our OpenAI-compatible REST API directly.

By default, our system automatically selects the fastest available provider for the specified model (equivalent to the `:fastest` policy — highest throughput in tokens per second).

You can change the provider selection policy by appending a policy suffix to the model id: `:cheapest` for the most cost-efficient provider (lowest price per output token), or `:preferred` to follow your preference order in [Inference Provider settings](https://hf.co/settings/inference-providers). For example, `openai/gpt-oss-120b:cheapest`.

You can also select the provider of your choice by appending the provider name to the model id (e.g. `"openai/gpt-oss-120b:sambanova"`).

```python
import os
import requests

API_URL = "https://router.huggingface.co/v1/chat/completions"
headers = {"Authorization": f"Bearer {os.environ['HF_TOKEN']}"}
payload = {
    "messages": [
        {
            "role": "user",
            "content": "How many 'G's in 'huggingface'?"
        }
    ],
    "model": "openai/gpt-oss-120b:fastest",
}

response = requests.post(API_URL, headers=headers, json=payload)
print(response.json()["choices"][0]["message"])
```

</hfoption>

</hfoptions>

#### JavaScript

Integrate Inference Providers into your JavaScript applications with these flexible approaches:

<hfoptions id="javascript-clients">

<hfoption id="huggingface.js">

Our JavaScript SDK provides a convenient interface with automatic provider selection and TypeScript support.

Install with NPM:

```shell
npm install @huggingface/inference
```

Then use the client with Javascript.

By default, our system automatically selects the fastest available provider for the specified model (equivalent to the `:fastest` policy — highest throughput in tokens per second).

You can change the provider selection policy by appending a policy suffix to the model id: `:cheapest` for the most cost-efficient provider (lowest price per output token), or `:preferred` to follow your preference order in [Inference Provider settings](https://hf.co/settings/inference-providers). For example, `openai/gpt-oss-120b:cheapest`.

You can also select the provider of your choice by appending the provider name to the model id (e.g. `"openai/gpt-oss-120b:sambanova"`).

```js
import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient(process.env.HF_TOKEN);

const chatCompletion = await client.chatCompletion({
  model: "openai/gpt-oss-120b:fastest",
  messages: [
    {
      role: "user",
      content: "How many 'G's in 'huggingface'?",
    },
  ],
});

console.log(chatCompletion.choices[0].message);
```

</hfoption>

<hfoption id="openai">

If you're already using OpenAI's Javascript client, then you need a **drop-in OpenAI replacement**. Just swap-out the base URL to instantly access hundreds of additional open-weights models through our provider network.

By default, our system automatically selects the fastest available provider for the specified model (equivalent to the `:fastest` policy — highest throughput in tokens per second).

You can change the provider selection policy by appending a policy suffix to the model id: `:cheapest` for the most cost-efficient provider (lowest price per output token), or `:preferred` to follow your preference order in [Inference Provider settings](https://hf.co/settings/inference-providers). For example, `openai/gpt-oss-120b:cheapest`.

You can also select the provider of your choice by appending the provider name to the model id (e.g. `"openai/gpt-oss-120b:sambanova"`).

```javascript
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HF_TOKEN,
});

const completion = await client.chat.completions.create({
  model: "openai/gpt-oss-120b:fastest",
  messages: [
    {
      role: "user",
      content: "How many 'G's in 'huggingface'?",
    },
  ],
});

console.log(completion.choices[0].message.content);
```

</hfoption>

<hfoption id="fetch">

For lightweight applications or custom implementations, use our REST API directly with standard fetch.

By default, our system automatically selects the fastest available provider for the specified model (equivalent to the `:fastest` policy — highest throughput in tokens per second).

You can change the provider selection policy by appending a policy suffix to the model id: `:cheapest` for the most cost-efficient provider (lowest price per output token), or `:preferred` to follow your preference order in [Inference Provider settings](https://hf.co/settings/inference-providers). For example, `openai/gpt-oss-120b:cheapest`.

You can also select the provider of your choice by appending the provider name to the model id (e.g. `"openai/gpt-oss-120b:sambanova"`).

```js
import fetch from "node-fetch";

const response = await fetch(
  "https://router.huggingface.co/v1/chat/completions",
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.HF_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "openai/gpt-oss-120b:fastest",
      messages: [
        {
          role: "user",
          content: "How many 'G's in 'huggingface'?",
        },
      ],
    }),
  }
);
console.log(await response.json());
```

</hfoption>

</hfoptions>

#### HTTP / cURL

For testing, debugging, or integrating with any HTTP client, here's the raw REST API format.

By default, our system automatically selects the fastest available provider for the specified model (equivalent to the `:fastest` policy — highest throughput in tokens per second).

You can change the provider selection policy by appending a policy suffix to the model id: `:cheapest` for the most cost-efficient provider (lowest price per output token), or `:preferred` to follow your preference order in [Inference Provider settings](https://hf.co/settings/inference-providers). For example, `openai/gpt-oss-120b:cheapest`.

You can also select the provider of your choice by appending the provider name to the model id (e.g. `"openai/gpt-oss-120b:sambanova"`).

```bash
curl https://router.huggingface.co/v1/chat/completions \
    -H "Authorization: Bearer $HF_TOKEN" \
    -H 'Content-Type: application/json' \
    -d '{
        "messages": [
            {
                "role": "user",
                "content": "How many G in huggingface?"
            }
        ],
        "model": "openai/gpt-oss-120b:fastest",
        "stream": false
    }'
```

### Quick Start - Text-to-Image Generation

Let's explore how to generate images from text prompts using Inference Providers. We'll use [black-forest-labs/FLUX.1-dev](https://huggingface.co/black-forest-labs/FLUX.1-dev), a state-of-the-art diffusion model that produces highly detailed, photorealistic images.

#### Python

Use the `huggingface_hub` library for the simplest image generation experience with automatic provider selection:

```python
import os
from huggingface_hub import InferenceClient

client = InferenceClient(api_key=os.environ["HF_TOKEN"])

image = client.text_to_image(
    prompt="A serene lake surrounded by mountains at sunset, photorealistic style",
    model="black-forest-labs/FLUX.1-dev"
)

# Save the generated image
image.save("generated_image.png")
```

#### JavaScript

Use our JavaScript SDK for streamlined image generation with TypeScript support:

```js
import { InferenceClient } from "@huggingface/inference";
import fs from "fs";

const client = new InferenceClient(process.env.HF_TOKEN);

const imageBlob = await client.textToImage({
  model: "black-forest-labs/FLUX.1-dev",
  inputs:
    "A serene lake surrounded by mountains at sunset, photorealistic style",
});

// Save the image
const buffer = Buffer.from(await imageBlob.arrayBuffer());
fs.writeFileSync("generated_image.png", buffer);
```

## Provider Selection

The Inference Providers API acts as a unified proxy layer that sits between your application and multiple AI providers. Understanding how provider selection works is crucial for optimizing performance, cost, and reliability in your applications.

### API as a Proxy Service

When using Inference Providers, your requests go through Hugging Face's proxy infrastructure, which provides several key benefits:

- **Unified Authentication & Billing**: Use a single Hugging Face token for all providers
- **Automatic Failover**: When using automatic provider selection (`provider="auto"`), requests are automatically routed to alternative providers if the primary provider is flagged as unavailable by our validation system
- **Consistent Interface through client libraries**: When using our client libraries, the same request format works across different providers

Because the API acts as a proxy, the exact HTTP request may vary between providers as each provider has their own API requirements and response formats. **When using our official client libraries** (JavaScript or Python), these provider-specific differences are handled automatically whether you use `provider="auto"` or specify a particular provider.

### Client-Side Provider Selection (Inference Clients)

When using the Hugging Face inference clients (JavaScript or Python), you can explicitly specify a provider or let the system choose automatically. The client then formats the HTTP request to match the selected provider's API requirements.

<hfoptions id="client-side-provider-selection">

<hfoption id="javascript">

```javascript
import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient(process.env.HF_TOKEN);

// Explicit provider selection
await client.chatCompletion({
  model: "deepseek-ai/DeepSeek-R1",
  provider: "sambanova", // Specific provider
  messages: [{ role: "user", content: "Hello!" }],
});

// Automatic provider selection (default: "auto")
await client.chatCompletion({
  model: "deepseek-ai/DeepSeek-R1",
  // Defaults to "auto" selection of the provider
  // provider="auto",
  messages: [{ role: "user", content: "Hello!" }],
});
```

</hfoption>

<hfoption id="python">

```python
import os
from huggingface_hub import InferenceClient

client = InferenceClient(token=os.environ["HF_TOKEN"])

# Explicit provider selection
result = client.chat_completion(
    model="deepseek-ai/DeepSeek-R1",
    provider="sambanova",  # Specific provider
    messages=[{"role": "user", "content": "Hello!"}],
)

# Automatic provider selection (default: "auto")
result = client.chat_completion(
    model="deepseek-ai/DeepSeek-R1",
    # Defaults to "auto" selection of the provider
    # provider="auto",
    messages=[{"role": "user", "content": "Hello!"}],
)
```

</hfoption>

</hfoptions>

**Provider Selection Policy:**

- `provider: "auto"` (default): Selects the fastest available provider for the model (highest throughput in tokens per second), equivalent to the `:fastest` policy.
- `provider: "specific-provider"`: Forces use of a specific provider (e.g., "together", "replicate", "fal-ai", ...).

### Alternative: OpenAI-Compatible Chat Completions Endpoint (Chat Only)

If you prefer to work with familiar OpenAI APIs or want to migrate existing chat completion code with minimal changes, we offer a drop-in compatible endpoint that handles all provider selection automatically on the server side.

By default, the fastest available provider is selected for the model (highest throughput in tokens per second). This is equivalent to appending `:fastest` to the model name.
You can change that policy by adding a suffix to the model name:

- `:cheapest` selects the most cost-efficient provider for the model (lowest price per output tokens)
- `:preferred` selects the first available provider sorted by your preference order in [Inference Provider settings](https://hf.co/settings/inference-providers)

**Note**: This OpenAI-compatible endpoint is currently available for chat completion tasks only. For other tasks like text-to-image, embeddings, or speech processing, use the Hugging Face inference clients shown above.

<hfoptions id="openai-compatible">

<hfoption id="javascript">

```javascript
import { OpenAI } from "openai";

const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HF_TOKEN,
});

const completion = await client.chat.completions.create({
  model: "deepseek-ai/DeepSeek-R1:fastest",
  messages: [{ role: "user", content: "Hello!" }],
});
```

</hfoption>

<hfoption id="python">

```python
import os
from openai import OpenAI

client = OpenAI(
    base_url="https://router.huggingface.co/v1",
    api_key=os.environ["HF_TOKEN"],
)

completion = client.chat.completions.create(
    model="deepseek-ai/DeepSeek-R1:fastest",
    messages=[{"role": "user", "content": "Hello!"}],
)

print(completion.choices[0].message.content)
```

</hfoption>

</hfoptions>

This endpoint can also be requested through direct HTTP access, making it suitable for integration with various HTTP clients and applications that need to interact with the chat completion service directly.

```bash
curl https://router.huggingface.co/v1/chat/completions \
  -H "Authorization: Bearer $HF_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "deepseek-ai/DeepSeek-R1:fastest",
    "messages": [
      {
        "role": "user",
        "content": "Hello!"
      }
    ]
  }'
```

**Key Features:**

- **Server-Side Provider Selection**: The server automatically selects the fastest available provider by default (`:fastest` policy)
- **Model Listing**: GET `/v1/models` returns available models across all providers, including per-provider pricing, context length, latency, and throughput when available
- **OpenAI SDK Compatibility**: Works with existing OpenAI client libraries
- **Chat Tasks Only**: Limited to conversational workloads

### Choosing the Right Approach

**Use Inference Clients when:**

- You need support for all task types (text-to-image, speech, embeddings, etc.)
- You want explicit control over provider selection
- You're building applications that use multiple AI tasks

**Use OpenAI-Compatible Endpoint when:**

- You're only doing chat completions
- You want to migrate existing OpenAI-based code with minimal changes
- You prefer server-side provider management

**Use Direct HTTP when:**

- You're implementing custom request logic
- You need fine-grained control over the request/response cycle
- You're working in environments without available client libraries

## Next Steps

Now that you understand the basics, explore these resources to make the most of Inference Providers:

- **[Announcement Blog Post](https://huggingface.co/blog/inference-providers)**: Learn more about the launch of Inference Providers
- **[Pricing and Billing](./pricing)**: Understand costs and billing of Inference Providers
- **[Hub Integration](./hub-integration)**: Learn how Inference Providers are integrated with the Hugging Face Hub
- **[Register as a Provider](./register-as-a-provider)**: Requirements to join our partner network as a provider
- **[Hub API](./hub-api)**: Advanced API features and configuration
- **[API Reference](./tasks/index)**: Complete parameter documentation for all supported tasks
