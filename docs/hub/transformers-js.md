# Using `Transformers.js` at Hugging Face

Transformers.js is a JavaScript library for running 🤗 Transformers directly in your browser, with no need for a server! It is designed to be functionally equivalent to the [python library](https://github.com/huggingface/transformers), meaning you can run the same pretrained models using a very similar API.

## Exploring transformers.js in the Hub

You can find `transformers.js` models by filtering at the left of the [models page](https://huggingface.co/models?library=transformers.js).



## Quick tour


It's super simple to translate from existing code! Just like the Python library, we support the `pipeline` API. Pipelines group together a pretrained model with preprocessing of inputs and postprocessing of outputs, making it the easiest way to run models with the library.

<table>
<tr>
<th width="440px" align="center"><b>Python (original)</b></th>
<th width="440px" align="center"><b>Javascript (ours)</b></th>
</tr>
<tr>
<td>

```python
from transformers import pipeline

# Allocate a pipeline for sentiment-analysis
pipe = pipeline('sentiment-analysis')

out = pipe('I love transformers!')
# [{'label': 'POSITIVE', 'score': 0.999806941}]
```

</td>
<td>

```javascript
import { pipeline } from '@xenova/transformers';

// Allocate a pipeline for sentiment-analysis
let pipe = await pipeline('sentiment-analysis');

let out = await pipe('I love transformers!');
// [{'label': 'POSITIVE', 'score': 0.999817686}]
```

</td>
</tr>
</table>


You can also use a different model by specifying the model id or path as the second argument to the `pipeline` function. For example:
```javascript
// Use a different model for sentiment-analysis
let pipe = await pipeline('sentiment-analysis', 'nlptown/bert-base-multilingual-uncased-sentiment');
```

Refer to the [documentation](https://huggingface.co/docs/transformers.js) for the full list of supported tasks and models.

## Installation

To install via [NPM](https://www.npmjs.com/package/@xenova/transformers), run:
```bash
npm i @xenova/transformers
```

For more information, including how to use it in vanilla JS (without any bundler) via a CDN or static hosting, refer to the [README](https://github.com/xenova/transformers.js/blob/main/README.md#installation).


## Additional resources

* Transformers.js [repository](https://github.com/xenova/transformers.js)
* Transformers.js [docs](https://huggingface.co/docs/transformers.js)
* Transformers.js [demo](https://xenova.github.io/transformers.js/)
