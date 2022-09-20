package com.ssafy.server.domain.service;

import com.ssafy.server.domain.entity.Member;
import com.ssafy.server.domain.entity.Quiz;
import com.ssafy.server.domain.repository.MemberRepository;
import com.ssafy.server.domain.repository.QuizRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
@DisplayName("퀴즈 테스트")
class QuizServiceTest {

    @InjectMocks
    private QuizService quizService;
    @Mock
    private QuizRepository quizRepository;
    @Mock
    private MemberRepository memberRepository;

    @DisplayName("환경 상식 퀴즈 리스트 뽑기")
    @Test
    void findAllRandomLimit10() {
        //given
        ArrayList<Quiz> testDatas = new ArrayList<>();
        for(int i = 0; i < 10; i++) {
            testDatas.add(createTestQuiz(i));
        }
        given(quizRepository.findAllRandomLimit10()).willReturn(testDatas);

        // when
        List<Quiz> result = quizService.findAllRandomLimit10();

        // then
        Assertions.assertThat(result.size()).isEqualTo(10);
    }

    @DisplayName("환경 상식 퀴즈 결과 변경")
    @Test
    void updateMemberEnvScore() {
        // given
        long testId = 1L;
        Member testData = Member.of("testemail", "testnickname");
        given(memberRepository.findById(testId)).willReturn(Optional.of(testData));

        // when
        quizService.updateMemberEnvScore(testId, 5);

        // then
        Assertions.assertThat(memberRepository.findById(testId).get().getEnvScore()).isEqualTo(5);
    }

    private Quiz createTestQuiz(int i) {
        return Quiz.of("question1test"+i, new ArrayList(Arrays.asList("1","2","3")), 0, "solution"+i);
    }
}