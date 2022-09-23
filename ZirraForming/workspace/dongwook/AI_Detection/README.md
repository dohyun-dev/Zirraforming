## 데이터 준비하기

1. 케글에서 데이터셋 모으기
   1. https://www.kaggle.com/datasets/mostafaabla/garbage-classification
   2. https://www.kaggle.com/datasets/asdasdasasdas/garbage-classification
2. 쓸 이미지만 남기고 삭제하기
   1. [cardboard, glass, metal, paper, plastic, trash, vinyl]
3. 파일 이름 형식 맞추기
4. 파일 라벨링하기
5. 이미지 파일 train, test, valid [7:1:2] 비율로 폴더로 옮기기
6. 데이터 증강하기

## 데이터 학습하기

1. 구글 드라이브에 zip파일과 yaml 파일 저장하기

   ```yaml
   path: /content/yolov5/custom_dataset #root 디렉토리
   train: train/images
   val: valid/images
   test: test/images
   
   nc: 9
   names:
     [
       "battery",
       "cardboard",
       "clothes",
       "glass",
       "metal",
       "paper",
       "plastic",
       "shoes",
       "trash",
     ]
   ```

2. yolov5 tutorial 코렙에 들어가서 학습하기

   1. https://colab.research.google.com/github/ultralytics/yolov5/blob/master/tutorial.ipynb#scrollTo=RBefG7TOZfFG

3. 코랩에서 googledrive mount하기

   ```python
   from google.colab import drive
   drive.mount('/content/drive')
   ```

4. 구글 드라이브에 있는 파일들 unzip해서 코랩으로 옮기기

   ```python
   %cd /content/drive/MyDrive/특화프로젝트 #root
   !unzip -qq "/content/drive/MyDrive/특화프로젝트/customdataset.zip"
   
   그 이후에 코랩 로컬에 custom_dataset 파일을 만들어
   언집했던 파일들 다옮기기
   ```

5. models/yolo.yaml 파일 수정하기

   ```python
   다 nc 값을 9로 맞춰주기 각 파일의 크기를 맞게 이동시켜 줘야한다
   ```

6. 데이터 학습하기

   ```python
   !python train.py --img 416 --batch 32 --epochs 15 --data "/content/yolov5/data/data.yaml" --weights yolov5s.pt --cache
   
   ## 학습결과 tesnsorboard로 확인
   %load_ext tensorboard
   %tensorboard --logdir /content/drive/MyDrive/특화프로젝트/yolov5/runs/train/exp13/
   ```

7. 학습 데이터 및 yolov5 google drive로 옮기기

   ```python
   파일에서 드라이브를 사본으로 저장하기
   ```

8. 파일 zip해서 옮기기

   ```python
   %cd /content/drive/MyDrive/특화프로젝트
   !zip -r /content/drive/MyDrive/특화프로젝트/yolov5.zip /content/drive/MyDrive/특화프로젝트/yolov5
   ```

9. detection하기

   ```python
   val_img_path = "/content/drive/MyDrive/특화프로젝트/test/images/battery109.jpg"
   
   !python detect.py --weights /content/drive/MyDrive/특화프로젝트/yolov5/runs/train/exp13/weights/best.pt --img 416 --conf 0.5 --source "{val_img_path}"
   ```

## 참고 URL

https://sguys99.github.io/ds01