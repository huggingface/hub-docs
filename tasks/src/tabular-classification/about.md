## Use Cases

### Fraud Detection
Tabular classification models can be used in detecting fraudulent credit card transactions, where features can be amount of the transaction and account balance, and target to predict is whether the transaction is fraudulent or not. 

### Churn Prediction
Tabular classification models can be used in predicting customer churn in telecommunication. An example dataset for the task is hosted [here](https://huggingface.co/datasets/scikit-learn/churn-prediction).

## Model Hosting and Inference

You can use the [Skops](https://github.com/skops-dev/skops) library to host `scikit-learn` models on Hugging Face Hub. With `Skops`, you can automatically generate a configuration for your model that includes the information needed to enable the widget on Hugging Face Hub and the requirements needed to infer the model. `Skops` also generates a model card including a hyperparameter table and plot of the model, that you can later add information programmatically. You can push the model and the related files using Skops. The repository contains the configuration file, model card and the model. You can pull a `scikit-learn` `tabular-classification` model like below:


```python
from skops import hub_utils
import joblib

hub_utils.download(repo_id="user-name/my-awesome-model", dst=target_path)
model = joblib.load(Path(target_path)/"model.pkl")
model.predict(sample)
```


## Useful Resources

- Check out [scikit-learn organization](https://huggingface.co/scikit-learn) to learn more about different algorithms used for this task.
- [Skops documentation](https://skops.readthedocs.io/en/latest/)
- [Skops announcement blog](https://huggingface.co/blog/skops)

### Training your own model in just a few seconds

We have built a [baseline trainer](https://huggingface.co/spaces/scikit-learn/baseline-trainer) application that you can drag and drop your dataset to, and it will train a baseline and push it to your Hugging Face Hub profile with automatically generated model card.