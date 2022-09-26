from bs4 import BeautifulSoup as bs
from urllib.request import urlopen
import re
import pandas as pd


def get_co2():
    html = urlopen("https://climate.nasa.gov/vsoverlay-carbon-dioxide/?layout=empty&override_preview=true")
    soup = bs(html, "html.parser")

    img_tag = soup.find_all(class_="image")
    with open("./data/co2img.csv", "w") as f:
        f.write("year, month, imgURL\n")
        p = re.compile("20+\d+[_]+\d+")
        for img in img_tag:
            img_url = ", https://climate.nasa.gov"+img.img['src']
            date = p.search(img_url).group(0).replace("_", ", ")
            f.write(date+img_url+"\n")

def get_temperature():
    html = urlopen("https://climate.nasa.gov/vsoverlay-global-temperature/?layout=empty&override_preview=true")
    soup = bs(html, "html.parser")
    origin_file = ".\data\surface-temper.csv"

    df = pd.read_csv(origin_file)
    img_list = list(map(lambda x: "https://climate.nasa.gov"+x.img['src'], soup.find_all(class_="image")))
    img_list += img_list[-4:]
    df["img_url"] = img_list
    df.to_csv(".\data\ssurface-temper-add-img.csv")

def get_ice():
    html = urlopen("https://climate.nasa.gov/vsoverlay-arctic-sea-ice/?layout=empty&override_preview=true")
    soup = bs(html, "html.parser")
    origin_file = ".\\data\\arcticdata1_preprocessing_result.csv"

    df = pd.read_csv(origin_file)
    img_list = list(map(lambda x: "https://climate.nasa.gov"+x.img['src'], soup.find_all(class_="image")))
    df["img_url"] = img_list
    df.to_csv(".\\data\\arcticdata1_preprocessing_result.csv")


# get_co2()
# get_temperature()
get_ice()
