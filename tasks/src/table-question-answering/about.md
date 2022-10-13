## Use Cases

### SQL execution

You can use the Table Question Answering models to simulate SQL execution by inputting a table. 

### Table Question Answering 

Table Question Answering models are capable of answering questions based on a table.

## Inference 

You can infer with TableQA models using the 🤗 Transformers library.

'''python 
from transformers import pipeline
import pandas as pd

# prepare table + question
data = {"Actors": ["Brad Pitt", "Leonardo Di Caprio", "George Clooney"], "Number of movies": ["87", "53", "69"]}
table = pd.DataFrame.from_dict(data)
question = "how many movies does Leonardo Di Caprio have?"

# pipeline model
# Note: you must to install torch-scatter first.
tqa = pipeline(task="table-question-answering", model="google/tapas-large-finetuned-wtq")

# result

print(tqa(table=table, query=query)['cells'][0])
#53

'''
