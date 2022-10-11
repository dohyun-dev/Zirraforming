package com.ssafy.server.domain.service;

import com.ssafy.server.api.dto.star.StarDto;
import com.ssafy.server.domain.dto.PredictResultResponse;
import com.ssafy.server.domain.entity.Member;
import com.ssafy.server.domain.entity.MemberBadge;
import com.ssafy.server.domain.entity.Star;
import com.ssafy.server.domain.exception.MemberNotFountException;
import com.ssafy.server.domain.repository.MemberBadgeRepository;
import com.ssafy.server.domain.repository.MemberRepository;
import com.ssafy.server.domain.repository.StarRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class MyPageService {
    private final MemberRepository memberRepository;
    private final MemberBadgeRepository memberBadgeRepository;
    private final StarRepository starRepository;
    private final RedisTemplate<String, StarDto> redisTemplate;
    private final RestTemplateService restTemplateService;

    public Map<String, String> getProfileAndEnvScore(Long memberId){
        Map<String, String> map = new HashMap<>();

        // 멤버 조회
        Member findMember = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberNotFountException(memberId));

        map.put("nickname", findMember.getNickname());
        if(findMember.getCharacterType().equals(null)){
            map.put("characterName", findMember.getCharacterType().getName());
            map.put("characterImgPath", findMember.getCharacterType().getImgUrl());
        }
        if(findMember.getEnvScore().equals(null)){
            map.put("score", String.valueOf(findMember.getEnvScore()));
        }

        return map;
    }

    public List<Integer> getBadge(Long memberId) {
        List<Integer> result = new ArrayList<>();
        for(int i=0; i<6; i++){
            result.add(0);
        }

        // 멤버 조회
        Member findMember = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberNotFountException(memberId));

        // 뱃지 조회
        List<MemberBadge> memberBadgeList = memberBadgeRepository.findAllByMemberId(findMember.getId());
        for(int i=0; i<memberBadgeList.size(); i++){
            result.set(Math.toIntExact(memberBadgeList.get(i).getBadge().getId())-1, 1);
        }

        return result;
    }

    public List<String> getZirraformingYear(Long memberId) {
        // 멤버 조회
        Member findMember = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberNotFountException(memberId));

        // 과거 지라포밍 내역
        List<String> starList = starRepository.findAllZirraformingYearById(findMember);

        // 오늘 지라포밍 내역
        // key = starList:{memberId}
        // value = StarDto
        Set<String> keys = redisTemplate.keys("starList:"+memberId);
        if(keys.size()!=0) {
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
            Date now = new Date();
            String now_dt = format.format(now);
            starList.add(now_dt);
        }

        return starList;
    }

    public List<Integer> getZirraformingCount(Long memberId) {
        // 멤버 조회
        Member findMember = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberNotFountException(memberId));

        // 과거 지라포밍 내역
        List<Integer> starList = starRepository.findAllZirraformingCountById(findMember);

        // 오늘 지라포밍 내역
        // key = starList:{memberId}
        // value = StarDto
        Set<String> keys = redisTemplate.keys("starList:"+memberId);
        for (String key : keys) {
            if(redisTemplate.type(key).code()=="set"){
                SetOperations<String, StarDto> starSetOperations = redisTemplate.opsForSet();
                Set<StarDto> starDtoList = starSetOperations.members(key);

                starList.add(starDtoList.size());
            }
        }

        return starList;
    }

    public List<String> getZirraformingImg(Long memberId, String date) {
        List<String> result = new ArrayList<>();

        // 멤버 조회
        Member findMember = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberNotFountException(memberId));

        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        Date now = new Date();
        String now_dt = format.format(now);

        if(now_dt.equals(date)){
            // 날짜가 오늘인 경우
            Set<String> keys = redisTemplate.keys("starList:"+memberId);
            for (String key : keys) {
                if(redisTemplate.type(key).code()=="set"){
                    SetOperations<String, StarDto> starSetOperations = redisTemplate.opsForSet();
                    Set<StarDto> starDtoList = starSetOperations.members(key);
                    Iterator<StarDto> iter = starDtoList.iterator();
                    while(iter.hasNext()) {
                        Map<String, Object> map = (Map<String, Object>) iter.next();
                        result.add((String) map.get("imgUrl"));
                    }
                }
            }
        }else{
            // 날짜가 과거인 경우
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            LocalDateTime localDate = LocalDateTime.parse(date+" 00:00:00", formatter);

            List<Star> starList = starRepository.findAllByMemberAndCreatedAt(findMember, localDate);
            for(int i=0; i<starList.size(); i++){
                result.add(starList.get(i).getImgUrl());
            }
        }

        return result;
    }

    public List<Star> findThisYearTotalStar(Long memberId) {
        Member findMember = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberNotFountException(memberId));
        LocalDate now = LocalDate.now();
        String start = String.format("%4d-%02d-%02dT00:00:00", now.getYear(), 1, 1);
        String end = String.format("%4d-%02d-%02dT00:00:00", now.getYear(), now.getMonthValue(), now.getDayOfMonth());
        LocalDateTime startDate = LocalDateTime.parse(start);
        LocalDateTime endDate = LocalDateTime.parse(end);
        System.out.println(startDate + " " + endDate);
        List<Star> findStars = starRepository
                .findByMemberAndCreatedAtBetweenOrderByCreatedAt(findMember, startDate, endDate);
        return findStars;
    }

    public PredictResultResponse getZirraformingResult(Long memberId){
        Member findMember = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberNotFountException(memberId));

        double sum = 0;

        // 오늘 co2 총합
        String key = "starList:"+memberId;
        if(redisTemplate.type(key).code()=="set"){
            SetOperations<String, StarDto> starSetOperations = redisTemplate.opsForSet();
            Set<StarDto> starDtoList = starSetOperations.members(key);
            Iterator<StarDto> iter = starDtoList.iterator();
            while(iter.hasNext()) {
                Map<String, Object> map = (Map<String, Object>) iter.next();
                sum += (double) map.get("co2");
            }
        }

        // 과거 co2 총합
        List<Star> starList = starRepository.findAllByMember(findMember);
        for(int i=0; i<starList.size(); i++){
            sum += starList.get(i).getCo2();
        }

        return restTemplateService.getPredictResult(1, sum);
    }
}
