import shutil

filename = input("어떤 종류의 쓰레기사진을 옮길지 적으시오 : ")
start_number = int(input("파일 시작번호가 몇번인지 적으시오 : "))
end_number = int(input("파일 끝번호가 몇번인지 적으시오 : "))


images_src = f'{filename}/images/'
label_src = f'{filename}/label/'

for i in range(start_number, end_number+1):
    # valid
    if i % 10 in [7,8]:
        shutil.move(f'{images_src}{filename}{i}.jpg', 'valid/images/')
        shutil.move(f'{label_src}{filename}{i}.txt', 'valid/labels/')

    # test
    elif i % 10 == 9:
        shutil.move(f'{images_src}{filename}{i}.jpg', 'test/images/')
        shutil.move(f'{label_src}{filename}{i}.txt', 'test/labels/')

    # train
    else:
        shutil.move(f'{images_src}{filename}{i}.jpg', 'train/images/')
        shutil.move(f'{label_src}{filename}{i}.txt', 'train/labels/') 