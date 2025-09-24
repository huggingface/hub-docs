# Structured Outputs with Inference Providers

In this guide, we'll show you how to use Inference Providers to generate structured outputs that follow a specific JSON schema. This is incredibly useful for building reliable AI applications that need predictable, parsable responses.

Structured outputs guarantee a model returns a response that matches your exact schema every time. This eliminates the need for complex parsing logic and makes your applications more robust.

> [!TIP]
> This guide assumes you have a Hugging Face account. If you don't have one, you can create one for free at [huggingface.co](https://huggingface.co).

## What Are Structured Outputs?

Structured outputs make sure model responses always follow a specific structure, typically a JSON Schema. This means you get predictable, type-safe data that integrates easily with your systems. The model follows a strict template so you always get the data in the format you expect.

Traditionally, getting structured data from LLMs required prompt engineering (asking the model to "respond in JSON format"), post-processing and parsing the response, and sometimes retrying when parsing failed. This approach is unreliable and can lead to brittle applications.

With structured outputs, you get:

- Guaranteed compliance with your defined schema
- Fewer errors from malformed or unparsable JSON
- Easier integration with downstream systems
- No need for retry logic or complex error handling
- More efficient use of tokens (less verbose instructions)

In short, structured outputs make your applications more robust and reliable by ensuring every response matches your schema, with built-in validation and type safety.

## Step 1: Define Your Schema

Before making any API calls, you need to define the structure you want. Let's build a practical example: extracting structured information from research papers. This is a common real-world use case where you need to parse academic papers and extract key details like title, authors, contributions, and methodology.

We'll create a simple schema that captures the most essential elements: the paper's title and a summary of its abstract. The easiest way to do this is to use Pydantic, a library that allows you to define Python classes that represent JSON schemas (among other things).

```python
from pydantic import BaseModel

class PaperAnalysis(BaseModel):
    title: str
    abstract_summary: str
```

Using `model_json_schema` we can convert the Pydantic model to a JSON Schema which is what the model will receive as a response format instruction. This is the schema that the model will use to generate the response.

```json
{
  "type": "object",
  "properties": {
    "title": {"type": "string"},
    "abstract_summary": {"type": "string"}
  },
  "required": ["title", "abstract_summary"]
}
```

This simple schema ensures we'll always get the paper's title and a concise summary of its abstract. Notice how we mark both fields as required - this guarantees they'll always be present in the response, making our application more reliable.

## Step 2: Set up your inference client

Now that we have our schema defined, let's set up the client to communicate with the inference providers. We'll show you two approaches: the Hugging Face Hub client (which gives you direct access to all Inference Providers) and the OpenAI client (which works through OpenAI-compatible endpoints).

<hfoptions id="structured-outputs-implementation">

<hfoption id="huggingface_hub">

Install the Hugging Face Hub python package:

```bash
pip install huggingface_hub
```

Initialize the `InferenceClient` with an Inference Provider (check this [list](https://huggingface.co/docs/inference-providers/index#partners) for all available providers) and your Hugging Face token.

```python
import os
from huggingface_hub import InferenceClient

# Initialize the client
client = InferenceClient(
    provider="cerebras",  # or use "auto" for automatic selection
    api_key=os.environ["HF_TOKEN"],
)

```

</hfoption>

<hfoption id="openai">

Install the OpenAI python package:

```bash
pip install openai
```

Initialize an `OpenAI` client with the `base_url` and your Hugging Face token.

```python
import os
from openai import OpenAI
from pydantic import BaseModel
from typing import List

# Initialize the OpenAI client (works with Inference Providers)
client = OpenAI(
    base_url="https://router.huggingface.co/cerebras/v1",
    api_key=os.environ["HF_TOKEN"]
)

```

</hfoption>

</hfoptions>

> [!TIP]
> Structured outputs are a good use case for selecting a specific provider and model because you want to avoid incompatibility issues between the model, provider and the schema.

## Step 3: Generate structured output

Now let's extract structured information from a research paper. We'll send the paper content to the model along with our schema, and get back perfectly structured data.

For this example, we'll analyze a famous AI research paper. The model will read the paper and extract the key information according to our predefined schema.

<hfoptions id="structured-outputs-implementation">

<hfoption id="huggingface_hub">

Here's how to generate structured outputs with the Hugging Face Hub client:

```python
from pydantic import BaseModel

# Example paper text (truncated for brevity)
paper_text = """
Title: Attention Is All You Need

Abstract: The dominant sequence transduction models are based on complex recurrent 
or convolutional neural networks that include an encoder and a decoder. The best 
performing models also connect the encoder and decoder through an attention mechanism. 
We propose a new simple network architecture, the Transformer, based solely on 
attention mechanisms, dispensing with recurrence and convolutions entirely...
"""

# Define the response format
class PaperAnalysis(BaseModel):
    title: str
    abstract_summary: str

# Convert the Pydantic model to a JSON Schema and wrap it in a dictionary
response_format = {
    "type": "json_schema",
    "json_schema": {
        "name": "PaperAnalysis",
        "schema": PaperAnalysis.model_json_schema(),
        "strict": True,
    },
}

# Define your messages with a system prompt and a user prompt
# The system prompt is a description of the task you want the model to perform
# The user prompt is the input data you want to process
messages = [
    {
        "role": "system", 
        "content": "Extract paper title and abstract summary."
    },
    {
        "role": "user", 
        "content": paper_text
    }
]

# Generate structured output using Qwen/Qwen3-32B model
response = client.chat_completion(
    messages=messages,
    response_format=response_format,
    model="Qwen/Qwen3-32B",
)

# The response is guaranteed to match your schema
structured_data = response.choices[0].message.content
print(structured_data)
```

</hfoption>

<hfoption id="openai">

Here's how to generate structured outputs with the OpenAI client:

```python
# Example paper text (truncated for brevity)
paper_text = """
Title: Attention Is All You Need

Abstract: The dominant sequence transduction models are based on complex recurrent 
or convolutional neural networks that include an encoder and a decoder...
"""

# Generate structured output using Qwen/Qwen3-32B model
# With the OpenAI client, you can use the `response_format` as a pydantic model
completion = client.beta.chat.completions.parse(
    model="qwen-3-32b",
    messages=[
        {"role": "system", "content": "Extract paper title and abstract summary."},
        {"role": "user", "content": paper_text}
    ],
    response_format=PaperAnalysis
)

```

</hfoption>

</hfoptions>

## Step 4: Handle the Response

Both approaches guarantee that your response will match the specified schema. Here's how to access and use the structured data:

<hfoptions id="structured-outputs-implementation">

<hfoption id="huggingface_hub">

The Hugging Face Hub client returns a `ChatCompletion` object, which contains the response from the model as a string. Use the `json.loads` function to parse the response and get the structured data.

```python
# The response is guaranteed to match your schema
structured_data = response.choices[0].message.content
print("Paper Analysis Results:")
print(structured_data)

# Parse the JSON to work with individual fields
import json
analysis = json.loads(structured_data)
print(f"Title: {analysis['title']}"
print(f"Abstract Summary: {analysis['abstract_summary']}")
```

</hfoption>


<hfoption id="openai">

The OpenAI client returns a `ChatCompletion` object, which contains the response from the model as a Python object. Access the structured data using the `title` and `abstract_summary` attributes of the `PaperAnalysis` class.

```python
# Get the parsed response as a Python object
analysis = completion.choices[0].message.parsed
print(f"Title: {analysis.title}")
print(f"Abstract Summary: {analysis.abstract_summary}")

# The data is already type-safe and validated
print(f"Title type: {type(analysis.title)}")
print(f"Summary type: {type(analysis.abstract_summary)}")
```

</hfoption>

</hfoptions>

The structured output might look like this:

```json
{
  "title": "Attention Is All You Need",
  "abstract_summary": "Introduces the Transformer architecture based solely on attention mechanisms, eliminating recurrence and convolutions for sequence transduction tasks. Shows superior quality in machine translation while being more parallelizable and requiring less training time."
}
```

You can now confidently process this data without worrying about parsing errors or missing fields. The schema validation ensures that required fields are always present and data types are correct.

## Complete Working Example

Here's a complete script that you can run immediately to see structured outputs in action:

<details>
<summary>Click to expand complete script</summary>

<hfoptions id="complete-script">

<hfoption id="huggingface_hub">

```python
import os
import json

from huggingface_hub import InferenceClient
from pydantic import BaseModel
from typing import List

# Set your Hugging Face token
# export HF_TOKEN="your_token_here"

def analyze_paper_structured():
    """Complete example of structured output for research paper analysis."""
    
    # Initialize the client
    client = InferenceClient(
        provider="cerebras",  # or use "auto" for automatic selection
        api_key=os.environ["HF_TOKEN"],
    )
    
    # Example paper text (you can replace this with any research paper)
    paper_text = """
    Title: Attention Is All You Need
    
    Abstract: The dominant sequence transduction models are based on complex recurrent 
    or convolutional neural networks that include an encoder and a decoder. The best 
    performing models also connect the encoder and decoder through an attention mechanism. 
    We propose a new simple network architecture, the Transformer, based solely on 
    attention mechanisms, dispensing with recurrence and convolutions entirely. 
    Experiments on two machine translation tasks show these models to be superior 
    in quality while being more parallelizable and requiring significantly less time to train.
    
    Introduction: Recurrent neural networks, long short-term memory and gated recurrent 
    neural networks in particular, have been firmly established as state of the art approaches 
    in sequence modeling and transduction problems such as language modeling and machine translation.
    """
    
    # Define the response format (JSON Schema)
    class PaperAnalysis(BaseModel):
        title: str
        abstract_summary: str

    response_format = {
        "type": "json_schema",
        "json_schema": {
            "name": "PaperAnalysis",
            "schema": PaperAnalysis.model_json_schema(),
            "strict": True,
        },
    }
    
    # Define your messages
    messages = [
        {
            "role": "system", 
            "content": "Extract paper title and abstract summary."
        },
        {
            "role": "user", 
            "content": paper_text
        }
    ]
    
    # Generate structured output
    response = client.chat_completion(
        messages=messages,
        response_format=response_format,
        model="Qwen/Qwen3-32B",
    )
    
    # The response is guaranteed to match your schema
    structured_data = response.choices[0].message.content
    
    # Parse and display results
    analysis = json.loads(structured_data)
    
    print(f"Title: {analysis['title']}")
    print(f"Abstract Summary: {analysis['abstract_summary']}")

if __name__ == "__main__":
    # Make sure you have set your HF_TOKEN environment variable
    analyze_paper_structured()
```

</hfoption>

<hfoption id="openai">

```python
import os
from openai import OpenAI
from pydantic import BaseModel, Field
from typing import List

# Set your Hugging Face token
# export HF_TOKEN="your_token_here"

class PaperAnalysis(BaseModel):
    """Structured model for research paper analysis."""
    title: str
    abstract_summary: str

def analyze_paper_structured():
    """Complete example of structured output for research paper analysis."""
    
    # Initialize the OpenAI client (works with Inference Providers)
    client = OpenAI(
        base_url="https://router.huggingface.co/cerebras/v1",
        api_key=os.environ["HF_TOKEN"]
    )
    
    # Example paper text (you can replace this with any research paper)
    paper_text = """
    Title: Attention Is All You Need
    
    Abstract: The dominant sequence transduction models are based on complex recurrent 
    or convolutional neural networks that include an encoder and a decoder. The best 
    performing models also connect the encoder and decoder through an attention mechanism. 
    We propose a new simple network architecture, the Transformer, based solely on 
    attention mechanisms, dispensing with recurrence and convolutions entirely. 
    Experiments on two machine translation tasks show these models to be superior 
    in quality while being more parallelizable and requiring significantly less time to train.
    
    Introduction: Recurrent neural networks, long short-term memory and gated recurrent 
    neural networks in particular, have been firmly established as state of the art approaches 
    in sequence modeling and transduction problems such as language modeling and machine translation.
    """
    
    # Define the response format (JSON Schema)
    # Generate structured output
    messages = [
        {
            "role": "system",
            "content": "Extract paper title and abstract summary.",
        },
        {
            "role": "user",
            "content": paper_text,
        },
    ]
    
    completion = client.beta.chat.completions.parse(
        model="qwen-3-32b",
        messages=messages,
        response_format=PaperAnalysis,
    )
    
    # Get the parsed response as a Python object
    analysis = completion.choices[0].message.parsed
    
    print(f"Title: {analysis.title}")
    print(f"Abstract Summary: {analysis.abstract_summary}")
```

</hfoption>

</hfoptions>

</details>

## Next Steps

Now that you understand structured outputs, you probably want to build an application that uses them. Here are some ideas for fun things you can try out:

- **Different models**: Experiment with different models. The biggest models are not always the best for structured outputs!
- **Multi-turn conversations**: Maintaining structured format across conversation turns.
- **Complex schemas**: Building domain-specific schemas for your use case.
- **Performance optimization**: Choosing the right provider for your structured output needs.

