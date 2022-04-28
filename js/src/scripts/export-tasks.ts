import { PIPELINE_DATA } from "../lib/interfaces/Types";

const DISABLE_HIDE_IN_DATASETS = process.argv.slice(2).includes("---no-hide-in-datasets") ?? true;

interface ExportedPipelineData {
	type: string;
	subtasks?: string[];
}

(async () => {
	const tasks = Object.fromEntries(
		Object.entries(PIPELINE_DATA).map(([k, v]) => {
			if (!DISABLE_HIDE_IN_DATASETS && v.hideInDatasets) {
				return;
			}
			// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
			return [k, {
				type:     v.modality,
				subtasks: v.subtasks?.map(sub => sub.type),
			} as ExportedPipelineData];
		})
			.filter((x): x is [string, ExportedPipelineData] => !!x)
			.sort((a, b) => a[0].toString().localeCompare(b[0].toString()))
			/// ^ remove this line when you don't need tasks.json sorted
	);
	
	console.log(JSON.stringify(tasks, null, "    "));
})();
