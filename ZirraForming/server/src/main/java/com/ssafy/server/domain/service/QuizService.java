package com.ssafy.server.domain.service;

import com.ssafy.server.domain.entity.CharacterType;
import com.ssafy.server.domain.entity.Member;
import com.ssafy.server.domain.entity.Quiz;
import com.ssafy.server.domain.exception.CharacterTypeNotFoundException;
import com.ssafy.server.domain.exception.MemberNotFountException;
import com.ssafy.server.domain.repository.MemberRepository;
import com.ssafy.server.domain.repository.QuizRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuizService {
    private final QuizRepository quizRepository;
    private final MemberRepository memberRepository;

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
    }
}
