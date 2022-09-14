import pandas as pd

df = pd.read_excel("data/arcticdata1.xlsx", index_col=1).loc[:, "extent"].to_csv("result/arcticdata1_preprocessing_result.csv")