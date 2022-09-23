import os

file_extension = input("확장자를 입력하세요")

filename = input("filename을 입력하세요")
filename_startnumber = int(input("파일의 시작번호를 입력하세요"))
filename_endnumber = int(input("파일의 끝번호를 입력하세요"))

changename = input("바꿀이름을 입력하세요")

filerename_startnumber = int(input("바꿀번호의 시작번호를 입력하세요"))
# 주어진 파일에 접근하기
for i in range(filename_startnumber, filename_endnumber+1):
    number = i + filerename_startnumber - 1
    os.rename(f'{filename}{i}.{file_extension}', f"{changename}{number}.{file_extension}")
