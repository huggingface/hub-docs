type TableData = Record<string, (string | number)[]>;

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

export type WidgetExampleOutput =
	| WidgetExampleOutputLabels
	| WidgetExampleOutputAnswerScore
	| WidgetExampleOutputText
	| WidgetExampleOutputUrl;
//#endregion

export interface WidgetExampleBase<TOutput> {
	example_title?: string;
	group?:         string;
	output?:        TOutput;
}

export interface WidgetExampleTextInput<TOutput> extends WidgetExampleBase<TOutput> {
	text: string;
}

export interface WidgetExampleTextAndContextInput<TOutput> extends WidgetExampleBase<TOutput> {
	text:    string;
	context: string;
}

export interface WidgetExampleAssetInput<TOutput> extends WidgetExampleBase<TOutput> {
	src: string;
}

export interface WidgetExampleStructuredDataInput<TOutput> extends WidgetExampleBase<TOutput> {
	structuredData: TableData;
}

export interface WidgetExampleTableDataInput<TOutput> extends WidgetExampleBase<TOutput> {
	table: TableData;
}

export interface WidgetExampleZeroShotTextInput<TOutput> extends WidgetExampleBase<TOutput> {
	text:             string;
	candidate_labels: string;
	multi_class:      boolean;
}

export interface WidgetExampleSentenceSimilarityInput<TOutput> extends WidgetExampleBase<TOutput> {
	source_sentence: string;
	sentences:       string[];
}

//#endregion

export type WidgetExample<TOutput = WidgetExampleOutput> =
	| WidgetExampleTextInput<TOutput>
	| WidgetExampleTextAndContextInput<TOutput>
	| WidgetExampleTextInput<TOutput>
	| WidgetExampleAssetInput<TOutput>
	| WidgetExampleStructuredDataInput<TOutput>
	| WidgetExampleTableDataInput<TOutput>
	| WidgetExampleZeroShotTextInput<TOutput>
	| WidgetExampleSentenceSimilarityInput<TOutput>;
