<script lang="ts">
	import { PIPELINE_DATA } from "../../interfaces/Types";
	import ModelPipelineIcon from "../ModelPipelineIcon/ModelPipelineIcon.svelte";

	export let classNames = "";
	export let pipeline = "";
</script>

<div class="inline-flex items-center {classNames}">
	<ModelPipelineIcon classNames="mr-1" {pipeline} />
	<span>
		{PIPELINE_DATA[pipeline].name ?? pipeline}
	</span>
</div>
