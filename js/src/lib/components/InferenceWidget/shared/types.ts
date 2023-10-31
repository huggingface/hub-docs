import type { ModelData } from "../../../interfaces/Types";
import type { WidgetExampleOutput } from "./WidgetExample";

export interface WidgetProps {
	apiToken?:          string;
	apiUrl:             string;
	callApiOnMount:     boolean;
	model:              ModelData;
	noTitle:            boolean;
	shouldUpdateUrl:    boolean;
	includeCredentials: boolean;
	isLoggedIn?:        boolean;
}

export interface InferenceRunOpts<TOutput = WidgetExampleOutput> {
	withModelLoading?: boolean;
	isOnLoadCall?:     boolean;
	useCache?:         boolean;
	exampleOutput?:    TOutput;
}

export interface ExampleRunOpts {
	isPreview?:     boolean;
	inferenceOpts?: InferenceRunOpts;
}

export type LoadState = "Loadable" | "Loaded" | "TooBig" | "error";

export type ComputeType = "cpu" | "gpu";

export interface ModelLoadInfo {
	state:         LoadState;
	compute_type?: ComputeType;
}

export type TableData = Record<string, (string | number)[]>;

export type HighlightCoordinates = Record<string, string>;

interface Box {
	xmin: number;
	ymin: number;
	xmax: number;
	ymax: number;
}

export interface DetectedObject {
	box:    Box;
	label:  string;
	score:  number;
	color?: string;
}
export interface ImageSegment {
	label:    string;
	score:    number;
	mask:     string;
	color?:   string;
	imgData?: ImageData;
	bitmap?:  ImageBitmap;
}
