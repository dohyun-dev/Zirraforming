package com.ssafy.server.api;

import com.ssafy.server.api.dto.common.ResultDto;
import com.ssafy.server.api.dto.member.DuplicatedCheckResultResponse;
import com.ssafy.server.api.dto.member.NicknameChangeRequest;
import com.ssafy.server.config.properties.TokenProperties;
import com.ssafy.server.domain.exception.InvalidJwtAccessException;
import com.ssafy.server.domain.exception.ValidationException;
import com.ssafy.server.domain.service.MemberService;
import com.ssafy.server.oauth.utils.CookieUtil;
import com.ssafy.server.oauth.utils.HeaderUtil;
import com.ssafy.server.util.AuthenticationUtil;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class MemberApiController {

    private final MemberService memberService;
    private final TokenProperties tokenProperties;
    private final AuthenticationUtil authenticationUtil;

    @PostMapping("/logout")
    public ResponseEntity<ResultDto> logout(HttpServletRequest request, HttpServletResponse response){
        CookieUtil.deleteCookie(request, response, "refreshToken");
        return ResponseEntity.ok(ResultDto.of("로그아웃이 완료되었습니다."));
    }

    @GetMapping("/duplicatedcheck")
    public ResponseEntity<DuplicatedCheckResultResponse> duplicatedCheck(@RequestParam("nickname") String nickname){
        if(memberService.duplicatedCheck(nickname)) {
            return ResponseEntity.ok(DuplicatedCheckResultResponse.of(true, "사용가능한 닉네임입니다."));
        }
        else {
            return ResponseEntity.ok(DuplicatedCheckResultResponse.of(false, "이미 사용 중인 닉네임입니다."));
        }
    }

    @PutMapping("/member/{memberId}/changenickname")
    public ResponseEntity<ResultDto> changeNickname(@PathVariable("memberId") Long memberId, @Valid @RequestBody NicknameChangeRequest nicknameChangeRequest, BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response) {
        // 요청 유저가 유효한 유저인지 확인
        if(authenticationUtil.getLoginMemberId() != memberId){
            throw new InvalidJwtAccessException(memberId);
        }

        if (bindingResult.hasErrors()) {
            throw new ValidationException(bindingResult);
        }
        memberService.changeNickname(memberId, nicknameChangeRequest.getNickname());

        addToken(memberId, request, response);
        return ResponseEntity.ok(ResultDto.of("닉네임이 변경되었습니다."));
    }

    @DeleteMapping("/member/{memberId}")
    public ResponseEntity<ResultDto> deleteMember(HttpServletRequest request, HttpServletResponse response, @PathVariable("memberId") Long memberId){
        CookieUtil.deleteCookie(request, response, "refreshToken");
        return ResponseEntity.ok(ResultDto.of("회원탈퇴가 완료되었습니다."));
    }

    @GetMapping("/reissue")
    public ResponseEntity<ResultDto> getReissue(HttpServletRequest request, HttpServletResponse response){
        Long memberId = authenticationUtil.getLoginMemberId();
        addToken(memberId, request, response);
        return ResponseEntity.ok(ResultDto.of("토큰이 재발급되었습니다."));
    }

    @Getter
    @AllArgsConstructor
    public static class ReissueResponse{
        private String accessToken;

        public static ReissueResponse of(String accessToken) {
            return new ReissueResponse(accessToken);
        }
    }

    private void addToken(Long memberId, HttpServletRequest request, HttpServletResponse response) {
        String tokenStr = HeaderUtil.getAccessToken(request);
        System.out.println(tokenStr);
        CookieUtil.addCookie(response, "accessToken", memberService.createAccessToken(memberId), (int)tokenProperties.getAuth().getTokenExpiry());
        CookieUtil.addCookie(response, "refreshToken", memberService.createRefreshToken(tokenStr, memberId), (int)tokenProperties.getAuth().getRefreshTokenExpiry());
    }
}

