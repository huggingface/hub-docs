import type { ModelData } from "../../../interfaces/Types";

export interface WidgetProps {
	accept?:            string;
	apiToken?:          string;
	apiUrl:             string;
	appendRepoPath?:    boolean;
	callApiOnMount:     boolean;
	model:              ModelData;
	noModelLoading?:    boolean;
	noTitle:            boolean;
	shouldUpdateUrl:    boolean;
	includeCredentials: boolean;
	isLoggedIn?:        boolean;
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
