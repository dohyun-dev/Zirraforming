package com.ssafy.server.domain.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.ssafy.server.api.dto.star.StarDto;
import com.ssafy.server.domain.dto.PredictResultResponse;
import com.ssafy.server.domain.entity.*;
import com.ssafy.server.domain.exception.BadgeNotFountException;
import com.ssafy.server.domain.exception.MemberNotFountException;
import com.ssafy.server.domain.repository.BadgeRepository;
import com.ssafy.server.domain.repository.MemberRepository;
import com.ssafy.server.domain.repository.StarRepository;
import com.ssafy.server.domain.repository.TrashRepository;
import com.ssafy.server.util.FileStore;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@RequiredArgsConstructor
public class StarService {

    private final Map<String, String> trashNamedict = Map.of(
            "cardboard", "박스",
            "glass", "유리",
            "metal", "철",
            "paper", "종이",
            "plastic", "플라스틱",
            "trash", "일반쓰레기",
            "null", "인식불가"
    );
    private final RedisTemplate<String, StarDto> redisTemplate;
    private final MemberRepository memberRepository;
    private final FileStore fileStore;
    private final RestTemplateService restTemplateService;
    private final TrashRepository trashRepository;
    private final StarRepository starRepository;
    private final BadgeRepository badgeRepository;
    private final ApplicationEventPublisher publisher;

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

    public Trash saveStar(Long memberId, MultipartFile image) throws IOException {
        String serverFilePath = fileStore.getServerFilePath(fileStore.saveFile(image));
        String aiDetectionResult = restTemplateService.getAiDetectionResult(serverFilePath);
        Trash trash = trashRepository.findByType(aiDetectionResult);
        redisTemplate.opsForSet().add("starList:" + memberId.toString(), new StarDto(memberId, trash.getCo2(), trash.getIce(), serverFilePath, trashNamedict.get(aiDetectionResult)));
        addBadge(memberId);
        return trash;
    }

    public void addBadge(Long memberId){
        Member findMember = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberNotFountException(memberId));

        // 처음으로 쓰레기 등록한 경우, 1번 뺏찌 추가
        addBadgeFirstStar(findMember, 1L);
        // 10일 연속 쓰레기 등록한 경우, 2번 뺏찌 추가
        addBadgeContinuity10Star(findMember, 2L);
        // 일일 5회 이상 쓰레기 등록한 경우, 5번 뺏찌 추가
        addBadge5StarADay(findMember, 5L);
    }

    public void addBadgeFirstStar(Member findMember, Long BadgeId){
        Badge findBadge = badgeRepository.findById(BadgeId)
                .orElseThrow(()-> new BadgeNotFountException(BadgeId));
        publisher.publishEvent(new MemberBadge(findMember, findBadge));
    }

    public void addBadgeContinuity10Star(Member findMember, Long BadgeId){
        Calendar cal = Calendar.getInstance();
        String format = "yyyy-MM-dd";
        SimpleDateFormat sdf = new SimpleDateFormat(format);
        cal.add(cal.DATE, -1);
        String date = sdf.format(cal.getTime());
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime localDate = LocalDateTime.parse(date+" 00:00:00", formatter);

        List<Star> starList = starRepository.findAllByMemberAndCreatedAt(findMember, localDate);
        if(starList.size()>=1) {
            // 어제 내역 있는 경우
            String key = "starList:"+findMember.getId();
            if(redisTemplate.type(key).code()=="set"){
                SetOperations<String, StarDto> starSetOperations = redisTemplate.opsForSet();
                Set<StarDto> starDtoList = starSetOperations.members(key);
                if(starDtoList.size()==0){
                    // 오늘 처음 지라포밍 등록해서 연속 지라포밍 +1
                    // 오늘 이미 지라포밍 등록한 경우에는 업데이트가 되었기 때문에 건너뜀
                    findMember.updateContinuity(findMember.getContinuity()+1);
                    memberRepository.save(findMember);
                }
            }
        }else{
            // 어제 내역 없으므로 연속 지라포밍 1로 초기화
            findMember.updateContinuity(1);
            memberRepository.save(findMember);
        }

        if(findMember.getContinuity()==10){
            Badge findBadge = badgeRepository.findById(BadgeId)
                    .orElseThrow(()-> new BadgeNotFountException(BadgeId));
            publisher.publishEvent(new MemberBadge(findMember, findBadge));
        }
    }

    public void addBadge5StarADay(Member findMember, Long BadgeId){
        String key = "starList:"+findMember.getId();
        if(redisTemplate.type(key).code()=="set"){
            SetOperations<String, StarDto> starSetOperations = redisTemplate.opsForSet();
            Set<StarDto> starDtoList = starSetOperations.members(key);

            if(starDtoList.size()>=5){
                Badge findBadge = badgeRepository.findById(BadgeId).orElseThrow(()-> new BadgeNotFountException(BadgeId));
                publisher.publishEvent(new MemberBadge(findMember, findBadge));
            }
        }
    }

    public Map<String, Object> getTodayResult() {
        Map<String, Integer> trashCount = new HashMap<>();
        double totalCo2 = makeTotalResult(trashCount);
        PredictResultResponse predictResult = restTemplateService.getPredictResult(2, totalCo2);
        return makeReturnMap(trashCount, predictResult);
    }

    private Map<String, Object> makeReturnMap(Map<String, Integer> trashCount, PredictResultResponse predictResult) {
        Map<String, Object> totalResult = new HashMap<>();
        totalResult.put("trashCount", trashCount);
        totalResult.put("predictResult", predictResult);
        return totalResult;
    }

    private double makeTotalResult(Map<String, Integer> trashCount) {
        double totalCo2 = 0.0;
        Set<String> keys = redisTemplate.keys("starList:*");
        for (String key : keys) {
            if(redisTemplate.type(key).code()=="set"){
                Iterator<StarDto> iterator = redisTemplate.opsForSet().members(key).iterator();
                while (iterator.hasNext()) {
                    StarDto starDto = objectMapper().convertValue(iterator.next(), new TypeReference<StarDto>() {});;
                    if (trashCount.containsKey(starDto.getType()))
                        trashCount.put(starDto.getType(), trashCount.get(starDto.getType()) + 1);
                    else
                        trashCount.put(starDto.getType(), 1);
                    totalCo2 += starDto.getCo2();
                }
            }
        }
        return totalCo2;
    }

    private ObjectMapper objectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS); // timestamp 형식 안따르도록 설정
        mapper.registerModules(new JavaTimeModule(), new Jdk8Module()); // LocalDateTime 매핑을 위해 모듈 활성화
        return mapper;
    }
}
