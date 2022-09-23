file_extension = input("파일의 확장자를 입력해주세요 : ")
file_name = input("파일 이름을 입력해주세요 : ")
file_start_number = int(input("시작 번호를 입력해주세요 : "))
file_end_number = int(input("끝 번호를 입력해주세요 : "))
file_labeling_number = int(input("labeling 번호를 입력해 주세요 : "))

for i in range(file_start_number, file_end_number+1):
    f = open(f"{file_name}{i}.{file_extension}", "w")
    f.write(f"{file_labeling_number} 0.5 0.5 1 1")
    f.close
