package com.ssafy.server.domain.service;

import com.ssafy.server.domain.entity.Member;
import com.ssafy.server.domain.repository.MemberBadgeRepository;
import com.ssafy.server.domain.repository.MemberRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Map;
import java.util.Optional;

import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
@DisplayName("마이페이지 테스트")
class MyPageServiceTest {

    @InjectMocks
    private MyPageService myPageService;
    @Mock
    private  MemberRepository memberRepository;
    @Mock
    private  MemberBadgeRepository memberBadgeRepository;


    @DisplayName("마이페이지 프로필 환경점수 조회")
    @Test
    void getProfileAndEnvScore() {
        // given
        Long memberId = 1L;
        Member testData = Member.of("test@test.com", "test1");
        testData.updateEnvScore(3);
        given(memberRepository.findById(memberId)).willReturn(Optional.of(testData));

        // when
        Map<String, String> result = myPageService.getProfileAndEnvScore(memberId);

        // then
        Assertions.assertThat(Integer.parseInt(result.get("score"))).isEqualTo(testData.getEnvScore());
    }
}