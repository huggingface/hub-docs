# Function Calling with Inference Providers

Function calling enables language models to interact with external tools and APIs by generating structured function calls based on user input. This capability allows you to build AI agents that can perform actions like retrieving real-time data, making calculations, or interacting with external services.

When you provide a language model with function descriptions, it can decide when to call these functions based on user requests, execute them, and incorporate the results into natural language responses. For example, you can build an assistant that can fetch real-time weather data to provide responses.

<Tip>

This guide assumes you have a Hugging Face account and access token. If you don't have one, you can create a free account at [huggingface.co](https://huggingface.co) and get your token from your [settings page](https://huggingface.co/settings/tokens).

</Tip>

## Defining Functions

The first step is implementing the functions you want the model to call and defining their schemas. We'll use a simple weather function example that returns the current weather for a given location.

As always, we'll start by initializing the client for our inference client.

<hfoptions id="define-functions">
<hfoption id="openai">

In the OpenAI client, we'll use the `base_url` parameter to specify the provider we want to use for the request.

```python
import json
import os

from openai import OpenAI

# Initialize client
client = OpenAI(
    base_url="https://router.huggingface.co/v1",
    api_key=os.environ["HF_TOKEN"],
)
```

</hfoption>
<hfoption id="huggingface_hub">

In the Hugging Face Hub client, we'll use the `provider` parameter to specify the provider we want to use for the request.

```python
import json
import os

from huggingface_hub import InferenceClient

# Initialize client
client = InferenceClient(token=os.environ["HF_TOKEN"], provider="nebius")
```

</hfoption>
</hfoptions>

We can define the function as a Python function that performs a simple task. In this case, the function will return the current weather as a dictionary of location, temperature, and condition.

```python
# Define the function
def get_current_weather(location: str) -> dict:
    """Get weather information for a location."""
    # In production, this would call a real weather API
    weather_data = {
        "San Francisco": {"temperature": "22°C", "condition": "Sunny"},
        "New York": {"temperature": "18°C", "condition": "Cloudy"},
        "London": {"temperature": "15°C", "condition": "Rainy"},
    }
    
    return weather_data.get(location, {
        "location": location,
        "error": "Weather data not available"
    })
```


Now we need to define the function schema that describes our weather function to the language model. This schema tells the model what parameters the function expects and what it does:

```python

# Define the function schema
tools = [
    {
        "type": "function",
        "function": {
            "name": "get_current_weather",
            "description": "Get current weather for a location",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {
                        "type": "string", 
                        "description": "City name"
                    }
                },
                "required": ["location"],
            },
        },
    }
]
```

The schema is a JSON Schema format that describes what the function does, its parameters, and which parameters are required. The description helps the model understand when to call the function and how to call it.

## Handling Functions in Chats

Once you've defined your functions, you can include them in chat completions. The model will decide when to call them based on user input:

Functions work within typical chat completion conversations. The model will decide when to call them based on user input. 

```python
user_message = "What's the weather like in San Francisco?"

messages = [
    {
        "role": "system",
        "content": "You are a helpful assistant with access to weather data."
    },
    {"role": "user", "content": user_message}
]

# Initial API call with tools
response = client.chat.completions.create(
    model="deepseek-ai/DeepSeek-R1-0528",
    messages=messages,
    tools=tools,
    tool_choice="auto" # Let the model decide when to call functions
)

response_message = response.choices[0].message
```

<Tip>

The `tool_choice` parameter is used to control when the model calls functions. In this case, we're using `auto`, which means the model will decide when to call functions (0 or more times). Below we'll expand on `tool_choice` and other parameters.

</Tip>

Next, we need to check if the model wants to call functions. If it does, we need to execute the function and add the result to the conversation.

```python

# Check if model wants to call functions
if response_message.tool_calls:
    # Add assistant's response to messages
    messages.append(response_message)

    # Process each tool call
    for tool_call in response_message.tool_calls:
        function_name = tool_call.function.name
        function_args = json.loads(tool_call.function.arguments)

        # Execute the function
        if function_name == "get_current_weather":
            result = get_current_weather(function_args["location"])
            
            # Add function result to messages
            messages.append({
                "tool_call_id": tool_call.id,
                "role": "tool",
                "name": function_name,
                "content": json.dumps(result),
            })

    # Get final response with function results
    final_response = client.chat.completions.create(
        model="deepseek-ai/DeepSeek-R1-0528",
        messages=messages,
    )

    return final_response.choices[0].message.content
else:
    return response_message.content

```

The workflow is straightforward: make an initial API call with your tools, check if the model wants to call functions, execute them if needed, add the results to the conversation, and get the final response.

<Tip warning={true}>

We have handled that the model wants to call functions and that it is calling a function that exists. Models can call functions that don't exist, so we need to handle that case. We can also deal with this using `strict` mode, which we'll cover later.

</Tip>

## Multiple Functions

You can define multiple functions for more complex assistants:

```python
# Define multiple functions
def get_current_weather(location: str) -> dict:
    """Get current weather for a location."""
    return {"location": location, "temperature": "22°C", "condition": "Sunny"}

def get_weather_forecast(location: str, date: str) -> dict:
    """Get weather forecast for a location."""
    return {
        "location": location,
        "date": date,
        "forecast": "Sunny with chance of rain",
        "temperature": "20°C"
    }

# Function registry
AVAILABLE_FUNCTIONS = {
    "get_current_weather": get_current_weather,
    "get_weather_forecast": get_weather_forecast,
}

# Multiple tool schemas
tools = [
    {
        "type": "function",
        "function": {
            "name": "get_current_weather",
            "description": "Get current weather for a location",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {"type": "string", "description": "City name"}
                },
                "required": ["location"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "get_weather_forecast",
            "description": "Get weather forecast for a location",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {"type": "string", "description": "City name"},
                    "date": {"type": "string", "description": "Date in YYYY-MM-DD format"},
                },
                "required": ["location", "date"],
            },
        },
    }
]

response = client.chat.completions.create(
    model="deepseek-ai/DeepSeek-R1-0528",
    messages=messages,
    tools=tools,
    tool_choice="auto"
)

```

We have defined multiple functions and added them to the tools list. The model will decide when to call them based on user input. We can also use the `tool_choice` parameter to force the model to call a specific function.

We can handle the tool executions in a similar way to the single function example. This time using an `elif` statement to handle the different functions.

```python
# execute the response
response_message = response.choices[0].message

# check if the model wants to call functions
if response_message.tool_calls:
    # process the tool calls
    for tool_call in response_message.tool_calls:
        function_name = tool_call.function.name
        function_args = json.loads(tool_call.function.arguments)

        # execute the function
        if function_name == "get_current_weather":
            result = get_current_weather(function_args["location"])
        elif function_name == "get_weather_forecast":
            result = get_weather_forecast(function_args["location"], function_args["date"])

        # add the result to the conversation
        messages.append({
            "tool_call_id": tool_call.id,
            "role": "tool",
            "name": function_name,
            "content": json.dumps(result),
        })

    # get the final response with function results
    final_response = client.chat.completions.create(
        model="deepseek-ai/DeepSeek-R1-0528",
        messages=messages,
    )

    return final_response.choices[0].message.content
else:
    return response_message.content

```

🎉 You've built a functional assistant that can call multiple functions to get weather data!

## Additional Configuration

Let's look at some additional configuration options for function calling with Inference Providers, to make the most of the capabilities.

### Provider Selection

You can specify which inference provider to use for more control over performance and cost. This will pay off with function calling by reducing variance in the model's response.

<hfoptions id="provider-config">

In the OpenAI client, you can specify the provider you want to use for the request by setting the `base_url` parameter.

<hfoption id="openai">

```python
# The OpenAI client automatically routes through Inference Providers
# You can specify provider preferences in your HF settings
client = OpenAI(
+    base_url="https://router.huggingface.co/v1", # automatically select provider based on hf.co/settings/inference-providers
-    base_url="https://router.huggingface.co/together/v1", # manually select Together AI
-    base_url="https://router.huggingface.co/nebius/v1", # manually select Nebius
    api_key=os.environ["HF_TOKEN"],
)

```

</hfoption>

<hfoption id="huggingface_hub">

In the Hugging Face Hub client, you can specify the provider you want to use for the request by setting the `provider` parameter.

```python
# Specify a provider directly
client = InferenceClient(
    token=os.environ["HF_TOKEN"]
+    provider="auto"  # automatically select provider based on hf.co/settings/inference-providers
-    provider="together"  # manually select Together AI
-    provider="nebius"  # manually select Nebius
)

```

</hfoption>

</hfoptions>

By switching provider, you can see the model's response change because each provider uses a different configuration of the model.

<Tip warning={true}>

Each inference provider has different capabilities and performance characteristics. You can find more information about each provider in the [Inference Providers](/inference-providers/providers) section.

</Tip>

### Tool Choice Options

You can control when and which functions are called using the `tool_choice` parameter.

The `tool_choice` parameter is used to control when the model calls functions. In most cases, we're using `auto`, which means the model will decide when to call functions (0 or more times). 

```python
# Let the model decide (default)
response = client.chat.completions.create(
    model="deepseek-ai/DeepSeek-R1-0528",
    messages=messages,
    tools=tools,
    tool_choice="auto"  # Model decides when to call functions
)
```

However, in some use cases, you may want to force the model to call a function so that it never replies based on its own knowledge, but only based on the function call results.

```python
# Force the model to call at least one function
response = client.chat.completions.create(
    model="deepseek-ai/DeepSeek-R1-0528",
    messages=messages,
    tools=tools,
    tool_choice="required"  # Must call at least one function
)
```

This works well if you have simple functions, but if you have more complex functions, you may want to use the `tool_choice` parameter to force the model to call a specific function at least once.

<hfoptions id="tool-choice-options">

<hfoption id="openai">

For example, let's say you assistant's only job is to give the weather for a given location. You may want to force the model to call the `get_current_weather` function, and not call any other functions.

```python
# Force a specific function call
response = client.chat.completions.create(
    model="deepseek-ai/DeepSeek-R1-0528",
    messages=messages,
    tools=tools,
    tool_choice={
        "type": "function",
        "function": {"name": "get_current_weather"}
    }
)
```

Here, we're forcing the model to call the `get_current_weather` function, and not call any other functions.

</hfoption>

<hfoption id="huggingface_hub">

<Tip warning={true}>

Hugging Face Hub does not support the `tool_choice` parameters that specify which function to call.

</Tip>

</hfoption>

</hfoptions>

### Strict Mode

Use strict mode to ensure function calls follow your schema exactly. This is useful to prevent the model from calling functions with unexpected arguments, or calling functions that don't exist.

```python
# Define tools with strict mode
tools = [
    {
        "type": "function",
        "function": {
            "name": "get_current_weather",
            "description": "Get current weather for a location",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {"type": "string", "description": "City name"},
                },
                "required": ["location"],
+                "additionalProperties": False,  # Strict mode requirement
            },
+            "strict": True,  # Enable strict mode
        },
    }
]
```

Strict mode ensures that function arguments match your schema exactly: no additional properties are allowed, all required parameters must be provided, and data types are strictly enforced.

<Tip warning={true}>

Strict mode is not supported by all providers. You can check the provider's documentation to see if it supports strict mode.

</Tip>

### Streaming Responses

Enable streaming for real-time responses with function calls. This is useful to show the model's progress to the user, or to handle long-running function calls more efficiently. 

```python
# Enable streaming with function calls
stream = client.chat.completions.create(
    model="deepseek-ai/DeepSeek-R1-0528",
    messages=messages,
    tools=tools,
    tool_choice="auto",
    stream=True  # Enable streaming
)

# Process the stream
for chunk in stream:
    if chunk.choices[0].delta.tool_calls:
        # Handle tool call chunks
        tool_calls = chunk.choices[0].delta.tool_calls
    
    if chunk.choices[0].delta.content:
        # Handle content chunks
        content = chunk.choices[0].delta.content
```

Streaming allows you to process responses as they arrive, show real-time progress to users, and handle long-running function calls more efficiently.

<Tip warning={true}>

Streaming is not supported by all providers. You can check the provider's documentation to see if it supports streaming.

</Tip>

# Next Steps

Now that you've seen how to use function calling with Inference Providers, you can start building your own assistants! Why not try out some of these ideas:

- Try smaller models for faster responses and lower costs
- Build an agent that can fetch real-time data 
- Use a reasoning model to build an agent that can reason with external tools

