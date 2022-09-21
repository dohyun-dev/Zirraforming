package com.ssafy.server.util;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.util.ReflectionTestUtils;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

@ActiveProfiles("local")
@DisplayName("이미지 저장 & 조회 테스트")
class FileStoreTest {

    FileStore fileStore = new FileStore();

    @BeforeEach
    public void setUp() {
        ReflectionTestUtils.setField(fileStore, "fileDir", "C:/zirraforming/images/");
    }

    @Test
    void saveFile() throws IOException {
        //given
        ClassPathResource resource = new ClassPathResource ("/img/test.jpg");
        MockMultipartFile file = new MockMultipartFile("image", "test.jpg", "image/jpg", new FileInputStream(resource.getFile()));

        //when
        String storedFile = fileStore.saveFile(file);

        //then
        File findFile = new File(fileStore.getFullPath(storedFile));
        Assertions.assertThat(storedFile).isEqualTo(findFile.getName());
    }
}