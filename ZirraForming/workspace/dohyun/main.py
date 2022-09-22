import uuid, os

from fastapi import FastAPI, Form, UploadFile

app = FastAPI()

@app.post("/treshresult")
async def detect_tresh(file: UploadFile):
    UPLOAD_DIR = "./images"

    content = await file.read()
    filename = f"{str(uuid.uuid4())}.jpg"

    with open(os.path.join(UPLOAD_DIR, filename), "wb") as fp:
        fp.write(content)

    return { "message": "저장이 완료되었습니다."}

