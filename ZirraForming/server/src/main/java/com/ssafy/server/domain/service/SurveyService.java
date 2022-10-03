package com.ssafy.server.domain.service;

import com.ssafy.server.domain.entity.*;
import com.ssafy.server.domain.exception.BadgeNotFountException;
import com.ssafy.server.domain.exception.CharacterTypeNotFoundException;
import com.ssafy.server.domain.exception.MemberNotFountException;
import com.ssafy.server.domain.repository.BadgeRepository;
import com.ssafy.server.domain.repository.CharacterTypeRepository;
import com.ssafy.server.domain.repository.MemberRepository;
import com.ssafy.server.domain.repository.SurveyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
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
    private final BadgeRepository badgeRepository;
    private final ApplicationEventPublisher publisher;

    public List<Survey> findAll() {
        return surveyRepository.findAll();
    }

    public CharacterType getSurveyTestResult(String characterTypeName) {
        return characterTypeRepository.findByName(characterTypeName).orElseThrow(() -> new CharacterTypeNotFoundException(characterTypeName));
    }

    @Transactional
    public void updateMemberCharacterType(Long memberId, Long characterId) {
        // 멤버 조회
        Member findMember = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberNotFountException(memberId));
        
        // 캐릭터 타입 조회
        CharacterType findCharacterType = characterTypeRepository.findById(characterId).orElseThrow(() -> new CharacterTypeNotFoundException());
        
        // 멤버 캐릭터 타입 업데이트
        findMember.updateCharacterType(findCharacterType);

        // 환경 스타일 검사 한번 받은 경우 뱃찌 추가
        Badge findBadge = badgeRepository.findById(6L)
                .orElseThrow(()-> new BadgeNotFountException(6L));
        publisher.publishEvent(new MemberBadge(findMember, findBadge));
    }
}
