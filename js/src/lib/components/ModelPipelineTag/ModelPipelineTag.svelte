<<<<<<< HEAD:widgets/src/lib/ModelPipelineTag/ModelPipelineTag.svelte
<script>
	import { PipelineType } from "$lib/interfaces/Types";
=======
<script lang="ts">
	import { PipelineType } from "../../interfaces/Types";
>>>>>>> 4ecdf28d (Shared components directory (#579)):js/src/lib/components/ModelPipelineTag/ModelPipelineTag.svelte
	import ModelPipelineIcon from "../ModelPipelineIcon/ModelPipelineIcon.svelte";

	export let pipeline = "";
</script>

<div class="inline-flex items-center">
	<ModelPipelineIcon classNames="mr-1" {pipeline} />
	<span>
		{PipelineType[pipeline] ?? pipeline}
	</span>
</div>
