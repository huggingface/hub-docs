<script lang="ts">
import type { PipelineType } from '../../interfaces/Types';

import { PIPELINE_DATA } from '../../interfaces/Types';
import PipelineIcon from '../PipelineIcon/PipelineIcon.svelte';

export let classNames = '';
export let pipeline = '';

$: pipelineName = pipeline ? PIPELINE_DATA[<PipelineType>pipeline]?.name ?? pipeline : pipeline;
</script>

<div class="inline-flex items-center {classNames}">
	<PipelineIcon classNames="mr-1" {pipeline} />
	<span>
		{pipelineName}
	</span>
</div>
