## About the Task

Tabular classification is the task of assigning a label or class given a limited number of attributes. For example, the input can be data related to a customer (balance of the customer, the time being a customer, or more) and the output can be whether the customer will churn from the service or not.
There are three types of categorical variables:

- Binary variables: Variables that can take two values, like yes or no, open or closed. The task of predicting binary variables is called binary classification.
- Ordinal variables: Variables with a ranking relationship, e.g., good, insignificant, and bad product reviews. The task of predicting ordinal variables is called ordinal classification.
- Nominal variables: Variables with no ranking relationship among them, e.g., predicting an animal from their weight and height, where categories are cat, dog, or bird. The task of predicting nominal variables is called multinomial classification.

## Use Cases

### Fraud Detection
Tabular classification models can be used in detecting fraudulent credit card transactions, where the features could be the amount of the transaction and the account balance, and the target to predict could be whether the transaction is fraudulent or not. This is an example of binary classification.

### Churn Prediction
Tabular classification models can be used in predicting customer churn in telecommunication. An example dataset for the task is hosted [here](https://huggingface.co/datasets/scikit-learn/churn-prediction).

## Model Hosting and Inference

You can use the [skops](https://github.com/skops-dev/skops) library to share, explore, and use `scikit-learn` models on the Hugging Face Hub. `skops` models have widgets to try the models on the browser and have descriptive reports (also known as model cards) in their repositories. You can pull a `scikit-learn` model like below using `skops`:


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

We have built a [baseline trainer](https://huggingface.co/spaces/scikit-learn/baseline-trainer) application to which you can drag and drop your dataset. It will train a baseline and push it to your Hugging Face Hub profile with a model card containing information about the model.