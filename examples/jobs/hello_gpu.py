# /// script
# dependencies = ["torch", "transformers"]
# ///

from transformers import pipeline

generator = pipeline(
    "text-generation",
    model="HuggingFaceTB/SmolLM2-360M-Instruct",
    dtype="float16",
)
messages = [{
    "role": "user",
    "content": "Suggest a name for a robot that helps people learn Python. Answer with only the name.",
}]
outputs = generator(messages, max_new_tokens=48, do_sample=False, return_full_text=False)
print(outputs[0]["generated_text"])
