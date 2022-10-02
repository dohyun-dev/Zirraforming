package com.ssafy.server.api.dto.member;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
public class NicknameChangeRequest {
    @NotBlank(message = "닉네임을 입력해주세요.")
    @Size(min = 2, max = 10, message = "닉네임은 2자리이상 10자리로 작성하여야 합니다.")
    @Pattern(regexp = "[\\w]+", message = "특수문자 사용은 불가능합니다.")
    private String nickname;
}
