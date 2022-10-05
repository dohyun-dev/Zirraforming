package com.ssafy.server.api.dto.member;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
public class NicknameChangeRequest {
    @Pattern(regexp = "^[ㄱ-ㅎ가-힣a-z0-9-_]{2,6}$", message = "닉네임은 특수문자를 제외한 2~6자리여야 합니다.")
    private String nickname;
}
