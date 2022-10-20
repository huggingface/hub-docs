## About the Task

Tabular regression is the task of predicting a numerical value given a set of attributes/features. *Tabular* meaning that data is stored in a table (like an excel sheet), and each sample is contained in its own row. The features used to predict our target can be both numerical and categorical. However, including categorical features often requires additional preprocessing/feature engineering (a few models do accept categorical features directly, like [CatBoost](https://catboost.ai/)). An example of tabular regression would be predicting the weight of a fish given its' species and length.

## Use Cases
Tabular data is one of the most prevalent data out there, and many raw-datasets once we extract features from them can be arrange in tabular form. Below you can find some of the popular tabular use-cases:-

- **Predicting a continuous target variable**: 
  When the data has been shared to us as a table, say in a spreadsheet in this case we can use the set of attributes/features to predict our target. Some popular examples like, predicting Taxi Fare based on distance traveled and time taken, predicting the Price of House based on number of rooms, square ft. area,  etc.

- **Filling Missing Values**:
  This would be a little different from above examples however, suppose you have a table of data with some values that missing across multiple columns and rows. Here the challenge we address is of filling in those missing values.  

## Metrics Used


## Model Hosting and Inference



## Useful Resources

- Starting with Tabular Data Regression:
    - Doing [Exploratory Data Analysis](https://neptune.ai/blog/exploratory-data-analysis-for-tabular-data) for tabular data.
   
    - Building your [first ML model](https://www.kaggle.com/code/dansbecker/your-first-machine-learning-model).

- Moving to other approaches:
    - A tutorial on using a set of decisions to split the data into different subsets (decision trees) and predict the target variable. You can check out this [example](https://medium.com/pursuitnotes/decision-tree-regression-in-6-steps-with-python-1a1c5aa2ee16).
    - [A Short Chronology of Deep Learning for Tabular Data](https://sebastianraschka.com/blog/2022/deep-learning-for-tabular-data.html) by Sebastian Raschka.

### Training your own model in just a few seconds
