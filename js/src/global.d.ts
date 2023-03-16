/// <reference types="@sveltejs/kit" />

type WidgetInputStore = Writable<{
	body: Omit<JSONValue, 'undefined'> | { file: File | Blob };
	type?: string;
	url?: string;
}>;
