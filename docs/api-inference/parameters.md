# Parameters

Table with 
- Domain
- Task
- Whether it's supported in Inference API
- Supported libraries (not sure)
- Recommended model
- Link to model specific page



## Additional Options

### Caching

There is a cache layer on the inference API to speed up requests when the inputs are exactly the same. Many models, such as classifiers and embedding models, can use those results as is if they are deterministic, meaning the results will be the same. Howevr, if you use a nondeterministic model, you can disable the cache mechanism from being used, resulting in a real new query.

To do this, you can add `x-use-cache:false` to the request headers. For example

<inferencesnippet>

<curl>
```bash
curl https://api-inference.huggingface.co/models/MODEL_ID \
    -X POST \
    -d '{"inputs": "Can you please let us know more details about your "}' \
    -H "Authorization: Bearer hf_***" \
    -H "Content-Type: application/json" \
    -H "x-use-cache: false"
```
</curl>

<python>
```python
import requests

API_URL = "https://api-inference.huggingface.co/models/MODEL_ID"
headers = {
    "Authorization": "Bearer hf_***",
    "Content-Type": "application/json",
    "x-use-cache": "false"
}
data = {
    "inputs": "Can you please let us know more details about your "
}
response = requests.post(API_URL, headers=headers, json=data)
print(response.json())
```

</python>

<js>
```js
import fetch from "node-fetch";

async function query(data) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/MODEL_ID",
        {
            method: "POST",
            headers: {
                Authorization: `Bearer hf_***`,
                "Content-Type": "application/json",
                "x-use-cache": "false"
            },
            body: JSON.stringify(data),
        }
    );
    const result = await response.json();
    return result;
}

query({
    inputs: "Can you please let us know more details about your "
}).then((response) => {
    console.log(JSON.stringify(response, null, 2));
});

```

</js>

</inferencesnippet>

### Wait for the model

When a model is warm, it is ready to be used and you will get a response relatively quickly. However, some models are cold and need to be loaded before they can be used. In that case, you will get a 503 error. Rather than doing many requests until it's loaded, you can wait for the model to be loaded by adding `x-wait-for-model:true` to the request headers. We suggest to only use this flag to wait for the model to be loaded when you are sure that the model is cold. That means, first try the request without this flag and only if you get a 503 error, try again with this flag.


<inferencesnippet>

<curl>
```bash
curl https://api-inference.huggingface.co/models/MODEL_ID \
    -X POST \
    -d '{"inputs": "Can you please let us know more details about your "}' \
    -H "Authorization: Bearer hf_***" \
    -H "Content-Type: application/json" \
    -H "x-wait-for-model: true"
```
</curl>

<python>
```python
import requests

API_URL = "https://api-inference.huggingface.co/models/MODEL_ID"
headers = {
    "Authorization": "Bearer hf_***",
    "Content-Type": "application/json",
    "x-wait-for-model": "true"
}
data = {
    "inputs": "Can you please let us know more details about your "
}
response = requests.post(API_URL, headers=headers, json=data)
print(response.json())
```

</python>

<js>
```js
import fetch from "node-fetch";

async function query(data) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/MODEL_ID",
        {
            method: "POST",
            headers: {
                Authorization: `Bearer hf_***`,
                "Content-Type": "application/json",
                "x-wait-for-model": "true"
            },
            body: JSON.stringify(data),
        }
    );
    const result = await response.json();
    return result;
}

query({
    inputs: "Can you please let us know more details about your "
}).then((response) => {
    console.log(JSON.stringify(response, null, 2));
});

```

</js>

</inferencesnippet>