<script lang="ts">
	import type { ExampleRunOpts, WidgetOutput } from "../../shared/types";
	import type { WidgetExampleAssetInput, WidgetExampleOutputLabels } from "../../shared/WidgetExample";

	import WidgetOutputChart from "../../shared/WidgetOutputChart/WidgetOutputChart.svelte";

	let output: Array<{ label: string; score: number }> = [];

	export const widgetOutput: WidgetOutput = {
		validateExample(arg: unknown): arg is WidgetExampleOutputLabels {
			return Array.isArray(arg) && arg.every(x => typeof x.label === "string" && typeof x.score === "number");
		},
		applyExample(sample: WidgetExampleAssetInput, opts: ExampleRunOpts) {
			output = this.validateExample(sample.output) ? sample.output : []
		},
		validateInferenceOutput(arg: unknown): boolean {
			return Array.isArray(arg) && arg.every(x => typeof x.label === "string" && typeof x.score === "number");
		},
		async showInferenceOutput(body) {
			if (!this.validateInferenceOutput(body)) {
				throw new TypeError("Invalid output: output must be of type Array<label: string, score:number>");
			}
			output = body;
		},
	};
</script>

<WidgetOutputChart classNames="pt-4" {output} />
