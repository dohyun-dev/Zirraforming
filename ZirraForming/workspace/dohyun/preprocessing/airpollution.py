import pandas as pd

airpollution = pd.read_csv("data/methane.csv")
nitrous_oxide = pd.read_csv("data/nitrous_oxide.csv")

airpollution = airpollution.loc[airpollution["Country"] == "World", ["Country", "Year", "Methane"]]
nitrous_oxide = nitrous_oxide.loc[nitrous_oxide["Country"] == "World", ["Nitrous_oxide"]]

airpollution["Nitrous_oxide"] = nitrous_oxide["Nitrous_oxide"]
airpollution.set_index("Country", drop=True, inplace=True)
airpollution.to_csv("result/air_pollution.csv")


