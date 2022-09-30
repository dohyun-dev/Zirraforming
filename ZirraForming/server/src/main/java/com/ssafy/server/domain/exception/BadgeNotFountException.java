package com.ssafy.server.domain.exception;

public class BadgeNotFountException extends RuntimeException{
    private final Long badgeType;

    public BadgeNotFountException(Long badgeType) {
        super("해당하는 뱃찌 유형을 찾을 수 없습니다.");
        this.badgeType = badgeType;
    }
}
