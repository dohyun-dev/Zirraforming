package com.ssafy.server.domain.exception;

public class MemberNotFountException extends RuntimeException {

    private final Long memberId;

    public MemberNotFountException(Long memberId) {
        super("요청하신 회원정보가 존재하지 않습니다.");
        this.memberId = memberId;
    }
}
