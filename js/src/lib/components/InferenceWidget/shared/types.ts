import type { ModelData } from '../../../interfaces/Types';

export interface WidgetProps {
	apiToken?: string;
	apiUrl: string;
	callApiOnMount: boolean;
	model: ModelData;
	noTitle: boolean;
	shouldUpdateUrl: boolean;
	includeCredentials: boolean;
	isLoggedIn?: boolean;
	modelLoadInfo?: ModelLoadInfo;
}


export type LoadingStatus = "Loaded" | "Loadable" | "TooBig";

export type ComputeType = "cpu" | "gpu";

export type ModelLoadInfo = {
	loaded:       boolean;
	state:        "Loaded" | "Loadable" | "TooBig";
	compute_type: "cpu" | "gpu";
	framework:    string;
}

export type TableData = Record<string, (string | number)[]>;

export type HighlightCoordinates = Record<string, string>;

type Box = {
	xmin: number;
	ymin: number;
	xmax: number;
	ymax: number;
};

export type DetectedObject = {
	box: Box;
	label: string;
	score: number;
	color?: string;
}
export interface ImageSegment {
	label: string;
	score: number;
	mask: string;
	color?: string;
	imgData?: ImageData;
	bitmap?: ImageBitmap;
};
