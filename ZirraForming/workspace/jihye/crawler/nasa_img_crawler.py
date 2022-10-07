from bs4 import BeautifulSoup as bs
from urllib.request import urlopen
import re
import pandas as pd
import uuid
import cv2
import numpy as np

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
    origin_file = ".\origin\\arcticdata.csv"
    df = pd.read_csv(origin_file)

    l = []
    for url in list(map(lambda x: "https://climate.nasa.gov"+x.img['src'], soup.find_all(class_="image"))):
        file_name = str(uuid.uuid1())
        with urlopen(url) as f:
            with open('./origin/' + file_name + '.jpg', 'wb') as h:
                img = f.read()  # 이미지 읽기
                h.write(img)  # 이미지 저장
            # 이미지 불러오기
            img = cv2.imread('./origin/' + file_name + '.jpg')
            # 변환 graky
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

            # 임계값 조절
            mask = cv2.threshold(gray, 250, 255, cv2.THRESH_BINARY)[1]

            # mask
            mask = 255 - mask

            # morphology 적용
            # borderconstant 사용
            kernel = np.ones((3, 3), np.uint8)
            mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)
            mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel)

            # anti-alias the mask
            # blur alpha channel
            mask = cv2.GaussianBlur(mask, (0, 0), sigmaX=2, sigmaY=2, borderType=cv2.BORDER_DEFAULT)

            # linear stretch so that 127.5 goes to 0, but 255 stays 255
            mask = (2 * (mask.astype(np.float32)) - 255.0).clip(0, 255).astype(np.uint8)

            # put mask into alpha channel
            result = img.copy()
            tmp = cv2.cvtColor(result, cv2.COLOR_RGB2GRAY)
            _, alpha = cv2.threshold(tmp, 0, 255, cv2.THRESH_BINARY)
            r, g, b = cv2.split(result)
            rgba = [r, g, b, alpha]
            dst = cv2.merge(rgba, 4)

            # 저장
            cv2.imwrite(f'./img/{file_name}.png', dst)
        l.append('http://j7d107.p.ssafy.io/images/'+file_name+'.png')
    df["img_url"] = l
    df.to_csv(".\data\\arcticdata-add-img.csv")



# get_co2()
# get_temperature()
# get_ice()

# df = pd.read_csv(".\data\\arcticdata-add-img.csv")
# df["img_url"] = list(map(lambda x: x+".png", list(df["img_url"])))
# df.to_csv(".\data\\arcticdata-add-img.csv")

