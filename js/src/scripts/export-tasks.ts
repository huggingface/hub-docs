import { PIPELINE_DATA } from "../lib/interfaces/Types";

(async () => {
	const tasks = Object.fromEntries(
		Object.entries(PIPELINE_DATA).map(([k, v]) => {
			return [k, {
				type:     v.modality,
				subtasks: v.subtasks?.map(sub => sub.type),
			}];
		})
			.sort((a, b) => a[0].toString().localeCompare(b[0].toString()))
			/// ^ remove this line when you don't need tasks.json sorted
	);
	
	console.log(JSON.stringify(tasks, null, "    "));
})();
