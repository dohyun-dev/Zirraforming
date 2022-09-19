package com.ssafy.server.domain.service;

import com.ssafy.server.domain.entity.Member;
import com.ssafy.server.domain.repository.MemberRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
@DisplayName("멤버 테스트")
class MemberServiceTest {

    @InjectMocks
    private MemberService memberService;
    @Mock
    private MemberRepository memberRepository;

    @DisplayName("멤버 닉네임 중복 체크")
    @Test
    void duplicatedCheck() {
        // given
        Member testData = Member.of("testemail", "testnickname1");
        given(memberRepository.findByNickname("testnickname1")).willReturn(Optional.of(testData));

        // when
        boolean result1 = memberService.duplicatedCheck("testnickname1");
        boolean result2 = memberService.duplicatedCheck("nickname");

        // then
        Assertions.assertThat(result1).isFalse();
        Assertions.assertThat(result2).isTrue();
    }

    @DisplayName("멤버 닉네임 변경")
    @Test
    void changeNickname() {
        // given
        Long testId = 1L;
        Member testData = Member.of("testemail", "nickname0");
        given(memberRepository.findById(testId)).willReturn(Optional.of(testData));

        // when
        memberService.changeNickname(testId, "nickname1");

        // then
        Assertions.assertThat(memberRepository.findById(testId).get().getNickname()).isEqualTo("nickname1");
    }
}