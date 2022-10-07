package com.ssafy.server.domain.converter;

import com.ssafy.server.domain.dto.CharacterTypeEnum;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;

class CharacterTypeRequestConverterTest {

    @Test
    public void CharacterTypeRequestConverterTest() throws Exception {
        CharacterTypeRequestConverter characterTypeRequestConverter = new CharacterTypeRequestConverter();
        CharacterTypeEnum convert = characterTypeRequestConverter.convert("1");
        Assertions.assertThat(convert).isEqualTo(CharacterTypeEnum.주디);
    }
}