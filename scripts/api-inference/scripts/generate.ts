import { snippets, PipelineType } from "@huggingface/tasks";
import { access } from "fs";
// Order of the elements in InferenceModal.svelte is determined by this const
export const inferenceSnippetLanguages = ["python", "js", "curl"] as const;

export type InferenceSnippetLanguage =
  (typeof inferenceSnippetLanguages)[number];

// "id" | "pipeline_tag" | "mask_token" | "library_name" | "config"

const GET_SNIPPET_FN = {
  curl: snippets.curl.getCurlInferenceSnippet,
  js: snippets.js.getJsInferenceSnippet,
  python: snippets.python.getPythonInferenceSnippet,
} as const;

const HAS_SNIPPET_FN = {
  curl: snippets.curl.hasCurlInferenceSnippet,
  js: snippets.js.hasJsInferenceSnippet,
  python: snippets.python.hasPythonInferenceSnippet,
} as const;

const HLJS_SNIPPET_LANG = {
  curl: "jboss-cli",
  js: "javascript",
  python: "python",
} as const;

export function getInferenceSnippet(
  id: string,
  pipeline_tag: PipelineType,
  language: InferenceSnippetLanguage,
  accessToken: string,
): { snippet: string } {
  const snippet = GET_SNIPPET_FN[language](
    {
      id,
      pipeline_tag,
      mask_token: "",
      library_name: "",
      config: {},
    },
    accessToken,
  );
  return { snippet };
}

/**
 * - If language is undefined, the function checks if an inference snippet is available for at least one language
 * - If language is defined, the function checks if in an inference snippet is available for that specific language
 */
export function hasInferenceSnippet(
  id: string,
  pipeline_tag: PipelineType,
  language?: InferenceSnippetLanguage,
): boolean {
  const model = {
    id,
    pipeline_tag,
    mask_token: "",
    library_name: "",
    config: {},
  };

  if (!language) {
    return inferenceSnippetLanguages.some((lang) =>
      HAS_SNIPPET_FN[lang](model),
    );
  }
  return HAS_SNIPPET_FN[language](model);
}

const PYTHON_TEXT_TO_IMAGE = getInferenceSnippet(
  "black-forest-labs/FLUX.1-dev",
  "text-to-image",
  "python",
  "hf_***",
);

console.log(PYTHON_TEXT_TO_IMAGE["snippet"]);