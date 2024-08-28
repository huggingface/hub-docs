import { snippets, PipelineType } from "@huggingface/tasks";
import Handlebars from "handlebars";
import * as fs from "node:fs/promises";
import * as path from "node:path/posix";
import type { JsonObject } from "type-fest";

const TASKS: PipelineType[] = [
  "fill-mask",
  "image-to-image",
  "question-answering",
  "summarization",
  "text-generation",
  "text-to-image",
];
const TASKS_EXTENDED = [...TASKS, "chat-completion"];

const inferenceSnippetLanguages = ["python", "js", "curl"] as const;
type InferenceSnippetLanguage = (typeof inferenceSnippetLanguages)[number];

// Taken from https://stackoverflow.com/a/31632215
Handlebars.registerHelper({
  eq: (v1, v2) => v1 === v2,
  ne: (v1, v2) => v1 !== v2,
  lt: (v1, v2) => v1 < v2,
  gt: (v1, v2) => v1 > v2,
  lte: (v1, v2) => v1 <= v2,
  gte: (v1, v2) => v1 >= v2,
  and() {
    return Array.prototype.every.call(arguments, Boolean);
  },
  or() {
    return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
  },
});

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

const NBSP = "&nbsp;"; // non-breaking space
const TABLE_INDENT = NBSP.repeat(8);

function readTemplate(
  templateName: string,
  namespace: string,
): Promise<string> {
  const templateNameSnakeCase = templateName.replace(/-/g, "_");
  const templatePath = path.join(
    TEMPLATE_DIR,
    namespace,
    `${templateNameSnakeCase}.handlebars`,
  );
  console.log(`   🔍 Reading ${templateNameSnakeCase}.handlebars`);
  return fs.readFile(templatePath, { encoding: "utf-8" });
}

function writeTaskDoc(templateName: string, content: string): Promise<void> {
  const templateNameSnakeCase = templateName.replace(/-/g, "_");
  const taskDocPath = path.join(TASKS_DOCS_DIR, `${templateNameSnakeCase}.md`);
  console.log(`   💾 Saving to ${taskDocPath}`);
  return fs
    .mkdir(TASKS_DOCS_DIR, { recursive: true })
    .then(() => fs.writeFile(taskDocPath, content, { encoding: "utf-8" }));
}

/////////////////////////
//// Task page utils ////
/////////////////////////

const TASKS_API_URL = "https://huggingface.co/api/tasks";
console.log(`   🕸️  Fetching ${TASKS_API_URL}`);
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
): string | undefined {
  const modelData = {
    id,
    pipeline_tag,
    mask_token: "",
    library_name: "",
    config: {},
  };
  if (HAS_SNIPPET_FN[language](modelData)) {
    return GET_SNIPPET_FN[language](modelData, "hf_***");
  }
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
  console.log(`   🕸️  Fetching ${task} ${name} specs`);
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

function processPayloadSchema(
  schema: any,
  definitions: any = {},
  prefix: string = "",
): JsonObject[] {
  let rows: JsonObject[] = [];

  // Helper function to resolve schema references
  function resolveRef(ref: string) {
    const refPath = ref.split("/").slice(1); // remove the initial #
    let refSchema = schema;
    for (const part of refPath) {
      refSchema = refSchema[part];
    }
    return refSchema;
  }

  // Helper function to process a schema node
  function processSchemaNode(
    key: string,
    value: any,
    required: boolean,
    parentPrefix: string,
  ): void {
    const isRequired = required;
    let type = value.type || "object";
    let description = value.description || "";

    if (value.$ref) {
      // Resolve the reference
      value = resolveRef(value.$ref);
      type = value.type || "object";
      description = value.description || "";
    }

    if (value.enum) {
      type = "enum";
      description = `Possible values: ${value.enum.join(", ")}`;
    }

    const isObject = type === "object" && value.properties;
    const isArray = type === "array" && value.items;
    const isCombinator = value.oneOf || value.allOf || value.anyOf;
    const addRow =
      !(isCombinator && isCombinator.length === 1) &&
      !description.includes("UNUSED") &&
      !key.includes("SKIP");

    if (isCombinator && isCombinator.length > 1) {
      description = "One of the following:";
    }

    if (isArray) {
      if (value.items.$ref) {
        type = "object[]";
      } else if (value.items.type) {
        type = `${value.items.type}[]`;
      }
    }

    if (addRow) {
      // Add the row to the table except if combination with only one option
      if (key.includes("(#")) {
        // If it's a combination, no need to re-specify the type
        type = "";
      }
      const row = {
        name: `${parentPrefix}${key}`,
        type: type,
        description: description.replace(/\n/g, " "),
        required: isRequired,
      };
      rows.push(row);
    }

    if (isObject) {
      // Recursively process nested objects
      Object.entries(value.properties || {}).forEach(
        ([nestedKey, nestedValue]) => {
          const nestedRequired = value.required?.includes(nestedKey);
          processSchemaNode(
            nestedKey,
            nestedValue,
            nestedRequired,
            parentPrefix + TABLE_INDENT,
          );
        },
      );
    } else if (isArray && value.items.$ref) {
      // Process array items
      processSchemaNode(
        "SKIP",
        resolveRef(value.items.$ref),
        false,
        parentPrefix,
      );
    } else if (isCombinator) {
      // Process combinators like oneOf, allOf, anyOf
      const combinators = value.oneOf || value.allOf || value.anyOf;
      if (combinators.length === 1) {
        // If there is only one option, process it directly
        processSchemaNode(key, combinators[0], isRequired, parentPrefix);
      } else {
        // If there are multiple options, process each one as options
        combinators.forEach((subSchema: any, index: number) => {
          processSchemaNode(
            `${NBSP}(#${index + 1})`,
            subSchema,
            isRequired,
            parentPrefix + TABLE_INDENT,
          );
        });
      }
    }
  }

  // Start processing the root schema
  Object.entries(schema.properties || {}).forEach(
    ([key, value]: [string, any]) => {
      const isRequired = schema.required?.includes(key);
      processSchemaNode(key, value, isRequired, prefix);
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

const SPECS_HEADERS = await readTemplate("specs-headers", "common");
const SNIPPETS_TEMPLATE = Handlebars.compile(
  await readTemplate("snippets-template", "common"),
);
const SPECS_PAYLOAD_TEMPLATE = Handlebars.compile(
  await readTemplate("specs-payload", "common"),
);
const SPECS_OUTPUT_TEMPLATE = Handlebars.compile(
  await readTemplate("specs-output", "common"),
);

////////////////////
//// Data utils ////
////////////////////

const DATA: {
  constants: {
    specsHeaders: string;
  };
  models: Record<string, { id: string; description: string }[]>;
  snippets: Record<string, string>;
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

// Check for each model if inference status is "warm"
await Promise.all(
  TASKS.map(async (task) => {
    await Promise.all(
      TASKS_DATA[task].models.map(
        async (model: {
          id: string;
          description: string;
          inference: string | undefined;
          config: JsonObject | undefined;
        }) => {
          console.log(`   ⚡ Checking inference status ${model.id}`);
          let url = `https://huggingface.co/api/models/${model.id}?expand[]=inference`;
          if (task === "text-generation") {
            url += "&expand[]=config";
          }
          const modelData = await fetch(url).then((res) => res.json());
          model.inference = modelData.inference;
          model.config = modelData.config;
        },
      ),
    );
  }),
);

// Fetch recommended models
TASKS.forEach((task) => {
  DATA.models[task] = TASKS_DATA[task].models;
});

// Fetch snippets
// TODO: render snippets only if they are available
TASKS.forEach((task) => {
  const mainModel = TASKS_DATA[task].models[0].id;
  const taskSnippets = {
    curl: getInferenceSnippet(mainModel, task, "curl"),
    python: getInferenceSnippet(mainModel, task, "python"),
    javascript: getInferenceSnippet(mainModel, task, "js"),
  };
  DATA.snippets[task] = SNIPPETS_TEMPLATE({
    taskSnippets,
    taskSnakeCase: task.replace("-", "_"),
    taskAttached: task.replace("-", ""),
  });
});

// Render specs
await Promise.all(
  TASKS_EXTENDED.map(async (task) => {
    // @ts-ignore
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

///////////////////////////////////////////////
//// Data for chat-completion special case ////
///////////////////////////////////////////////

function fetchChatCompletion() {
  // Recommended models based on text-generation
  DATA.models["chat-completion"] = DATA.models["text-generation"].filter(
    // @ts-ignore
    (model) => model.config?.tokenizer_config?.chat_template,
  );

  // Snippet specific to chat completion
  const mainModel = DATA.models["chat-completion"][0].id;
  const mainModelData = {
    // @ts-ignore
    id: mainModel.id,
    pipeline_tag: "text-generation",
    mask_token: "",
    library_name: "",
    // @ts-ignore
    config: mainModel.config,
  };
  const taskSnippets = {
    // @ts-ignore
    curl: GET_SNIPPET_FN["curl"](mainModelData, "hf_***"),
    // @ts-ignore
    python: GET_SNIPPET_FN["python"](mainModelData, "hf_***"),
    // @ts-ignore
    javascript: GET_SNIPPET_FN["js"](mainModelData, "hf_***"),
  };
  DATA.snippets["chat-completion"] = SNIPPETS_TEMPLATE({
    taskSnippets,
    taskSnakeCase: "chat-completion".replace("-", "_"),
    taskAttached: "chat-completion".replace("-", ""),
  });
}

fetchChatCompletion();

/////////////////////////
//// Rendering utils ////
/////////////////////////

async function renderTemplate(
  templateName: string,
  data: JsonObject,
): Promise<string> {
  console.log(`🎨  Rendering ${templateName}`);
  const template = Handlebars.compile(await readTemplate(templateName, "task"));
  return template(data);
}

await Promise.all(
  TASKS_EXTENDED.map(async (task) => {
    // @ts-ignore
    const rendered = await renderTemplate(task, DATA);
    await writeTaskDoc(task, rendered);
  }),
);

console.log("✅ All done!");
