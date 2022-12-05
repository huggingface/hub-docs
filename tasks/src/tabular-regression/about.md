## About the Task

Tabular regression is the task of predicting a numerical value given a set of attributes/features. *Tabular* meaning that data is stored in a table (like an excel sheet), and each sample is contained in its own row. The features used to predict our target can be both numerical and categorical. However, including categorical features often requires additional preprocessing/feature engineering (a few models do accept categorical features directly, like [CatBoost](https://catboost.ai/)). An example of tabular regression would be predicting the weight of a fish given its' species and length.

## Use Cases
Whenever we have a set of variables recorded in a table and use them, we try to predict a target variable; this kind of scenario could be classified as tabular regression. Some of the popular tabular use cases are:

- **Predicting a continuous target variable**: 
  Here the objective is to predict a continuous variable based on a set of input variable(s). For example, predicting `sales` of an ice cream shop based on `temperature` of weather and `duration of hours` shop was open. Here we can build a regression model with `temperature` and `duration of hours` as input variable and `sales` as target variable.

- **Filling Missing Values**:
  - In real-world applications, due to human error or other reasons, some of the input values can be missing or there might not be any recorded data. 
  - Considering the example above, say the shopkeeper's watch was broken and they forgot to calculate the `hours` for which the shop was open. This will lead to a missing value in their dataset.
  - In this case, missing values could be replaced it with zero, or average hours for which the shop is kept open. Another approach we can try is to use `temperature` and `sales` variables to predict the `hours` variable here.

## Metrics Used


## Model Hosting and Inference


## Useful Resources

- For starting with tabular regression:
    - Doing [Exploratory Data Analysis](https://neptune.ai/blog/exploratory-data-analysis-for-tabular-data) for tabular data. 
      - The data considered here consists of details of Olympic athletes and medal results from Athens 1896 to Rio 2016. 
      - Here you can learn more about how to explore and analyse the data and visualize them in order to get a better understanding of dataset.
    - Building your [first ML model](https://www.kaggle.com/code/dansbecker/your-first-machine-learning-model).

- Intermediate level tutorials on tabular regression:
    - [A Short Chronology of Deep Learning for Tabular Data](https://sebastianraschka.com/blog/2022/deep-learning-for-tabular-data.html) by Sebastian Raschka.

