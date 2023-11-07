<script lang="ts">
	import type { ExampleRunOpts, WidgetInput } from "../../shared/types";
	import type { WidgetExample, WidgetExampleAssetInput } from "../../shared/WidgetExample";

	import WidgetAudioTrack from "../../shared/WidgetAudioTrack/WidgetAudioTrack.svelte";
	import WidgetFileInput from "../../shared/WidgetFileInput/WidgetFileInput.svelte";
	import WidgetRecorder from "../../shared/WidgetRecorder/WidgetRecorder.svelte";
	import WidgetSubmitBtn from "../../shared/WidgetSubmitBtn/WidgetSubmitBtn.svelte";
	import { getBlobFromUrl } from "../../shared/helpers";
	import { createEventDispatcher } from "svelte";

	export let isDisabled = false;
	export let isLoading = false;

	let error: string = "";
	let file: Blob | File | null = null;
	let filename: string = "";
	let fileUrl: string;
	let isRecording = false;
	let selectedSampleUrl = "";
	let warning: string = "";

	function onRecordStart() {
		file = null;
		filename = "";
		fileUrl = "";
		isRecording = true;
	}

	function onRecordError(err: string) {
		error = err;
	}

	function onSelectFile(updatedFile: Blob | File) {
		isRecording = false;
		selectedSampleUrl = "";

		if (updatedFile.size !== 0) {
			const date = new Date();
			const time = date.toLocaleTimeString("en-US");
			filename = "name" in updatedFile ? updatedFile.name : `Audio recorded from browser [${time}]`;
			file = updatedFile;
			fileUrl = URL.createObjectURL(file);
		}
	}

	const dispatch = createEventDispatcher<{ click: void }>();

	export const widgetInput: WidgetInput = {
		validateExample<TOutput>(sample: WidgetExample<TOutput>): sample is WidgetExampleAssetInput<TOutput> {
			return "src" in sample;
		},
		applyExample(sample: WidgetExampleAssetInput, opts: ExampleRunOpts) {
			filename = sample.example_title!;
			fileUrl = sample.src;
			if (opts.isPreview) {
				return;
			}
			file = null;
			selectedSampleUrl = sample.src;
		},
		async getInferenceInput() {
			if (!file && !selectedSampleUrl) {
				error = "You must select or record an audio file";
				return;
			}

			if (!file && selectedSampleUrl) {
				file = await getBlobFromUrl(selectedSampleUrl);
			}

			const requestBody = { file };
			return requestBody;
		},
	};
</script>

<form>
	<div class="flex flex-wrap items-center {isDisabled ? 'pointer-events-none hidden opacity-50' : ''}">
		<WidgetFileInput accept="audio/*" classNames="mt-1.5 mr-2" {onSelectFile} />
		<span class="mr-2 mt-1.5">or</span>
		<WidgetRecorder classNames="mt-1.5" {onRecordStart} onRecordStop={onSelectFile} onError={onRecordError} />
	</div>
	{#if fileUrl}
		<WidgetAudioTrack classNames="mt-3" label={filename} src={fileUrl} />
	{/if}
	<WidgetSubmitBtn
		classNames="mt-2"
		isDisabled={isRecording || isDisabled}
		{isLoading}
		onClick={() => {
			dispatch("click");
		}}
	/>
	{#if warning}
		<div class="alert alert-warning mt-2">{warning}</div>
	{/if}
</form>
