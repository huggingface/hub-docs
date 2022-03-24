<script lang="ts">
	import type { WidgetProps } from "../../shared/types";
	import WidgetWrapper from "../../shared/WidgetWrapper/WidgetWrapper.svelte";
	export let apiUrl: WidgetProps["apiUrl"];
	export let model: WidgetProps["model"];
	let error: string = "";
	let computeTime = "";
	let isLoading = false;
	let modelLoading = {
		isLoading: false,
		estimatedTime: 0,
	};
	let outputJson: string;
</script>

<WidgetWrapper
	{apiUrl}
	{computeTime}
	{error}
	{isLoading}
	{model}
	{modelLoading}
	noTitle
	noModelInfo
	noFooter
	{outputJson}
>
	<svelte:fragment slot="top">
		<div class="rounded-lg overflow-hidden w-full">
			<!-- svelte-ignore a11y-media-has-caption -->
			<video
				class="w-full"
				src="https://huggingface.co/ThomasSimonini/ppo-LunarLander-v2/resolve/main/output.mp4"
				controls
				autoplay
				loop
			/>
		</div>
	</svelte:fragment>
</WidgetWrapper>
