## About the Task

Tabular regression is the task of predicting a numerical value given a set of attributes/features. *Tabular* meaning that data is stored in a table (like an excel sheet), and each sample is contained in its own row. The features used to predict our target can be both numerical and categorical. However, including categorical features often requires additional preprocessing/feature engineering (a few models do accept categorical features directly, like [CatBoost](https://catboost.ai/)). An example of tabular regression would be predicting the weight of a fish given its' species and length.

## Use Cases
Whenever we have a set of variables recorded in a table and using them we try to predict a target variable, this kind of scenario could come under tabular regression. Some of the popular tabular use-cases are:

- **Predicting a continuous target variable**: 
  - It is used in case when we have to predict a continuous variable based on a set of input variable(s).
  - For example, say we want to predict the `sales` of an Ice-Cream shop based on `temperature` and `hours` shop was open. Here we can build a regression model with `temperature` and `hours` as input variable and `sales` as target variable.

- **Filling Missing Values**:
  - In real-world due to human error or other reasons some of the value can be missing or there might be some problem due to which no data was recorded. 
  - Consider the example above, say the shopkeeper watch was broken and they forgot to calculate the `hours` for which the shop was open. This will lead to a missing value in their dataset.
  - Here some ways to handle this missing value could be filling it with zero, replacing with average hours for which shop is kept open, etc,
  - Another approach we can try is use `temperature` and `sales` variables to predict the `hours` variable here.

## Metrics Used


## Model Hosting and Inference



## Useful Resources

- For starting with Tabular Data Regression:
    - Doing [Exploratory Data Analysis](https://neptune.ai/blog/exploratory-data-analysis-for-tabular-data) for tabular data.
    - Building your [first ML model](https://www.kaggle.com/code/dansbecker/your-first-machine-learning-model).

- Moving to other approaches:
    - A tutorial on using a set of decisions to split the data into different subsets (decision trees) and predict the target variable. You can check out this [example](https://medium.com/pursuitnotes/decision-tree-regression-in-6-steps-with-python-1a1c5aa2ee16).
    - [A Short Chronology of Deep Learning for Tabular Data](https://sebastianraschka.com/blog/2022/deep-learning-for-tabular-data.html) by Sebastian Raschka.

### Training your own model in just a few seconds
