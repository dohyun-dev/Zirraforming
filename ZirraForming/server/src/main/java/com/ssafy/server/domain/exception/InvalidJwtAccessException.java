package com.ssafy.server.domain.exception;

public class InvalidJwtAccessException  extends RuntimeException {
    private final Long memberId;

    public InvalidJwtAccessException(Long memberId) {
        super("변경 권한이 없습니다.");
        this.memberId = memberId;
    }
}
