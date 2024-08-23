import { snippets, PipelineType } from "@huggingface/tasks";
import Handlebars from "handlebars";
import * as fs from "node:fs/promises";
import * as path from "node:path/posix";
import type { JsonObject } from "type-fest";

const inferenceSnippetLanguages = ["python", "js", "curl"] as const;
type InferenceSnippetLanguage = (typeof inferenceSnippetLanguages)[number];

console.log("🛠️  Preparing...");

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
  console.debug(`   🔍 Reading ${templateNameSnakeCase}.handlebars`);
  return fs.readFile(templatePath, { encoding: "utf-8" });
}

function writeTaskDoc(templateName: string, content: string): Promise<void> {
  const templateNameSnakeCase = templateName.replace(/-/g, "_");
  const taskDocPath = path.join(TASKS_DOCS_DIR, `${templateNameSnakeCase}.md`);
  console.debug(`   💾 Saving to ${taskDocPath}`);
  return fs
    .mkdir(TASKS_DOCS_DIR, { recursive: true })
    .then(() => fs.writeFile(taskDocPath, content, { encoding: "utf-8" }));
}

/////////////////////////
//// Task page utils ////
/////////////////////////

const TASKS_API_URL = "https://huggingface.co/api/tasks";
console.debug(`   🕸️ Fetching ${TASKS_API_URL}`);
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

/////////////////////
//// Specs utils ////
/////////////////////

type SpecNameType = "input" | "output" | "stream_output";

const SPECS_URL_TEMPLATE = Handlebars.compile(
  `https://raw.githubusercontent.com/huggingface/huggingface.js/main/packages/tasks/src/tasks/{{task}}/spec/{{name}}.json`,
);

async function fetchOneSpec(
  task: PipelineType,
  name: SpecNameType,
): Promise<JsonObject | undefined> {
  const url = SPECS_URL_TEMPLATE({ task, name });
  console.debug(`   🕸️ Fetching ${task} ${name} specs`);
  return fetch(url)
    .then((res) => res.json())
    .catch(() => undefined);
}

async function fetchSpecs(
  task: PipelineType,
): Promise<
  Record<"input" | "output" | "stream_output", JsonObject | undefined>
> {
  return {
    input: await fetchOneSpec(task, "input"),
    output: await fetchOneSpec(task, "output"),
    stream_output: await fetchOneSpec(task, "stream_output"),
  };
}

function processPayloadSchema(schema: any, prefix: string = ""): JsonObject[] {
  let rows: JsonObject[] = [];

  Object.entries(schema.properties || {}).forEach(
    ([key, value]: [string, any]) => {
      const isRequired = schema.required?.includes(key);
      let type = value.type || "object";

      if (value.$ref) {
        // Handle references
        const refSchemaKey = value.$ref.split("/").pop();
        value = schema.$defs?.[refSchemaKey!];
      }

      const description = value.description || "";
      const isObject = type === "object" && value.properties;
      const name = isObject ? `${prefix}▼${key}` : `${prefix}${key}`;
      const row = {
        name: name,
        type: type,
        description: description,
        required: isRequired ? "required" : "optional",
      };
      rows.push(row);

      if (isObject) {
        // Recursively process nested objects
        rows = rows.concat(
          processPayloadSchema(
            value,
            prefix + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
          ),
        );
      }
    },
  );

  return rows;
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

const SPECS_HEADERS = await readTemplate("specs-headers");
const SPECS_PAYLOAD_TEMPLATE = Handlebars.compile(
  await readTemplate("specs-payload"),
);
const SPECS_OUTPUT_TEMPLATE = Handlebars.compile(
  await readTemplate("specs-output"),
);

////////////////////
//// Data utils ////
////////////////////

const TASKS: PipelineType[] = ["image-to-image", "text-to-image"];

const DATA: {
  constants: {
    specsHeaders: string;
  };
  models: Record<string, { id: string; description: string }[]>;
  snippets: Record<
    string,
    { curl: string; python: string; javascript: string }
  >;
  specs: Record<
    string,
    {
      input: string | undefined;
      output: string | undefined;
      stream_output: string | undefined;
    }
  >;
  tips: {
    linksToTaskPage: Record<string, string>;
    listModelsLink: Record<string, string>;
  };
} = {
  constants: {
    specsHeaders: SPECS_HEADERS,
  },
  models: {},
  snippets: {},
  specs: {},
  tips: { linksToTaskPage: {}, listModelsLink: {} },
};

// Fetch recommended models
TASKS.forEach((task) => {
  // TODO loop over models and filter out freezed ones
  DATA.models[task] = TASKS_DATA[task].models;
});

// Fetch snippets
// TODO: render snippets only if they are available
TASKS.forEach((task) => {
  const mainModel = TASKS_DATA[task].models[0].id;
  DATA.snippets[task] = {
    curl: getInferenceSnippet(mainModel, task, "curl"),
    python: getInferenceSnippet(mainModel, task, "python"),
    javascript: getInferenceSnippet(mainModel, task, "js"),
  };
});

// Render specs
await Promise.all(
  TASKS.map(async (task) => {
    const specs = await fetchSpecs(task);
    DATA.specs[task] = {
      input: specs.input
        ? SPECS_PAYLOAD_TEMPLATE({ schema: processPayloadSchema(specs.input) })
        : undefined,
      output: specs.output
        ? SPECS_OUTPUT_TEMPLATE({ schema: processPayloadSchema(specs.output) })
        : undefined,
      stream_output: specs.stream_output
        ? SPECS_OUTPUT_TEMPLATE({
            schema: processPayloadSchema(specs.stream_output),
          })
        : undefined,
    };
  }),
);

// Render tips
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
  console.log(`🎨  Rendering ${templateName}`);
  const template = Handlebars.compile(await readTemplate(templateName));
  return template(data);
}

await Promise.all(
  TASKS.map(async (task) => {
    // @ts-ignore
    const rendered = await renderTemplate(task, DATA);
    await writeTaskDoc(task, rendered);
  }),
);

console.log("✅ All done!");
