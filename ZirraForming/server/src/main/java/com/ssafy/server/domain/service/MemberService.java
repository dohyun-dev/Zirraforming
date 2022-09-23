package com.ssafy.server.domain.service;

import com.ssafy.server.config.properties.TokenProperties;
import com.ssafy.server.domain.entity.Member;
import com.ssafy.server.domain.exception.MemberNotFountException;
import com.ssafy.server.domain.repository.MemberRepository;
import com.ssafy.server.oauth.entity.RoleType;
import com.ssafy.server.oauth.exception.TokenValidFailedException;
import com.ssafy.server.oauth.token.AuthTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final RedisTemplate<String, String> redisTemplate;
    private final AuthTokenProvider tokenProvider;
    private final TokenProperties tokenProperties;

    public void logout(Long memberId){
        deleteRefreshToken(memberId);
    }

    public boolean duplicatedCheck(String nickname){
        // 닉네임 중복 확인
        Optional<Member> findMember = memberRepository.findByNickname(nickname);

        if(findMember.isEmpty()) return true;
        else return false;
    }

    @Transactional
    public void changeNickname(Long memberId, String nickname){
        // 멤버 조회
        Member findMember = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberNotFountException(memberId));

        // 멤버 닉네임 업데이트
        findMember.updateNickname(nickname);
    }

    @Transactional
    public void deleteMember(Long memberId){
        // 멤버 조회
        Member findMember = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberNotFountException(memberId));

        // 멤버 삭제
        memberRepository.deleteById(findMember.getId());

        // 리프레시 토큰 삭제
        deleteRefreshToken(findMember.getId());
    }

    public void deleteRefreshToken(Long memberId){
        String key = "refreshToken:" + String.valueOf(memberId);
        SetOperations<String, String> setOperations = redisTemplate.opsForSet();
        if(setOperations.size(key)!=0) setOperations.pop(key);
    }

    public String createRefreshToken(String tokenStr, Long memberId) {
        SetOperations<String, String> setOperations = redisTemplate.opsForSet();
        String key = "refreshToken:" + String.valueOf(memberId);

        //레디스에 저장되어있는 리프레시 토큰과 요청 리프레시 토큰이 같은지 비교
        if(!setOperations.pop(key).equals(tokenStr)){
            throw new TokenValidFailedException();
        }

        //레디스에 새로 발급받은 리프레시 토큰 저장
        String refreshToken = tokenProvider.createAuthToken(
                String.valueOf(memberId),
                RoleType.USER.getCode(),
                new Date(new Date().getTime() + tokenProperties.getAuth().getRefreshTokenExpiry())
        ).getToken();
        setOperations.add(key, refreshToken);

        return refreshToken;
    }

    public String createAccessToken(Long memberId) {
        return tokenProvider.createAuthToken(
                String.valueOf(memberId),
                RoleType.USER.getCode(),
                new Date(new Date().getTime() + tokenProperties.getAuth().getTokenExpiry())
        ).getToken();
    }
}
