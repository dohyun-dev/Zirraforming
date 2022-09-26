package com.ssafy.server.domain.service;

import com.ssafy.server.api.dto.star.StarDto;
import com.ssafy.server.domain.entity.Member;
import com.ssafy.server.domain.entity.Stars;
import com.ssafy.server.domain.exception.MemberNotFountException;
import com.ssafy.server.domain.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class StarService {

    private final RedisTemplate<String, StarDto> redisTemplate;
    private final MemberRepository memberRepository;

    public List<Stars> getStarsResult() {
        // key = starList:{memberId}
        // value = StarDto
        List<Stars> result = new ArrayList<>();
        Set<String> keys = redisTemplate.keys("starList:*");

        for (String key : keys) {
            if(redisTemplate.type(key).code()=="set"){
                SetOperations<String, StarDto> starSetOperations = redisTemplate.opsForSet();
                Set<StarDto> starDtoList = starSetOperations.members(key);

                Long memberId = Long.parseLong(key.substring(9));
                Member findMember = memberRepository.findById(memberId)
                        .orElseThrow(() -> new MemberNotFountException(memberId));

                result.add(new Stars(findMember.getId(), findMember.getNickname(), starDtoList.size()));
            }
        }

        return result;
    }

    public int getStarsTotalCount() {
        // key = starList:{memberId}
        // value = StarDto
        Set<String> keys = redisTemplate.keys("starList:*");
        int count = 0;

        for (String key : keys) {
            if(redisTemplate.type(key).code()=="set"){
                SetOperations<String, StarDto> starSetOperations = redisTemplate.opsForSet();
                Set<StarDto> starDtoList = starSetOperations.members(key);

                count += starDtoList.size();
            }
        }

        return count;
    }

    public List<String> getRankResult() {
        // key = starList:{memberId}
        // value = StarDto
        List<Stars> result = new ArrayList<>();
        Set<String> keys = redisTemplate.keys("starList:*");

        for (String key : keys) {
            if(redisTemplate.type(key).code()=="set"){
                SetOperations<String, StarDto> starSetOperations = redisTemplate.opsForSet();
                Set<StarDto> starDtoList = starSetOperations.members(key);

                Long memberId = Long.parseLong(key.substring(9));
                Member findMember = memberRepository.findById(memberId)
                        .orElseThrow(() -> new MemberNotFountException(memberId));

                result.add(new Stars(findMember.getId(), findMember.getNickname(), starDtoList.size()));
            }
        }

        Collections.sort(result, new Comparator<Stars>() {
            @Override
            public int compare(Stars o1, Stars o2) {
                return o2.getCount()-o1.getCount();
            }
        });

        List<String> rank = new ArrayList<>();
        int count = 0;
        for(int i=0; i<result.size(); i++){
            rank.add(result.get(i).getNickname());
            count++;

            if(count==10) break;
        }

        return rank;
    }

    public List<Integer> getRankCount() {
        // key = starList:{memberId}
        // value = StarDto
        List<Integer> result = new ArrayList<>();
        Set<String> keys = redisTemplate.keys("starList:*");

        for (String key : keys) {
            if(redisTemplate.type(key).code()=="set"){
                SetOperations<String, StarDto> starSetOperations = redisTemplate.opsForSet();
                Set<StarDto> starDtoList = starSetOperations.members(key);

                result.add(starDtoList.size());
            }
        }

        Collections.sort(result, Collections.reverseOrder());

        List<Integer> rank = new ArrayList<>();
        int count = 0;
        for(int i=0; i<result.size(); i++){
            rank.add(result.get(i));
            count++;

            if(count==10) break;
        }

        return rank;
    }
}
