<script lang="ts">
	import WidgetLabel from "../WidgetLabel/WidgetLabel.svelte";

	export let classNames = "";
	export let group: string;
	export let label: string;
	export let onChange: (e: Event) => void = () => null;
	export let value: string;
</script>

<WidgetLabel classNames="inline-flex items-center {classNames}" {label}>
	<svelte:fragment slot="before">
		<input
			bind:group
			class="border-gray-300 dark:border-gray-700 focus:border-gray-300 hover:border-gray-300 focus:ring-1 focus:ring-offset-2 focus:ring-blue-200 dark:focus:ring-gray-500 dark:focus:ring-offset-gray-925 cursor-pointer checked:text-blue-500 mr-2"
			on:change={onChange}
			type="radio"
			{value}
		/>
	</svelte:fragment>
</WidgetLabel>
