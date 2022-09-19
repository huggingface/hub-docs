## About the Task

Tabular classification is the task of predicting a variable that can take limited number of values. This type of variable is called a categorical variable. Tabular classification models take a table of data as input and output a category. For example, input can be attributes of a customer (balance of the customer, their education status, or more) and output can be whether customer churns or not.
There's three types of categorical variables:

- Binary variables: Variables that can take two values, like yes or no, open or closed. The task of predicting binary variables is called binary classification.
- Ordinal variables: Variables that have a ranking relationship among them, e.g. good, insignificant and bad product reviews. The task of predicting ordinal variables is called ordinal classification.
- Nominal variables: Variables that have no ranking relationship among them, e.g. predicting an animal from their weight and height, where categories are cat, dog or bird. The task of predicting nominal variables is called multinomial classification.

## Use Cases

### Fraud Detection
Tabular classification models can be used in detecting fraudulent credit card transactions, where the features could be the amount of the transaction and the account balance, and the target to predict could be whether the transaction is fraudulent or not. This is an example of binary classification.

### Churn Prediction
Tabular classification models can be used in predicting customer churn in telecommunication. An example dataset for the task is hosted [here](https://huggingface.co/datasets/scikit-learn/churn-prediction).

## Model Hosting and Inference

You can use the [skops](https://github.com/skops-dev/skops) library to host or use `scikit-learn` models on Hugging Face Hub. `skops` models have widgets working out-of-the-box and have descriptive reports (also known as model cards) in their repositories. You can also push the model and the related files using `skops`. You can pull a `scikit-learn` `tabular-classification` model like below using `skops`:


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

We have built a [baseline trainer](https://huggingface.co/spaces/scikit-learn/baseline-trainer) application that you can drag and drop your dataset to, and it will train a baseline and push it to your Hugging Face Hub profile with model card containing information about the model.