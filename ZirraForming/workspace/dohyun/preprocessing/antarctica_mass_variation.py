import pandas as pd
import math

df = pd.read_csv("data/antarctica_mass_variation.csv", index_col=0).loc[:, ["month", "mass"]]
df.loc[:, "month"] = df.loc[:, "month"] * 365
df.loc[:, "month"] = df.loc[:, "month"] / 100
df.loc[:, "month"] = df.loc[:, "month"] / 30
df.loc[:, "month"] = df.loc[:, "month"] + 1
# df.loc[:, "month"] = df.loc[:, "month"].apply(math.ceil)
df.loc[:, "month"] = df.loc[:, "month"].apply(int)
df.to_csv("result/antarctica_mass_variation_preprocessing_result.csv")