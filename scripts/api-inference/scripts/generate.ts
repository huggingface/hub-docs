import { snippets, PipelineType } from "@huggingface/tasks";
import Handlebars from "handlebars";
import * as fs from "node:fs/promises";
import * as path from "node:path/posix";
import type { JsonObject } from "type-fest";

const inferenceSnippetLanguages = ["python", "js", "curl"] as const;
type InferenceSnippetLanguage = (typeof inferenceSnippetLanguages)[number];

console.log("🛠️  Preparing...")

////////////////////////
//// Filepath utils ////
////////////////////////

const ROOT_DIR = path
  .join(path.normalize(import.meta.url), "..", "..")
  .replace(/^(file:)/, "");
const TEMPLATE_DIR = path.join(ROOT_DIR, "templates");
const DOCS_DIR = path.join(ROOT_DIR, "..", "..", "docs");
const TASKS_DOCS_DIR = path.join(DOCS_DIR, "api-inference", "tasks");

function readTemplate(templateName: string): Promise<string> {
  const templateNameSnakeCase = templateName.replace(/-/g, "_");
  const templatePath = path.join(
    TEMPLATE_DIR,
    `${templateNameSnakeCase}.handlebars`,
  );
  console.debug(`   📖 Read from ${templatePath}`);
  return fs.readFile(templatePath, { encoding: "utf-8" });
}

function writeTaskDoc(templateName: string, content: string): Promise<void> {
  const templateNameSnakeCase = templateName.replace(/-/g, "_");
  const taskDocPath = path.join(TASKS_DOCS_DIR, `${templateNameSnakeCase}.md`);
  console.debug(`   💾 Save to ${taskDocPath}`);
  return fs
    .mkdir(TASKS_DOCS_DIR, { recursive: true })
    .then(() => fs.writeFile(taskDocPath, content, { encoding: "utf-8" }));
}

/////////////////////////
//// Task page utils ////
/////////////////////////

const TASKS_API_URL = "https://huggingface.co/api/tasks";
console.debug(`   📖 Fetching ${TASKS_API_URL}`);
const response = await fetch(TASKS_API_URL);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TASKS_DATA = (await response.json()) as any;

///////////////////////
//// Snippet utils ////
///////////////////////

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

export function getInferenceSnippet(
  id: string,
  pipeline_tag: PipelineType,
  language: InferenceSnippetLanguage,
): string {
  return GET_SNIPPET_FN[language](
    {
      id,
      pipeline_tag,
      mask_token: "",
      library_name: "",
      config: {},
    },
    "hf_***",
  );
}

/**
 * - If language is undefined, the function checks if an inference snippet is available for at least one language
 * - If language is defined, the function checks if in an inference snippet is available for that specific language
 */
export function hasInferenceSnippet(
  id: string,
  pipeline_tag: PipelineType,
  language: InferenceSnippetLanguage,
): boolean {
  return HAS_SNIPPET_FN[language]({
    id,
    pipeline_tag,
    mask_token: "",
    library_name: "",
    config: {},
  });
}

//////////////////////////
//// Inline templates ////
//////////////////////////

const TIP_LINK_TO_TASK_PAGE_TEMPLATE = Handlebars.compile(`<Tip>

For more details about the \`{{task}}\` task, check out its [dedicated page](https://huggingface.co/tasks/{{task}})! You will find examples and related materials.

</Tip>`);

const TIP_LIST_MODELS_LINK_TEMPLATE = Handlebars.compile(
  `This is only a subset of the supported models. Find the model that suits you best [here](https://huggingface.co/models?inference=warm&pipeline_tag={{task}}&sort=trending).`,
);

const SPECS_HEADERS= await readTemplate("specs-headers");

////////////////////
//// Data utils ////
////////////////////

const TASKS: PipelineType[] = ["text-to-image"];

const DATA: {
  snippets: Record<
    string,
    { curl: string; python: string; javascript: string }
  >;
  models: Record<string, { id: string; description: string }[]>;
  tips: {
    linksToTaskPage: Record<string, string>;
    listModelsLink: Record<string, string>;
  };
  constants: {
    specsHeaders: string;
  };
} = {
  snippets: {},
  models: {},
  tips: { linksToTaskPage: {}, listModelsLink: {} },
  constants: {
    specsHeaders: SPECS_HEADERS,
  },
};

TASKS.forEach((task) => {
  const mainModel = TASKS_DATA[task].models[0].id;
  DATA.snippets[task] = {
    curl: getInferenceSnippet(mainModel, task, "curl"),
    python: getInferenceSnippet(mainModel, task, "python"),
    javascript: getInferenceSnippet(mainModel, task, "js"),
  };
});

TASKS.forEach((task) => {
  // TODO loop over models and filter out freezed ones
  DATA.models[task] = TASKS_DATA[task].models;
});

TASKS.forEach((task) => {
  DATA.tips.linksToTaskPage[task] = TIP_LINK_TO_TASK_PAGE_TEMPLATE({ task });
  DATA.tips.listModelsLink[task] = TIP_LIST_MODELS_LINK_TEMPLATE({ task });
});

/////////////////////////
//// Rendering utils ////
/////////////////////////

async function renderTemplate(
  templateName: string,
  data: JsonObject,
): Promise<string> {
  console.log(`🛠️  Rendering ${templateName}`);
  const template = Handlebars.compile(await readTemplate(templateName));
  return template(data);
}

const rendered = await renderTemplate("text-to-image", DATA);
await writeTaskDoc("text-to-image", rendered);

console.debug("✅ All done!");
