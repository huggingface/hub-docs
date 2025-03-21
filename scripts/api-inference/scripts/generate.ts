import {
  snippets,
  INFERENCE_PROVIDERS,
  InferenceProvider,
} from "@huggingface/inference";
import {
  PipelineType,
  InferenceSnippet,
  type ModelDataMinimal,
} from "@huggingface/tasks";
import Handlebars from "handlebars";
import * as fs from "node:fs/promises";
import * as path from "node:path/posix";
import type { JsonObject } from "type-fest";

const TASKS: PipelineType[] = [
  "automatic-speech-recognition",
  "audio-classification",
  "feature-extraction",
  "fill-mask",
  "image-classification",
  "image-segmentation",
  "image-to-image",
  "image-text-to-text",
  "object-detection",
  "question-answering",
  "summarization",
  "table-question-answering",
  "text-classification",
  "text-generation",
  "text-to-image",
  "token-classification",
  "translation",
  "zero-shot-classification",
];
const TASKS_EXTENDED = [...TASKS, "chat-completion"];
const SPECS_REVISION = "main";

const HEADERS = { Authorization: `Bearer ${process.env.HF_TOKEN}` };

async function authFetchJson(url: string) {
  const headers = url.includes("huggingface.co") ? HEADERS : {};
  try {
    const res = await fetch(url, { headers: headers });
    if (!res.ok) {
      console.warn(`Failed to fetch ${url}: ${await res.text()}`);
      return {};
    }
    return res.json();
  } catch (e) {
    console.warn(`Failed to fetch ${url}: ${e}`);
    return {};
  }
}

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
//// Provider utils ////
////////////////////////

/// PER_TASK_SUPPORTED_PROVIDERS[task] = provider[]
const PER_TASK_SUPPORTED_PROVIDERS: Record<string, string[]> = {};

await Promise.all(
  INFERENCE_PROVIDERS.map(async (provider) => {
    if (provider == "hf-inference") {
      return; // handled separately
    }
    console.log("   ⚡ Fetching supported tasks for provider " + provider);
    const url = `https://huggingface.co/api/partners/${provider}/models`;
    const mapping = (await authFetchJson(url)) as Record<
      string,
      Record<string, { status: "live" | "staging"; providerId: string }>
    >;

    for (const [task, models] of Object.entries(mapping)) {
      for (const [modelId, modelMapping] of Object.entries(models)) {
        if (modelMapping.status == "live") {
          if (!PER_TASK_SUPPORTED_PROVIDERS[task]) {
            PER_TASK_SUPPORTED_PROVIDERS[task] = [];
          }
          PER_TASK_SUPPORTED_PROVIDERS[task].push(provider);
          break;
        }
      }
    }
  })
);

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
  namespace: string
): Promise<string> {
  const templatePath = path.join(
    TEMPLATE_DIR,
    namespace,
    `${templateName}.handlebars`
  );
  console.log(`   🔍 Reading ${templateName}.handlebars`);
  return fs.readFile(templatePath, { encoding: "utf-8" });
}

function writeTaskDoc(templateName: string, content: string): Promise<void> {
  const taskDocPath = path.join(TASKS_DOCS_DIR, `${templateName}.md`);
  console.log(`   💾 Saving to ${taskDocPath}`);
  const header = PAGE_HEADER({ task: templateName });
  const contentWithHeader = `<!---\n${header}\n--->\n\n${content}`;
  return fs
    .mkdir(TASKS_DOCS_DIR, { recursive: true })
    .then(() =>
      fs.writeFile(taskDocPath, contentWithHeader, { encoding: "utf-8" })
    );
}

/////////////////////////
//// Task page utils ////
/////////////////////////

const TASKS_API_URL = "https://huggingface.co/api/tasks";
console.log(`   🕸️  Fetching ${TASKS_API_URL}`);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TASKS_DATA = (await authFetchJson(TASKS_API_URL)) as any;

///////////////////////
//// Snippet utils ////
///////////////////////

export function getFormattedInferenceSnippet(
  pipeline_tag: PipelineType,
  model: {
    modelId: string;
    provider: string;
    providerModelId: string;
    providerTask: string;
    tags: string[];
  },
  conversational: boolean
): InferenceSnippet[] {
  if (conversational && !model.tags.includes("conversational")) {
    return [];
  }
  return snippets.getInferenceSnippets(
    {
      id: model.modelId,
      pipeline_tag,
      mask_token: "[MASK]",
      library_name: "",
      tags: conversational ? ["conversational"] : [],
      inference: "",
    } as ModelDataMinimal,
    "hf_***",
    model.provider as InferenceProvider,
    model.providerModelId
  );
}

/////////////////////
//// Specs utils ////
/////////////////////

type SpecNameType = "input" | "output" | "stream_output";

const SPECS_URL_TEMPLATE = Handlebars.compile(
  `https://raw.githubusercontent.com/huggingface/huggingface.js/${SPECS_REVISION}/packages/tasks/src/tasks/{{task}}/spec/{{name}}.json`
);
const COMMON_DEFINITIONS_URL = `https://raw.githubusercontent.com/huggingface/huggingface.js/${SPECS_REVISION}/packages/tasks/src/tasks/common-definitions.json`;

async function fetchOneSpec(
  task: PipelineType,
  name: SpecNameType
): Promise<JsonObject | undefined> {
  const url = SPECS_URL_TEMPLATE({ task, name });
  console.log(`   🕸️  Fetching ${task} ${name} specs`);
  return (await authFetchJson(url)) ?? undefined;
}

async function fetchSpecs(
  task: PipelineType
): Promise<
  Record<"input" | "output" | "stream_output", JsonObject | undefined>
> {
  return {
    input: await fetchOneSpec(task, "input"),
    output: await fetchOneSpec(task, "output"),
    stream_output: await fetchOneSpec(task, "stream_output"),
  };
}

async function fetchCommonDefinitions(): Promise<JsonObject> {
  console.log(`   🕸️  Fetching common definitions`);
  return await authFetchJson(COMMON_DEFINITIONS_URL);
}

const COMMON_DEFINITIONS = await fetchCommonDefinitions();

function processPayloadSchema(schema: any): JsonObject[] {
  let rows: JsonObject[] = [];

  // Helper function to resolve schema references
  function resolveRef(ref: string) {
    const refPath = ref.split("#/")[1].split("/");
    let refSchema = ref.includes("common-definitions.json")
      ? COMMON_DEFINITIONS
      : schema;
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
    parentPrefix: string
  ): void {
    const isRequired = required;
    let type = value.type || "unknown";
    let description = value.description || "";

    if (value.$ref) {
      // Resolve the reference
      value = resolveRef(value.$ref);
      type = value.type || "unknown";
      description = value.description || "";
    }

    if (value.enum) {
      type = "enum";
      description = `Possible values: ${value.enum.join(", ")}.`;
    }

    const isObject = type === "object" && value.properties;
    const isArray = type === "array" && value.items;
    const isCombinator = value.oneOf || value.allOf || value.anyOf;
    const addRow =
      !(isCombinator && isCombinator.length === 1) &&
      !description.includes("UNUSED") &&
      !key.includes("SKIP") &&
      key.length > 0;

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
        // If it's a combination, no need to re-specify the type except if it's to
        // specify a constant value.
        type = value.const ? `'${value.const}'` : type;
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
            parentPrefix + TABLE_INDENT
          );
        }
      );
    } else if (isArray) {
      // Process array items
      processSchemaNode("SKIP", value.items, false, parentPrefix);
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
            false,
            parentPrefix + TABLE_INDENT
          );
        });
      }
    }
  }

  // Start processing based on the root type of the schema
  if (schema.type === "array") {
    // If the root schema is an array, process its items
    const row = {
      name: "(array)",
      type: `${schema.items.type}[]`,
      description:
        schema.items.description ||
        `Output is an array of ${schema.items.type}s.`,
      required: true,
    };
    rows.push(row);
    processSchemaNode("", schema.items, false, "");
  } else {
    // Otherwise, start with the root object
    Object.entries(schema.properties || {}).forEach(([key, value]) => {
      const required = schema.required?.includes(key);
      processSchemaNode(key, value, required, "");
    });
  }

  return rows;
}

//////////////////////////
//// Inline templates ////
//////////////////////////

const TIP_LINK_TO_TASK_PAGE_TEMPLATE = Handlebars.compile(`<Tip>

For more details about the \`{{task}}\` task, check out its [dedicated page](https://huggingface.co/tasks/{{task}})! You will find examples and related materials.

</Tip>`);

const TIP_LIST_MODELS_LINK_TEMPLATE = Handlebars.compile(
  `Explore all available models and find the one that suits you best [here](https://huggingface.co/models?inference=warm&pipeline_tag={{task}}&sort=trending).`
);
const SPECS_HEADERS = await readTemplate("specs-headers", "common");
const PAGE_HEADER = Handlebars.compile(
  await readTemplate("page-header", "common")
);
const SNIPPETS_TEMPLATE = Handlebars.compile(
  await readTemplate("snippets-template", "common")
);
const SPECS_PAYLOAD_TEMPLATE = Handlebars.compile(
  await readTemplate("specs-payload", "common")
);
const SPECS_OUTPUT_TEMPLATE = Handlebars.compile(
  await readTemplate("specs-output", "common")
);

////////////////////
//// Data utils ////
////////////////////

const DATA: {
  constants: {
    specsHeaders: string;
  };
  recommendedModels: Record<
    string,
    {
      id: string;
      description: string;
      inference: string | undefined;
      tags: string[];
    }[]
  >;
  perProviderWarmModels: Record<
    string,
    {
      modelId: string;
      provider: string;
      providerModelId: string;
      providerTask: string;
      tags: string[];
    }[]
  >;
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
  recommendedModels: {},
  perProviderWarmModels: {},
  snippets: {},
  specs: {},
  tips: { linksToTaskPage: {}, listModelsLink: {} },
};

// For each task, retrieve inference status of all recommended models
await Promise.all(
  TASKS.map(async (task) => {
    await Promise.all(
      TASKS_DATA[task].models.map(
        async (model: {
          id: string;
          description: string;
          inference: string | undefined;
        }) => {
          console.log(`   ⚡ Checking inference status ${model.id}`);
          let url = `https://huggingface.co/api/models/${model.id}?expand[]=inference&expand[]=tags`;
          const modelData = await authFetchJson(url);
          model.inference = modelData.inference;
        }
      )
    );
  })
);

async function fetchWarmModels(task: PipelineType): Promise<
  {
    modelId: string;
    provider: string;
    providerModelId: string;
    providerTask: string;
    tags: string[];
  }[]
> {
  const providers = [
    "hf-inference",
    ...(PER_TASK_SUPPORTED_PROVIDERS[task] ?? []),
  ].sort();
  return (
    await Promise.all(
      providers.map(async (provider) => {
        console.log(
          `   ⚡ Fetching most popular warm model for ${task} from ${provider}`
        );
        const url = `https://huggingface.co/api/models?pipeline_tag=${task}&inference_provider=${provider}&sort=likes30d&expand[]=inferenceProviderMapping&expand[]=tags&limit=5`;
        const modelsData = (await authFetchJson(url)) as {
          id: string;
          likes30d: number;
          inferenceProviderMapping: Record<string, string>[];
          tags: string[];
        }[];
        if (modelsData.length === 0) {
          return;
        }

        /// Little hack: if there are multiple models with the same number of likes (typically 0), we arbitrarily pick the one with the smallest ID to get a deterministic result
        const topLikes = modelsData[0].likes30d;
        const topModelData = modelsData
          .filter((model) => model.likes30d === topLikes)
          .sort((a, b) => a.id.localeCompare(b.id))[0];

        const providerMapping = topModelData.inferenceProviderMapping as
          | Record<string, string>[]
          | undefined;
        if (!providerMapping) {
          return;
        }
        const providerData = providerMapping.filter(
          (mapping) => mapping.provider === provider
        )[0];
        return {
          modelId: topModelData.id,
          provider: provider,
          providerModelId: providerData.providerId,
          providerTask: providerData.task,
          tags: topModelData.tags,
        };
      })
    )
  ).filter((model) => model !== undefined);
}

// For each task and for each provider, retrieve the most popular warm model
await Promise.all(
  TASKS.map(async (task) => {
    DATA.perProviderWarmModels[task] = await fetchWarmModels(task);
  })
);

// Filter recommended models (i.e. recommended + warm)
TASKS.forEach((task) => {
  DATA.recommendedModels[task] = TASKS_DATA[task].models.filter(
    (model: { inference: string }) => model.inference === "warm"
  );
});

// Generate snippets
TASKS.forEach((task) => {
  const inferenceSnippets = DATA.perProviderWarmModels[task].flatMap((model) =>
    getFormattedInferenceSnippet(task, model, false).map(
      (inferenceSnippet) => ({
        ...inferenceSnippet,
        provider: model.provider,
      })
    )
  );

  DATA.snippets[task] = SNIPPETS_TEMPLATE({
    inferenceSnippets,
    taskSnakeCase: task.replaceAll("-", "_"),
    taskAttached: task.replaceAll("-", ""),
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
  })
);

// Render tips
TASKS.forEach((task) => {
  DATA.tips.linksToTaskPage[task] = TIP_LINK_TO_TASK_PAGE_TEMPLATE({ task });
  DATA.tips.listModelsLink[task] = TIP_LIST_MODELS_LINK_TEMPLATE({ task });
});

///////////////////////////////////////////////
//// Data for chat-completion special case ////
///////////////////////////////////////////////

async function fetchChatCompletion() {
  // Conversational text-generation
  console.log(
    "   ⚡ Prepare data for chat-completion (conversational text-generation)"
  );
  DATA.recommendedModels["chat-completion"] = DATA.recommendedModels[
    "text-generation"
  ].filter((model) => model.tags?.includes("conversational"));
  DATA.snippets["chat-completion"] = SNIPPETS_TEMPLATE({
    taskSnakeCase: "chat_completion",
    taskAttached: "chatCompletion",
    inferenceSnippets: (await fetchWarmModels("text-generation")).flatMap(
      (model) =>
        getFormattedInferenceSnippet("text-generation", model, true).map(
          (inferenceSnippet) => ({
            ...inferenceSnippet,
            provider: model.provider,
          })
        )
    ),
  });

  // Conversational image-text-to-text
  console.log(
    "   ⚡ Prepare data for chat-completion (conversational image-text-to-text)"
  );
  DATA.recommendedModels["conversational-image-text-to-text"] =
    DATA.recommendedModels["image-text-to-text"].filter((model) =>
      model.tags?.includes("conversational")
    );
  DATA.snippets["conversational-image-text-to-text"] = SNIPPETS_TEMPLATE({
    taskSnakeCase: "chat_completion",
    taskAttached: "chatCompletion",
    inferenceSnippets: (await fetchWarmModels("image-text-to-text")).flatMap(
      (model) =>
        getFormattedInferenceSnippet("image-text-to-text", model, true).map(
          (inferenceSnippet) => ({
            ...inferenceSnippet,
            provider: model.provider,
          })
        )
    ),
  });
}

await fetchChatCompletion();

/////////////////////////
//// Rendering utils ////
/////////////////////////

async function renderTemplate(
  templateName: string,
  data: JsonObject
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
  })
);

console.log("✅ All done!");
