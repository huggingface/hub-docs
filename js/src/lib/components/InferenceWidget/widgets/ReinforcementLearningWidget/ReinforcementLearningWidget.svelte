<script lang="ts">
	import type { WidgetProps } from "../../shared/types";
	import { onMount } from "svelte";
	import IconSpin from "../../../Icons/IconSpin.svelte";
	import WidgetHeader from "../../shared/WidgetHeader/WidgetHeader.svelte";

	export let apiToken: WidgetProps["apiToken"];
	export let model: WidgetProps["model"];

	enum Replay {
		Loading,
		Available,
		Unavailable,
	}

	let replay = Replay.Loading;
	let replaySrc = "";

	function doesReplayExist() {
		// check if repository has `replay.mp4` file
		replaySrc = `/${model.id}/resolve/main/replay.mp4`;
		const xhr = new XMLHttpRequest();
		xhr.open("HEAD", replaySrc, false);
		xhr.send();
		return xhr.status !== 404;
	}

	onMount(() => {
		replay = doesReplayExist() ? Replay.Available : Replay.Unavailable;
	});
</script>

<!-- 
	WidgetWrapper.svelte component is not used because this pipeline widget (reinforcement-learning)
	does NOT use InferenceAPI (unlike other pipelines widgets)
-->
<div class="flex flex-col w-full max-w-full">
	<WidgetHeader noTitle pipeline="reinforcement-learning" />
	<div class="rounded-lg overflow-hidden w-full">
		{#if replay === Replay.Available}
			<!-- svelte-ignore a11y-media-has-caption -->
			<video class="w-full" src={replaySrc} controls autoplay loop />
		{:else if replay === Replay.Unavailable}
			<div class="opacity-50">
				{#if !!apiToken}
					<span
						>Please push your <code>replay.mp4</code> to be displayed here.</span
					>
				{:else}
					<span>Missing <code>replay.mp4</code> in this repository.</span>
				{/if}
			</div>
		{:else}
			<span class="flex space justify-center items-center"
				><span class="mr-1 opacity-50">loading</span>
				<IconSpin
					classNames="text-purple-400 dark:text-purple-200 animate-spin mt-0.5"
				/>
			</span>
		{/if}
	</div>
</div>
