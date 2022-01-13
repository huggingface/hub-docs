<<<<<<< HEAD:widgets/src/lib/InferenceWidget/shared/types.ts
import type { ModelData } from '$lib/interfaces/Types';
=======
import type { ModelData } from '../../../interfaces/Types';
>>>>>>> 4ecdf28d (Shared components directory (#579)):js/src/lib/components/InferenceWidget/shared/types.ts

export interface WidgetProps {
	apiToken?: string;
	apiUrl: string;
	callApiOnMount: boolean;
	model: ModelData;
	noTitle: boolean;
	shouldUpdateUrl: boolean;
}


export type LoadingStatus = "error" | "loaded" | "unknown";
