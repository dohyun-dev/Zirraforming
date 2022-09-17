package com.ssafy.server.domain.exception;

public class CharacterTypeNotFoundException extends RuntimeException {

    private final String characterTypeName;
    public CharacterTypeNotFoundException(String characterTypeName) {
        super("해당하는 캐릭터 유형을 찾을 수 없습니다.");
        this.characterTypeName = characterTypeName;
    }
}
