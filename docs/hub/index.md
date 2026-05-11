# Hugging Face Hub documentation

The Hugging Face Hub is the reference AI platform for open ML. It hosts over 2M models, 1.5M datasets, and 1.5M AI apps (Spaces), all open and publicly available. Beyond open AI, the Hub is also a great collaboration platform for internal and private teams. Explore, experiment, collaborate, and build, all in one place! 🤗

<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:mt-10 not-prose">

<div class="group flex flex-col space-y-1 rounded-xl border border-purple-100 bg-linear-to-br from-purple-50 dark:from-purple-500/10 px-6 py-4 dark:border-gray-850">
<div class="flex items-center py-0.5 text-lg font-semibold text-black dark:text-white mb-2">
<svg class="shrink-0 mr-1.5 text-gray-900 dark:text-white" height="1em" viewBox="0 0 27 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="img"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.555 8.061a4.447 4.447 0 0 0-3.94 2.913l-2.435 7.261c-.52 1.59.465 2.913 2.097 2.913h7.655a4.504 4.504 0 0 0 3.997-2.913l2.35-7.26c.506-1.591-.422-2.914-2.055-2.914H16.555Zm.563 2.913-2.435 7.107h5.024l.507-1.576h-2.955l.393-1.281h2.463l.563-1.548h-2.477l.422-1.168h2.815l.507-1.548h-4.87.057l-.014.014Z" fill="currentColor"/><path d="M15.201 1c1.633 0 2.562 1.337 2.055 2.913l-.738 2.273h-.013l-.05.002a6.326 6.326 0 0 0-5.602 4.142l-.009.024-.009.024-1.248 3.724H3.241c-1.647 0-2.604-1.338-2.112-2.914l2.463-7.275A4.447 4.447 0 0 1 7.532 1h7.67Zm-.309 10.188a4.503 4.503 0 0 1-3.296 2.823l1.019-3.036a4.448 4.448 0 0 1 3.264-2.826l-.987 3.04ZM5.593 5.545h2.928l-1.83 5.488h2.068l.247-.795.246-.795.422-1.266.564-1.548.393-1.084h2.815l.52-1.632h-7.81l-.563 1.632Z" fill="currentColor"/></svg> Subscriptions &  Plans</div>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./pro">PRO subscription</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./enterprise">Team & Enterprise Plans</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./enterprise-sso">Single Sign-On (SSO)</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./audit-logs">Audit Logs</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./storage-regions">Storage Regions</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./enterprise-datasets">Data Studio for Private datasets</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./security-resource-groups">Resource Groups</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./enterprise-advanced-security">Advanced Security</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./enterprise-tokens-management">Tokens Management</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./enterprise-network-security">Network Security</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./rate-limits">Rate Limits</a>
</div>

<div class="group flex flex-col space-y-1 rounded-xl border border-orange-100 bg-linear-to-br from-orange-50 dark:from-orange-500/10 px-6 py-4 dark:border-gray-850">
<div class="flex items-center py-0.5 text-lg font-semibold text-orange-600 dark:text-white mb-2">
 <svg class="shrink-0 mr-1.5 text-orange-500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M2.6 10.59L8.38 4.8l1.69 1.7c-.24.85.15 1.78.93 2.23v5.54c-.6.34-1 .99-1 1.73a2 2 0 0 0 2 2a2 2 0 0 0 2-2c0-.74-.4-1.39-1-1.73V9.41l2.07 2.09c-.07.15-.07.32-.07.5a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2c-.18 0-.35 0-.5.07L13.93 7.5a1.98 1.98 0 0 0-1.15-2.34c-.43-.16-.88-.2-1.28-.09L9.8 3.38l.79-.78c.78-.79 2.04-.79 2.82 0l7.99 7.99c.79.78.79 2.04 0 2.82l-7.99 7.99c-.78.79-2.04.79-2.82 0L2.6 13.41c-.79-.78-.79-2.04 0-2.82Z"></path></svg>Repositories</div>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./repositories-getting-started">Getting Started</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./repositories-settings">Repository Settings</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./storage-limits">Storage Limits</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./xet/index">Storage Backend (Xet)</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./local-cache">Local Cache</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./repositories-pull-requests-discussions">Pull requests and Discussions</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./notifications">Notifications</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./collections">Collections</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./webhooks">Webhooks</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./repositories-next-steps">Next Steps</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./repositories-licenses">Licenses</a>
</div>

<div class="group flex flex-col space-y-1 rounded-xl border border-indigo-100 bg-linear-to-br from-indigo-50 dark:from-indigo-500/10 px-6 py-4 dark:border-gray-850">
<div class="flex items-center py-0.5 text-lg font-semibold text-indigo-600 dark:text-white mb-2">
    <svg class="shrink-0 mr-1.5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path class="uim-quaternary" d="M20.23 7.24L12 12L3.77 7.24a1.98 1.98 0 0 1 .7-.71L11 2.76c.62-.35 1.38-.35 2 0l6.53 3.77c.29.173.531.418.7.71z" opacity=".25" fill="currentColor"></path><path class="uim-tertiary" d="M12 12v9.5a2.09 2.09 0 0 1-.91-.21L4.5 17.48a2.003 2.003 0 0 1-1-1.73v-7.5a2.06 2.06 0 0 1 .27-1.01L12 12z" opacity=".5" fill="currentColor"></path><path class="uim-primary" d="M20.5 8.25v7.5a2.003 2.003 0 0 1-1 1.73l-6.62 3.82c-.275.13-.576.198-.88.2V12l8.23-4.76c.175.308.268.656.27 1.01z" fill="currentColor"></path></svg> Models</div>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./models-the-hub">The Model Hub</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./model-cards">Model Cards</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./eval-results">Eval Results</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./models-gated">Gated Models</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./models-uploading">Uploading Models</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./models-downloading">Downloading Models</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./models-libraries">Libraries</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./models-tasks">Tasks</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./models-widgets">Widgets</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./models-inference">Inference Providers</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./models-download-stats">Download Stats</a>
</div>

<div class="group flex flex-col space-y-1 rounded-xl border border-red-100 bg-linear-to-br from-red-50 dark:from-red-500/10 px-6 py-4 dark:border-gray-850">
<div class="flex items-center py-0.5 text-lg font-semibold text-red-600 dark:text-white mb-2">
<svg class="shrink-0 mr-1.5 text-red-400" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 25 25"><ellipse cx="12.5" cy="5" fill="currentColor" fill-opacity="0.25" rx="7.5" ry="2"></ellipse><path d="M12.5 15C16.6421 15 20 14.1046 20 13V20C20 21.1046 16.6421 22 12.5 22C8.35786 22 5 21.1046 5 20V13C5 14.1046 8.35786 15 12.5 15Z" fill="currentColor" opacity="0.5"></path><path d="M12.5 7C16.6421 7 20 6.10457 20 5V11.5C20 12.6046 16.6421 13.5 12.5 13.5C8.35786 13.5 5 12.6046 5 11.5V5C5 6.10457 8.35786 7 12.5 7Z" fill="currentColor" opacity="0.5"></path><path d="M5.23628 12C5.08204 12.1598 5 12.8273 5 13C5 14.1046 8.35786 15 12.5 15C16.6421 15 20 14.1046 20 13C20 12.8273 19.918 12.1598 19.7637 12C18.9311 12.8626 15.9947 13.5 12.5 13.5C9.0053 13.5 6.06886 12.8626 5.23628 12Z" fill="currentColor"></path></svg> Datasets</div>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./datasets">Introduction</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./datasets-overview">Datasets Overview</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./datasets-cards">Dataset Cards</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./datasets-gated">Gated Datasets</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./datasets-adding">Uploading Datasets</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./datasets-ingesting">Ingesting Datasets</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./datasets-downloading">Downloading Datasets</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./datasets-streaming">Streaming Datasets</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./datasets-editing">Editing Datasets</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./datasets-libraries">Libraries</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./data-studio">Data Studio</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./datasets-download-stats">Download Stats</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./datasets-data-files-configuration">Data files Configuration</a>
</div>

<div class="group flex flex-col space-y-1 rounded-xl border border-blue-100 bg-linear-to-br from-blue-50 dark:from-blue-500/10 px-6 py-4 dark:border-gray-850">
<div class="flex items-center py-0.5 text-lg font-semibold text-blue-600 dark:text-white mb-2">
<svg class="shrink-0 mr-1.5 text-blue-500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" role="img" width="1em" height="1em" viewBox="0 0 25 25"><path opacity=".5" d="M6.016 14.674v4.31h4.31v-4.31h-4.31ZM14.674 14.674v4.31h4.31v-4.31h-4.31ZM6.016 6.016v4.31h4.31v-4.31h-4.31Z" fill="currentColor"></path><path opacity=".75" fill-rule="evenodd" clip-rule="evenodd" d="M3 4.914C3 3.857 3.857 3 4.914 3h6.514c.884 0 1.628.6 1.848 1.414a5.171 5.171 0 0 1 7.31 7.31c.815.22 1.414.964 1.414 1.848v6.514A1.914 1.914 0 0 1 20.086 22H4.914A1.914 1.914 0 0 1 3 20.086V4.914Zm3.016 1.102v4.31h4.31v-4.31h-4.31Zm0 12.968v-4.31h4.31v4.31h-4.31Zm8.658 0v-4.31h4.31v4.31h-4.31Zm0-10.813a2.155 2.155 0 1 1 4.31 0 2.155 2.155 0 0 1-4.31 0Z" fill="currentColor"></path><path opacity=".25" d="M16.829 6.016a2.155 2.155 0 1 0 0 4.31 2.155 2.155 0 0 0 0-4.31Z" fill="currentColor"></path></svg> Spaces</div>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./spaces">Introduction</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./spaces-overview">Spaces Overview</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./spaces-sdks-gradio">Gradio Spaces</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./spaces-sdks-static">Static HTML Spaces</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./spaces-sdks-docker">Docker Spaces</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./spaces-zerogpu">ZeroGPU Spaces</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./spaces-embed">Embed your Space</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./spaces-run-with-docker">Run with Docker</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./spaces-config-reference">Reference</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./spaces-advanced">Advanced Topics</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./spaces-oauth">Sign in with HF</a>
</div>

<div class="group flex flex-col space-y-1 rounded-xl border border-blue-100 bg-linear-to-br from-blue-50 dark:from-blue-500/10 px-6 py-4 dark:border-gray-850">
<div class="flex items-center py-0.5 text-lg font-semibold text-blue-600 dark:text-white mb-2">
<svg class="shrink-0 mr-1.5 text-blue-500" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 48 48" fill="none"><path opacity="0.25" d="M36 4H12C7.58172 4 4 7.58172 4 12V36C4 40.4183 7.58172 44 12 44H36C40.4183 44 44 40.4183 44 36V12C44 7.58172 40.4183 4 36 4Z" fill="currentColor"/><path opacity="0.5" d="M31 11H17C13.6863 11 11 13.6863 11 17V31C11 34.3137 13.6863 37 17 37H31C34.3137 37 37 34.3137 37 31V17C37 13.6863 34.3137 11 31 11Z" fill="currentColor"/><path d="M27 18H21C19.3431 18 18 19.3431 18 21V27C18 28.6569 19.3431 30 21 30H27C28.6569 30 30 28.6569 30 27V21C30 19.3431 28.6569 18 27 18Z" fill="currentColor"/></svg> Storage Buckets <span class="ml-1 rounded-sm bg-blue-500/10 px-1 text-xs leading-tight text-blue-700 dark:text-blue-200">new</span></div>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./storage-buckets">Introduction</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./storage-buckets#buckets-vs-repositories">Buckets vs Git Repositories</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./storage-buckets#creating-a-bucket">Creating a Bucket</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./storage-buckets#managing-files">Managing Files</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./storage-buckets#use-cases">Use Cases</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./storage-buckets-security">Security & Compliance</a>
</div>

<div class="group flex flex-col space-y-1 rounded-xl border border-teal-100 bg-linear-to-br from-teal-50 dark:from-teal-500/10 px-6 py-4 dark:border-gray-850">
<div class="flex items-center py-0.5 text-lg font-semibold text-teal-600 dark:text-white mb-2">
<svg class="shrink-0 mr-1.5 text-teal-500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 18 18" fill="currentColor"><path d="M6.66667 12.4352V4.93521L11.6667 8.68521L6.66667 12.4352ZM8.33333 0.351877C7.23898 0.351877 6.15535 0.567425 5.1443 0.986215C4.13326 1.405 3.2146 2.01883 2.44078 2.79265C0.877974 4.35546 0 6.47507 0 8.68521C0 10.8953 0.877974 13.015 2.44078 14.5778C3.2146 15.3516 4.13326 15.9654 5.1443 16.3842C6.15535 16.803 7.23898 17.0185 8.33333 17.0185C10.5435 17.0185 12.6631 16.1406 14.2259 14.5778C15.7887 13.015 16.6667 10.8953 16.6667 8.68521C16.6667 7.59086 16.4511 6.50723 16.0323 5.49618C15.6135 4.48514 14.9997 3.56648 14.2259 2.79265C13.4521 2.01883 12.5334 1.405 11.5224 0.986215C10.5113 0.567425 9.42768 0.351877 8.33333 0.351877Z"></path></svg> Jobs</div>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./jobs">Introduction</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./jobs-overview">Jobs Overview</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./jobs-quickstart">Quickstart</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./jobs-pricing">Pricing</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./jobs-manage">Manage Jobs</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./jobs-configuration">Jobs Configuration</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./jobs-popular-images">Popular images</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./jobs-schedule">Schedule Jobs</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./jobs-webhooks">Webhooks Automation</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./jobs-reference">Reference</a>
</div>

<div class="group flex flex-col space-y-1 rounded-xl border border-cyan-100 bg-linear-to-br from-cyan-50 dark:from-cyan-500/10 px-6 py-4 dark:border-gray-850">
<div class="flex items-center py-0.5 text-lg font-semibold text-cyan-600 dark:text-white mb-2">
<svg class="shrink-0 mr-1.5 text-cyan-500" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="img" width="1em" height="1em" viewBox="0 0 12 12" fill="currentColor"><rect width="9.491" height="2.438" x="1.254" y="8.845" fill="currentColor" opacity=".5" rx="1.219"/><path fill="currentColor" d="M8.068 3.07a2.678 2.678 0 0 1 0 5.355H3.932a2.678 2.678 0 0 1 0-5.355h1.652v.412a.343.343 0 0 0 .684 0V3.07zM4.412 4.85a.898.898 0 1 0 0 1.796.898.898 0 0 0 0-1.795m3.177 0a.898.898 0 1 0 0 1.796.898.898 0 0 0 0-1.795"/><path fill="currentColor" d="M6.269 3.48a.342.342 0 0 1-.684 0V2.353a.9.9 0 0 0 .684 0z" opacity=".25"/><circle cx="5.927" cy="1.526" r=".894" fill="currentColor"/></svg> Agents</div>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./agents">Introduction</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./agents-overview">Agents Overview</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./agents-cli">Hugging Face CLI for AI Agents</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./agents-mcp">Hugging Face MCP Server</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./agents-skills">Hugging Face Agent Skills</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./agents-sdk">Building agents with the HF SDK</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./agents-local">Local Agents</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./agents-libraries">Agent Libraries</a>
</div>

<div class="group flex flex-col space-y-1 rounded-xl border border-green-100 bg-linear-to-br from-green-50 dark:from-green-500/10 px-6 py-4 dark:border-gray-850">
<div class="flex items-center py-0.5 text-lg font-semibold text-green-600 dark:text-white mb-2">
<svg class="shrink-0 mr-1.5 text-green-500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" role="img" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" stroke="currentColor" d="M8.892 21.854a6.25 6.25 0 0 1-4.42-10.67l7.955-7.955a4.5 4.5 0 0 1 6.364 6.364l-6.895 6.894a2.816 2.816 0 0 1-3.89 0a2.75 2.75 0 0 1 .002-3.888l5.126-5.127a1 1 0 1 1 1.414 1.414l-5.126 5.127a.75.75 0 0 0 0 1.06a.768.768 0 0 0 1.06 0l6.895-6.894a2.503 2.503 0 0 0 0-3.535a2.56 2.56 0 0 0-3.536 0l-7.955 7.955a4.25 4.25 0 1 0 6.01 6.01l6.188-6.187a1 1 0 1 1 1.414 1.414l-6.187 6.186a6.206 6.206 0 0 1-4.42 1.832z"></path></svg> Other</div>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./organizations">Organizations</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./billing">Billing</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./security">Security</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./moderation">Moderation</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./paper-pages">Paper Pages</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./search">Search</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./doi">Digital Object Identifier (DOI)</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./api">Hub API Endpoints</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="./oauth">Sign in with HF</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="https://huggingface.co/code-of-conduct">Contributor Code of Conduct</a>
<a class="no-underline! transform transition-colors hover:translate-x-px text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" href="https://huggingface.co/content-guidelines">Content Guidelines</a>
</div>

</div>

## What's the Hugging Face Hub?

We are helping the community work together towards the goal of advancing Machine Learning 🔥.

No single company, including the Tech Titans, will be able to “solve AI” by themselves – the only way we'll achieve this is by sharing knowledge and resources in a community-centric approach. We are building the largest open-source collection of models, datasets, and demos on the Hugging Face Hub to democratize and advance ML for everyone 🚀.

We encourage you to read the [Code of Conduct](https://huggingface.co/code-of-conduct) and the [Content Guidelines](https://huggingface.co/content-guidelines) to familiarize yourself with the values that we expect our community members to uphold 🤗.

## What can you find on the Hub?

The Hugging Face Hub hosts Git-based repositories, which are version-controlled folders that can contain all your files. For non-versioned, mutable object storage, the Hub also offers [Storage Buckets](./storage-buckets).

On it, you'll be able to upload and discover...

- Models: _hosting the latest state-of-the-art models for LLM, text, vision, and audio tasks_
- Datasets: _featuring a wide variety of data for different domains and modalities_
- Spaces: _interactive apps for demonstrating ML models directly in your browser_

The Hub offers **versioning, commit history, diffs, branches, and over a dozen library integrations**! 
All repositories build on [Xet](./xet/index), a new technology to efficiently store Large Files inside Git, intelligently splitting files into unique chunks and accelerating uploads and downloads.

You can learn more about the features that all repositories share in the [**Repositories documentation**](./repositories).

## Models

You can discover and use dozens of thousands of open-source ML models shared by the community. To promote responsible model usage and development, model repos are equipped with [Model Cards](./model-cards) to inform users of each model's limitations and biases. Additional [metadata](./model-cards#model-card-metadata) about info such as their tasks, languages, and evaluation results can be included, with training metrics charts even added if the repository contains [TensorBoard traces](./tensorboard). It's also easy to add an [**inference widget**](./models-widgets) to your model, allowing anyone to play with the model directly in the browser! For programmatic access, a serverless API is provided by [**Inference Providers**](./models-inference).

To upload models to the Hub, or download models and integrate them into your work, explore the [**Models documentation**](./models). You can also choose from [**over a dozen libraries**](./models-libraries) such as 🤗 Transformers, Asteroid, and ESPnet that support the Hub.

## Datasets

The Hub is home to over 500k public datasets in more than 8k languages that can be used for a broad range of tasks across NLP, Computer Vision, and Audio. The Hub makes it simple to find, download, and upload datasets. Datasets are accompanied by extensive documentation in the form of [**Dataset Cards**](./datasets-cards) and [**Data Studio**](./datasets-viewer) to let you explore the data directly in your browser. While many datasets are public, [**organizations**](./organizations) and individuals can create private datasets to comply with licensing or privacy issues. You can learn more about [**Datasets here on the Hugging Face Hub documentation**](./datasets-overview).

The [🤗 `datasets`](https://huggingface.co/docs/datasets/index) library allows you to programmatically interact with the datasets, so you can easily use datasets from the Hub in your projects. With a single line of code, you can access the datasets; even if they are so large they don't fit in your computer, you can use streaming to efficiently access the data.

## Spaces

[Spaces](https://huggingface.co/spaces) is a simple way to host ML demo apps on the Hub. They allow you to build your ML portfolio, showcase your projects at conferences or to stakeholders, and work collaboratively with other people in the ML ecosystem.

We currently support two awesome Python SDKs (**[Gradio](https://gradio.app/)** and **[Streamlit](./spaces-sdks-streamlit)**) that let you build cool apps in a matter of minutes. Users can also create static Spaces, which are simple HTML/CSS/JavaScript pages, or deploy any Docker-based application.

If you need GPU power for your demos, try [**ZeroGPU**](./spaces-zerogpu): it dynamically provides NVIDIA H200 GPUs, in real-time, only when needed.

After you've explored a few Spaces (take a look at our [Space of the Week!](https://huggingface.co/spaces)), dive into the [**Spaces documentation**](./spaces-overview) to learn all about how you can create your own Space. You'll also be able to upgrade your Space to run on a GPU or other accelerated hardware. ⚡️

## Storage Buckets

[Storage Buckets](./storage-buckets) provide S3-like object storage on Hugging Face, powered by the Xet storage backend. Unlike repositories (which are git-based and track file history), buckets are remote object storage containers designed for large-scale files with content-addressable deduplication. They are designed for use cases where you need simple, fast, mutable storage such as storing training checkpoints, logs, intermediate artifacts, or any large collection of files that doesn’t need version control.

## Organizations

Companies, universities and non-profits are an essential part of the Hugging Face community! The Hub offers [**Organizations**](./organizations), which can be used to group accounts and manage datasets, models, and Spaces. Educators can also create collaborative organizations for students using [Hugging Face for Classrooms](https://huggingface.co/classrooms). An organization's repositories will be featured on the organization’s page and every member of the organization will have the ability to contribute to the repository. In addition to conveniently grouping all of an organization's work, the Hub allows admins to set roles to [**control access to repositories**](./organizations-security), and manage their organization's [payment method and billing info](https://huggingface.co/pricing). Machine Learning is more fun when collaborating! 🔥

[Explore existing organizations](https://huggingface.co/organizations), create a new organization [here](https://huggingface.co/organizations/new), and then visit the [**Organizations documentation**](./organizations) to learn more.

## Security

The Hugging Face Hub supports security and access control features to give you the peace of mind that your code, models, and data are safe. Visit the [**Security**](./security) section in these docs to learn about:

- User Access Tokens
- Access Control for Organizations
- Signing commits with GPG
- Malware scanning

<img width="150" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/security-soc-1.jpg">
