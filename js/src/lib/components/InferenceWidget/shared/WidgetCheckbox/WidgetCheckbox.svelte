<script lang="ts">
	import WidgetLabel from "../WidgetLabel/WidgetLabel.svelte";

	export let classNames = "";
	export let checked: boolean;
	export let label: string;
</script>

<WidgetLabel classNames="inline-flex items-center {classNames}" {label}>
	<svelte:fragment slot="before">
		<input
			bind:checked
			class="rounded bg-gray-200 dark:bg-gray-700 border-transparent text-blue-500 focus:ring-1 focus:ring-offset-2 focus:ring-blue-200 dark:focus:ring-gray-500 dark:focus:ring-offset-gray-925 cursor-pointer checked:bg-blue-500 dark:checked:bg-blue-500 mr-2"
			type="checkbox"
		/>
	</svelte:fragment>
</WidgetLabel>
