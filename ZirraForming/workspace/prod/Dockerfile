FROM python:3.9

WORKDIR /app

RUN ["apt-get", "update"]

RUN ["apt-get", "-y", "install", "libgl1-mesa-glx"]

RUN ["mkdir", "images"]

COPY . .

RUN ["pip", "install", "-r", "requirements.txt"]

CMD uvicorn --host=0.0.0.0 --port=8000 main:app --reload
