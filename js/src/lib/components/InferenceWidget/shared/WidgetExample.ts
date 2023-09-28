import type { TableData } from "./types";

//#region outputs
export type WidgetExampleOutputLabels = Array<{ label: string; score: number; }>;
export interface WidgetExampleOutputAnswerScore {
	answer: string;
	score:  number;
}
export interface WidgetExampleOutputText {
	text: string;
}
export interface WidgetExampleOutputUrl {
	url: string;
}
//#endregion

export interface WidgetExampleBase {
	example_title?: string;
	group?:         string;
}

export interface WidgetExampleTextInputLabelsOutput extends WidgetExampleBase {
	text:    string;
	output?: WidgetExampleOutputLabels;
}

export interface WidgetExampleTextAndContextInputAnswerScoreOutput extends WidgetExampleBase {
	text:    string;
	context: string;
	output?: WidgetExampleOutputAnswerScore;
}

export interface WidgetExampleTextInputTextOutput extends WidgetExampleBase {
	text:    string;
	output?: WidgetExampleOutputText;
}

export interface WidgetExampleTextInputUrlOutput extends WidgetExampleBase {
	text:    string;
	output?: WidgetExampleOutputUrl;
}

export interface WidgetExampleAssetInputLabelsOutput extends WidgetExampleBase {
	src:     string;
	output?: WidgetExampleOutputLabels;
}

export interface WidgetExampleAssetInputTextOutput extends WidgetExampleBase {
	src:     string;
	output?: WidgetExampleOutputText;
}

export interface WidgetExampleAssetInputUrlOutput extends WidgetExampleBase {
	src:     string;
	output?: WidgetExampleOutputUrl;
}

//#region more exotic stuff
export interface WidgetExampleStructuredDataInputLabelsOutput extends WidgetExampleBase {
	structuredData: TableData;
	output?:        WidgetExampleOutputLabels;
}

export interface WidgetExampleTableDataInputLabelsOutput extends WidgetExampleBase {
	table:   TableData;
	output?: WidgetExampleOutputLabels;
}

export interface WidgetExampleZeroShotTextInputLabelsOutput extends WidgetExampleBase {
	text:             string;
	candidate_labels: string;
	multi_class:      boolean;
	output?:          WidgetExampleOutputLabels;
}

export interface WidgetExampleSentenceSimilarityInputLabelsOutput extends WidgetExampleBase {
	source_sentence: string;
	sentences:       string[];
	output?:         WidgetExampleOutputLabels;
}
//#endregion

export type WidgetExample =
	| WidgetExampleTextInputLabelsOutput
	| WidgetExampleTextAndContextInputAnswerScoreOutput
	| WidgetExampleTextInputTextOutput
	| WidgetExampleTextInputUrlOutput
	| WidgetExampleAssetInputLabelsOutput
	| WidgetExampleAssetInputTextOutput
	| WidgetExampleAssetInputUrlOutput
	| WidgetExampleStructuredDataInputLabelsOutput
	| WidgetExampleTableDataInputLabelsOutput
	| WidgetExampleZeroShotTextInputLabelsOutput
	| WidgetExampleSentenceSimilarityInputLabelsOutput;
