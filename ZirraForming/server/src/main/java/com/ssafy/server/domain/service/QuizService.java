package com.ssafy.server.domain.service;

import com.ssafy.server.domain.entity.Badge;
import com.ssafy.server.domain.entity.Member;
import com.ssafy.server.domain.entity.MemberBadge;
import com.ssafy.server.domain.entity.Quiz;
import com.ssafy.server.domain.exception.BadgeNotFountException;
import com.ssafy.server.domain.exception.MemberNotFountException;
import com.ssafy.server.domain.repository.BadgeRepository;
import com.ssafy.server.domain.repository.MemberRepository;
import com.ssafy.server.domain.repository.QuizRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class QuizService {
    private final QuizRepository quizRepository;
    private final MemberRepository memberRepository;
    private final BadgeRepository badgeRepository;
    private final ApplicationEventPublisher publisher;

    public List<Quiz> findAllRandomLimit10() {
        return quizRepository.findAllRandomLimit10();
    }

    @Transactional
    public void updateMemberEnvScore(Long memberId, Integer score) {
        // 멤버 조회
        Member findMember = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberNotFountException(memberId));

        // 멤버 환경 퀴즈 상식 결과 업데이트
        findMember.updateEnvScore(score);

        // 10점 받은 경우 뱃찌 추가
        if(score==10){
            Badge findBadge = badgeRepository.findById(3L)
                    .orElseThrow(()-> new BadgeNotFountException(3L));
            publisher.publishEvent(new MemberBadge(findMember, findBadge));
        }
    }
}
