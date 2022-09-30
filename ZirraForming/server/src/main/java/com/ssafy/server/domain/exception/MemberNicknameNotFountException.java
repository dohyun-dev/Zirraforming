package com.ssafy.server.domain.exception;

public class MemberNicknameNotFountException extends RuntimeException {

    private final String memberNickname;

    public MemberNicknameNotFountException(String memberNickname) {
        super("요청하신 회원정보가 존재하지 않습니다.");
        this.memberNickname = memberNickname;
    }
}
