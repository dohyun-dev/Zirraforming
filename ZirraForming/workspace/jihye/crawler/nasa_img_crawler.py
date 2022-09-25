from bs4 import BeautifulSoup as bs
from urllib.request import urlopen
import re

url = "https://climate.nasa.gov/vsoverlay-carbon-dioxide/?layout=empty&override_preview=true"
html = urlopen(url)
soup = bs(html, "html.parser")

img_tag = soup.find_all(class_="image")
with open("./data/co2img.csv", "w") as f:
    f.write("year, month, imgURL\n")
    p = re.compile("20+\d+[_]+\d+")
    for img in img_tag:
        img_url = ", https://climate.nasa.gov"+img.img['src']
        date = p.search(img_url).group(0).replace("_", ", ")
        f.write(date+img_url+"\n")
