import os

import uuid
import uvicorn

from urllib import request
from fastapi import FastAPI
from pydantic import BaseModel
from yolov5.detect import run

class Image(BaseModel):
    imageUrl: str


app = FastAPI()

@app.get("/")
def test():
    return {"hello": "word"}


@app.post("/treshresult")
async def detect_tresh(image: Image):
    UPLOAD_DIR = "/app/images/"
    FILENAME = f"{str(uuid.uuid4())}.jpg"
    RESULT_PATH = UPLOAD_DIR+FILENAME

    request.urlretrieve(image.imageUrl, RESULT_PATH)
    result = run(source=RESULT_PATH)

    if os.path.exists(RESULT_PATH):
        os.remove(RESULT_PATH)
    return {"result":result}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
