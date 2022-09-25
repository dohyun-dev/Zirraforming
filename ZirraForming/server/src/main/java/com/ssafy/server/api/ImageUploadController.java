package com.ssafy.server.api;

import com.ssafy.server.api.dto.common.ResultDto;
import com.ssafy.server.util.FileStore;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Slf4j
@RestController
@RequestMapping("/api/images")
@RequiredArgsConstructor
public class ImageUploadController {

    private final FileStore fileStore;

    @PostMapping("/upload")
    public ResponseEntity<ResultDto> saveFile(@RequestParam MultipartFile file) throws IOException {
        log.info("multipartFile={}", file);
        fileStore.saveFile(file);
        return ResponseEntity.ok(ResultDto.of("이미지가 저장되었습니다."));
    }

    @GetMapping("{filename}")
    public String findFile(@PathVariable String filename) {
        return fileStore.getFullPath(filename);
    }
}
