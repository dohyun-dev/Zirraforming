package com.ssafy.server.domain.service;

import com.ssafy.server.domain.entity.Campaign;
import com.ssafy.server.domain.entity.CharacterType;
import com.ssafy.server.domain.entity.Member;
import com.ssafy.server.domain.entity.Survey;
import com.ssafy.server.domain.exception.CharacterTypeNotFoundException;
import com.ssafy.server.domain.exception.MemberNotFountException;
import com.ssafy.server.domain.repository.CharacterTypeRepository;
import com.ssafy.server.domain.repository.MemberRepository;
import com.ssafy.server.domain.repository.SurveyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class SurveyService {

    private final SurveyRepository surveyRepository;
    private final MemberRepository memberRepository;
    private final CharacterTypeRepository characterTypeRepository;

    public List<Survey> findAll() {
        return surveyRepository.findAll();
    }

    public CharacterType getSurveyTestResult(String characterTypeName) {
        return characterTypeRepository.findByName(characterTypeName)
                .orElseThrow(() -> new CharacterTypeNotFoundException(characterTypeName));
    }

    @Transactional
    public void updateMemberCharacterType(Long memberId, String characterTypeName) {
        // 멤버 조회
        Member findMember = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberNotFountException(memberId));
        
        // 캐릭터 타입 조회
        CharacterType findCharacterType = characterTypeRepository.findByName(characterTypeName)
                .orElseThrow(() -> new CharacterTypeNotFoundException(characterTypeName));
        
        // 멤버 캐릭터 타입 업데이트
        findMember.updateCharacterType(findCharacterType);
    }
}
