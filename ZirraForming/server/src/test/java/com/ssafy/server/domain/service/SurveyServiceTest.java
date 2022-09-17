package com.ssafy.server.domain.service;

import com.ssafy.server.config.SecurityConfig;
import com.ssafy.server.domain.entity.CharacterType;
import com.ssafy.server.domain.entity.Member;
import com.ssafy.server.domain.entity.Survey;
import com.ssafy.server.domain.repository.CharacterTypeRepository;
import com.ssafy.server.domain.repository.MemberRepository;
import com.ssafy.server.domain.repository.SurveyRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
@DisplayName("환경유형검사 테스트")
class SurveyServiceTest {

    @InjectMocks
    private SurveyService surveyService;
    @Mock
    private SurveyRepository surveyRepository;
    @Mock
    private CharacterTypeRepository characterTypeRepository;
    @Mock
    private MemberRepository memberRepository;


    @DisplayName("환경유형검사 문제 리스트 뽑기")
    @Test
    void findAll() {
        //given
        ArrayList<Survey> testDatas = new ArrayList<>();
        for(int i = 0; i < 10; i++) {
            testDatas.add(createTestSurvey(i));
        }
        given(surveyRepository.findAll()).willReturn(testDatas);

        // when
        List<Survey> result = surveyService.findAll();

        // then
        Assertions.assertThat(result.size()).isEqualTo(10);
    }

    @DisplayName("환경유형검사 결과 조회")
    @Test
    void getSurveyTestResult() {
        // given
        CharacterType testData = CharacterType.of("짱구", "짱구", "설명", "이미지 url");
        given(characterTypeRepository.findByName("짱구")).willReturn(Optional.of(testData));

        // when
        CharacterType result = surveyService.getSurveyTestResult("짱구");

        // then
        Assertions.assertThat(result).isEqualTo(testData);
    }

    @DisplayName("환경유형검사 결과 변경")
    @Test
    void updateMemberCharacterType() {
        // given
        long testId = 1L;
        Member testData = Member.of("testemail", "testnickname");
        CharacterType testCharacterType = CharacterType.of("짱구", "짱구", "설명", "이미지 url");
        given(memberRepository.findById(testId)).willReturn(Optional.of(testData));
        given(characterTypeRepository.findByName("짱구")).willReturn(Optional.of(testCharacterType));

        // when
        surveyService.updateMemberCharacterType(testId, "짱구");

        // then
        Assertions.assertThat(memberRepository.findById(testId).get().getCharacterType().getName()).isEqualTo("짱구");
    }

    private Survey createTestSurvey(int i) {
        return Survey.of("question1test" + i, "answer" + i, "answer" + i, "1,1,1,1,1,1,1,1", "1,1,1,1,1,1,1,1", "testurl" + i);
    }
}