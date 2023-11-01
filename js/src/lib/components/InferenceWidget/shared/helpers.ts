import type { ModelData } from "../../../interfaces/Types";
import { randomItem, parseJSON } from "../../../utils/ViewUtils";
import type { WidgetExample } from "./WidgetExample";
import type { ModelLoadInfo, TableData } from "./types";
import { LoadState } from "./types";

type KeysOfUnion<T> = T extends any ? keyof T : never;
export type QueryParam = KeysOfUnion<WidgetExample>;
type QueryParamVal = string | null | boolean | (string | number)[][];
const KEYS_TEXT: QueryParam[] = ["text", "context", "candidate_labels"];
const KEYS_TABLE: QueryParam[] = ["table", "structured_data"];

export function getQueryParamVal(key: QueryParam): QueryParamVal {
	const searchParams = new URL(window.location.href).searchParams;
	const value = searchParams.get(key);
	if (KEYS_TEXT.includes(key)) {
		return value;
	} else if (KEYS_TABLE.includes(key)) {
		const table = convertDataToTable((parseJSON(value) as TableData) ?? {});
		return table;
	} else if (key === "multi_class") {
		return value === "true";
	}
	return value;
}

export function getWidgetExample<TWidgetExample extends WidgetExample>(
	model: ModelData,
	validateExample: (sample: WidgetExample) => sample is TWidgetExample
): TWidgetExample | undefined {
	const validExamples = model.widgetData?.filter(
		(sample): sample is TWidgetExample => sample && validateExample(sample)
	);
	return validExamples?.length ? randomItem(validExamples) : undefined;
}

// Update current url search params, keeping existing keys intact.
export function updateUrl(obj: Partial<Record<QueryParam, string | undefined>>): void {
	if (!window) {
		return;
	}

	const sp = new URL(window.location.href).searchParams;
	for (const [k, v] of Object.entries(obj)) {
		if (v === undefined) {
			sp.delete(k);
		} else {
			sp.set(k, v);
		}
	}
	const path = `${window.location.pathname}?${sp.toString()}`;
	window.history.replaceState(null, "", path);
}

// Run through our own proxy to bypass CORS:
function proxify(url: string): string {
	return url.startsWith(`http://localhost`) || new URL(url).host === window.location.host
		? url
		: `https://widgets.hf.co/proxy?url=${url}`;
}

// Get BLOB from a given URL after proxifying the URL
export async function getBlobFromUrl(url: string): Promise<Blob> {
	const proxiedUrl = proxify(url);
	const res = await fetch(proxiedUrl);
	const blob = await res.blob();
	return blob;
}

interface Success<T> {
	computeTime: string;
	output:      T;
	outputJson:  string;
	response:    Response;
	status:      "success";
}

interface LoadingModel {
	error:         string;
	estimatedTime: number;
	status:        "loading-model";
}

interface Error {
	error:  string;
	status: "error";
}

interface CacheNotFound {
	status: "cache not found";
}

type Result<T> = Success<T> | LoadingModel | Error | CacheNotFound;

export async function callInferenceApi<T>(
	url: string,
	repoId: string,
	requestBody: Record<string, any>,
	apiToken = "",
	outputParsingFn: (x: unknown) => T,
	waitForModel = false, // If true, the server will only respond once the model has been loaded on the inference API,
	includeCredentials = false,
	isOnLoadCall = false, // If true, the server will try to answer from cache and not do anything if not
	useCache = true
): Promise<Result<T>> {
	const contentType =
		"file" in requestBody && "type" in requestBody["file"] ? requestBody["file"]["type"] : "application/json";

	const headers = new Headers();
	headers.set("Content-Type", contentType);
	if (apiToken) {
		headers.set("Authorization", `Bearer ${apiToken}`);
	}
	if (waitForModel) {
		headers.set("X-Wait-For-Model", "true");
	}
	if (useCache === false) {
		headers.set("X-Use-Cache", "false");
	}
	if (isOnLoadCall) {
		headers.set("X-Load-Model", "0");
	}

	const reqBody: File | string = "file" in requestBody ? requestBody.file : JSON.stringify(requestBody);

	const response = await fetch(`${url}/models/${repoId}`, {
		method:      "POST",
		body:        reqBody,
		headers,
		credentials: includeCredentials ? "include" : "same-origin",
	});

	if (response.ok) {
		// Success
		const computeTime = response.headers.has("x-compute-time")
			? `${response.headers.get("x-compute-time")} s`
			: `cached`;
		const isMediaContent = (response.headers.get("content-type")?.search(/^(?:audio|image)/i) ?? -1) !== -1;

		const body = !isMediaContent ? await response.json() : await response.blob();

		try {
			const output = outputParsingFn(body);
			const outputJson = !isMediaContent ? JSON.stringify(body, null, 2) : "";
			return { computeTime, output, outputJson, response, status: "success" };
		} catch (e) {
			if (isOnLoadCall && body.error === "not loaded yet") {
				return { status: "cache not found" };
			}
			// Invalid output
			const error = `API Implementation Error: ${e.message}`;
			return { error, status: "error" };
		}
	} else {
		// Error
		const bodyText = await response.text();
		const body = parseJSON<Record<string, any>>(bodyText) ?? {};

		if (
			body["error"]
			&& response.status === 503
			&& body["estimated_time"] !== null
			&& body["estimated_time"] !== undefined
		) {
			// Model needs loading
			return { error: body["error"], estimatedTime: body["estimated_time"], status: "loading-model" };
		} else {
			// Other errors
			const { status, statusText } = response;
			return { error: body["error"] ?? body["traceback"] ?? `${status} ${statusText}`, status: "error" };
		}
	}
}

export async function getModelLoadInfo(
	url: string,
	repoId: string,
	includeCredentials = false
): Promise<ModelLoadInfo> {
	const response = await fetch(`${url}/status/${repoId}`, {
		credentials: includeCredentials ? "include" : "same-origin",
	});
	const output = await response.json();
	if (response.ok && typeof output === "object" && output.loaded !== undefined) {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		const { state, compute_type } = output;
		return { compute_type, state };
	} else {
		console.warn(response.status, output.error);
		return { state: LoadState.Error };
	}
}

// Extend Inference API requestBody with user supplied Inference API parameters
export function addInferenceParameters(requestBody: Record<string, any>, model: ModelData): void {
	const inference = model?.cardData?.inference;
	if (typeof inference === "object") {
		const inferenceParameters = inference?.parameters;
		if (inferenceParameters) {
			if (requestBody.parameters) {
				requestBody.parameters = { ...requestBody.parameters, ...inferenceParameters };
			} else {
				requestBody.parameters = inferenceParameters;
			}
		}
	}
}

/*
 * Converts table from [[Header0, Header1, Header2], [Column0Val0, Column1Val0, Column2Val0], ...]
 * to {Header0: [ColumnVal0, ...], Header1: [Column1Val0, ...], Header2: [Column2Val0, ...]}
 */
export function convertTableToData(table: (string | number)[][]): TableData {
	return Object.fromEntries(
		table[0].map((cell, x) => {
			return [
				cell,
				table
					.slice(1)
					.flat()
					.filter((_, i) => i % table[0].length === x)
					.map(v => String(v)), // some models can only handle strings (no numbers)
			];
		})
	);
}

/*
 * Converts data from {Header0: [ColumnVal0, ...], Header1: [Column1Val0, ...], Header2: [Column2Val0, ...]}
 * to [[Header0, Header1, Header2], [Column0Val0, Column1Val0, Column2Val0], ...]
 */
export function convertDataToTable(data: TableData): (string | number)[][] {
	const dataArray = Object.entries(data); // [header, cell[]][]
	const nbCols = dataArray.length;
	const nbRows = (dataArray[0]?.[1]?.length ?? 0) + 1;
	return Array(nbRows)
		.fill("")
		.map((_, y) =>
			Array(nbCols)
				.fill("")
				.map((__, x) => (y === 0 ? dataArray[x][0] : dataArray[x][1][y - 1]))
		);
}
