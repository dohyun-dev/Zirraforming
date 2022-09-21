package com.ssafy.server.util;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Slf4j
@Component
public class FileStore {

    @Value("${file.dir}")
    private String fileDir;

    public String getFullPath(String filename){
        return fileDir + filename;
    }

    public String saveFile(@RequestParam MultipartFile file) throws IOException {
        if (file.isEmpty()){
            return null;
        }
        String originalFilename = file.getOriginalFilename();
        String storeFileName = createStoreFileName(originalFilename);

        checkFolder();

        file.transferTo(new File(getFullPath(storeFileName)));

        // 데이터베이스 저장 로직

        return storeFileName;
    }

    private void checkFolder() {
        File folder = new File(fileDir);
        if (!folder.exists()) {
            log.info("{} 폴더가 존재하지 않습니다.", fileDir);
            folder.mkdir();
            log.info("{} 폴더를 만들었습니다.", fileDir);
        }
    }

    private String createStoreFileName(String originalFilename) {
        String ext = extractExt(originalFilename);
        String uuid = UUID.randomUUID().toString();
        return uuid + "." + ext;
    }

    private String extractExt(String originalFilename) {
        int pos = originalFilename.lastIndexOf(".");
        return originalFilename.substring(pos + 1);
    }
}
