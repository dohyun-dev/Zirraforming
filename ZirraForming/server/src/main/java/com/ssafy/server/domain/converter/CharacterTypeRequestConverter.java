package com.ssafy.server.domain.converter;

import com.ssafy.server.domain.dto.CharacterTypeEnum;
import org.springframework.core.convert.converter.Converter;

public class CharacterTypeRequestConverter implements Converter<String, CharacterTypeEnum> {

    private static final CharacterTypeEnum[] check = CharacterTypeEnum.values();

    @Override
    public CharacterTypeEnum convert(String source) {
        return check[Integer.valueOf(source)-1];
    }
}
