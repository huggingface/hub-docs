## Use Cases

### SQL execution

You can use Table Question Answering model to simulate SQL execution by using provided table.

### Table Question Answering 

Given the question and the table, the task is to answer the question based on the table, You can use Table Question Answering model to answer question based on the table. 

## Inference 

You can infer with TableQA models with the 🤗 Transformers library.

'''python 
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import pandas as pd

tokenizer = AutoTokenizer.from_pretrained("microsoft/tapex-large-finetuned-wtq")
model = AutoModelForSeq2SeqLM.from_pretrained("microsoft/tapex-large-finetuned-wtq")

# prepare table + question
data = {"Actors": ["Brad Pitt", "Leonardo Di Caprio", "George Clooney"], "Number of movies": ["87", "53", "69"]}
table = pd.DataFrame.from_dict(data)
question = "how many movies does Leonardo Di Caprio have?"

encoding = tokenizer(table, question, return_tensors="pt")

# let the model generate an answer autoregressively
outputs = model.generate(**encoding)

# decode back to text
predicted_answer = tokenizer.batch_decode(outputs, skip_special_tokens=True)[0]
print(predicted_answer)
#53

'''
