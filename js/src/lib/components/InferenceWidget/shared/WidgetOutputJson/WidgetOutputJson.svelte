<script lang="ts">
import type { JSONValue } from '$lib/types';

export let classNames: string;
export let output: JSONValue;
</script>

{#if output}
	<pre class="alert alert-success {classNames}">{output}</pre>
{/if}
