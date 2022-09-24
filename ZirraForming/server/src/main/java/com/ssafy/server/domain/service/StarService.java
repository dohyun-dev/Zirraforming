package com.ssafy.server.domain.service;

import com.ssafy.server.domain.entity.Member;
import com.ssafy.server.domain.entity.Stars;
import com.ssafy.server.domain.exception.MemberNotFountException;
import com.ssafy.server.domain.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class StarService {

    private final RedisTemplate<String, String> redisTemplate;

    private final MemberRepository memberRepository;

    public List<Stars> getStarsResult() {
        // key = star:{memberId}
        // value = imgPath
        List<Stars> result = new ArrayList<>();
        Set<String> keys = redisTemplate.keys("star:*");

        for (String key : keys) {
            if(redisTemplate.type(key).code()=="set"){
                String value=String.valueOf(redisTemplate.opsForSet().members(key));
                String[] vales = value.substring(1, value.length()-1).split(", ");

                Long memberId = Long.parseLong(key.substring(5));
                Member findMember = memberRepository.findById(memberId)
                        .orElseThrow(() -> new MemberNotFountException(memberId));

                result.add(new Stars(findMember.getId(), findMember.getNickname(), vales.length));
            }
        }

        return result;
    }

    public int getStarsTotalCount() {
        // key = star:{memberId}
        // value = imgPath
        Set<String> keys = redisTemplate.keys("star:*");
        int count = 0;

        for (String key : keys) {
            if(redisTemplate.type(key).code()=="set"){
                String value=String.valueOf(redisTemplate.opsForSet().members(key));
                String[] vales = value.substring(1, value.length()-1).split(", ");

                count += vales.length;
            }
        }

        return count;
    }

    public List<String> getRankResult() {
        // key = star:{memberId}
        // value = imgPath
        List<Stars> result = new ArrayList<>();
        Set<String> keys = redisTemplate.keys("star:*");

        for (String key : keys) {
            if(redisTemplate.type(key).code()=="set"){
                String value=String.valueOf(redisTemplate.opsForSet().members(key));
                String[] vales = value.substring(1, value.length()-1).split(", ");

                Long memberId = Long.parseLong(key.substring(5));
                Member findMember = memberRepository.findById(memberId)
                        .orElseThrow(() -> new MemberNotFountException(memberId));

                result.add(new Stars(findMember.getId(), findMember.getNickname(), vales.length));
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
        // key = star:{memberId}
        // value = imgPath
        List<Integer> result = new ArrayList<>();
        Set<String> keys = redisTemplate.keys("star:*");

        for (String key : keys) {
            if(redisTemplate.type(key).code()=="set"){
                String value=String.valueOf(redisTemplate.opsForSet().members(key));
                String[] vales = value.substring(1, value.length()-1).split(", ");

                result.add(vales.length);
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
