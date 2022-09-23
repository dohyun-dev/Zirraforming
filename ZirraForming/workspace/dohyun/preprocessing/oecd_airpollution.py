import pandas as pd

df = pd.read_csv("data/oecd.csv", low_memory=False)
# print(df)
condition1 = df["Country"].isin(["United States", "Japan", "Germany", "United Kingdom", "France", "Italy", "Canada", "Korea", "Australia", "Spain"])
condition2 = df["Year"] >= 1990
condition3 = df["Year"] < 2020
condition4 = df["VAR"] == "TOT"
df = df.loc[condition1 & condition2 & condition3 & condition4, ["Country", "POL", "Year", "Value"]]
print(df)
df.to_csv("result/oecd-result1.csv")