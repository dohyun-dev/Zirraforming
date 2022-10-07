package com.ssafy.server;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.ssafy.server.api.dto.star.StarDto;
import com.ssafy.server.domain.entity.Badge;
import com.ssafy.server.domain.entity.Member;
import com.ssafy.server.domain.entity.MemberBadge;
import com.ssafy.server.domain.exception.BadgeNotFountException;
import com.ssafy.server.domain.exception.MemberNicknameNotFountException;
import com.ssafy.server.domain.repository.BadgeRepository;
import com.ssafy.server.domain.repository.MemberRepository;
import com.ssafy.server.domain.service.StarJdbcService;
import com.ssafy.server.domain.service.StarService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

@Slf4j
@EnableScheduling
@SpringBootApplication
@RequiredArgsConstructor
public class ServerApplication {
	private final RedisTemplate<String, StarDto> redisTemplate;
	private final StarJdbcService starJdbcService;
	private final StarService starService;
	private final BadgeRepository badgeRepository;
	private final MemberRepository memberRepository;
	private final ApplicationEventPublisher publisher;

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}

	/*
	 * 0시 0분 0초에 DB에 넣기
	 * */
	@Scheduled(cron = "0 0 0 * * ?", zone="Asia/Seoul")
	public void updateStars() {
		// 오늘 하루 랭킹 1위한 경우 뱃찌 추가
		List<String> ranking = starService.getRankResult();
		Member findMember = memberRepository.findByNickname(ranking.get(0))
				.orElseThrow(() -> new MemberNicknameNotFountException(ranking.get(0)));
		Badge findBadge = badgeRepository.findById(4L)
				.orElseThrow(()-> new BadgeNotFountException(4L));
		publisher.publishEvent(new MemberBadge(findMember, findBadge));

		// key = starList:{memberId}
		// value = StarDto
		List<StarDto> result = new ArrayList<>();
		Set<String> keys = redisTemplate.keys("starList:*");

		for (String key : keys) {
			if(redisTemplate.type(key).code()=="set"){
				SetOperations<String, StarDto> starSetOperations = redisTemplate.opsForSet();
				Set<StarDto> starDtoList = starSetOperations.members(key);

				Long memberId = Long.parseLong(key.substring(9));

				Iterator<StarDto> iter = starDtoList.iterator();
				while(iter.hasNext()){
					StarDto tmp = objectMapper().convertValue(iter.next(), new TypeReference<StarDto>() {});;
					result.add(new StarDto(memberId, tmp.getCo2(), tmp.getIce(), tmp.getImgUrl(), tmp.getType()));
				}
				redisTemplate.delete(key);
			}
		}

		// 레디스에 있는 StarDto MySQL로 옮기기
		starJdbcService.post(result);
		log.info("Redis -> MySQL success! Total:[{}] ", result.size());
	}

	private ObjectMapper objectMapper() {
		ObjectMapper mapper = new ObjectMapper();
		mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS); // timestamp 형식 안따르도록 설정
		mapper.registerModules(new JavaTimeModule(), new Jdk8Module()); // LocalDateTime 매핑을 위해 모듈 활성화
		return mapper;
	}
}
