package com.ssafy.server.api;

import com.ssafy.server.api.dto.member.MyPageResponse;
import com.ssafy.server.domain.dto.PredictResultResponse;
import com.ssafy.server.domain.entity.Star;
import com.ssafy.server.domain.service.MemberService;
import com.ssafy.server.domain.service.MyPageService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class MyPageApiController {

    private final MyPageService myPageService;
    private final MemberService memberService;

    @GetMapping(value = "/member/{memberId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ProfileAndEnvScoreResponse> getProfileAndEnvScore(@PathVariable("memberId") Long memberId) {
        return ResponseEntity.ok(ProfileAndEnvScoreResponse.of(myPageService.getProfileAndEnvScore(memberId)));
    }

    @GetMapping(value = "/member/{memberId}/badge", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<BadgeResponse> getBadge(@PathVariable("memberId") Long memberId) {
        return ResponseEntity.ok(BadgeResponse.of(myPageService.getBadge(memberId)));
    }

    @GetMapping(value = "/member/{memberId}/zirraforming", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ZirraformingResponse> getZirraforming(@PathVariable("memberId") Long memberId) {
        ZirraformingResponse zirraformingResponse = new ZirraformingResponse();
        zirraformingResponse.changeYear(myPageService.getZirraformingYear(memberId));
        zirraformingResponse.changeCount(myPageService.getZirraformingCount(memberId));
        return ResponseEntity.ok(zirraformingResponse);
    }

    @GetMapping(value = "/member/{memberId}/zirraforming/{date}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ZirraformingImgResponse> getZirraformingImg(@PathVariable("memberId") Long memberId, @PathVariable("date") String date) {
        return ResponseEntity.ok(ZirraformingImgResponse.of(myPageService.getZirraformingImg(memberId, date)));
    }

    @GetMapping(value = "/member/total/{memberId}")
    public ResponseEntity<MyPageResponse> getMyPageTotal(@PathVariable("memberId") Long memberId){
        Map<String, String> profile = myPageService.getProfileAndEnvScore(memberId);
        List<Integer> badge = myPageService.getBadge(memberId);
        Map<LocalDate, List<String>> zirra = new ConcurrentHashMap<>();

        LocalDate current = LocalDate.now();
        LocalDate end = LocalDate.of(current.getYear(), 12, 31);
        LocalDate start = LocalDate.of(current.getYear(), 1, 1);

        // 초기화
        for (LocalDate date = start; date.isBefore(end); date = date.plusDays(1)){
            zirra.put(date, new ArrayList<>());
        }

        // 오늘 지라포밍 삽입
        List<String> todayZirra = myPageService.getZirraformingImg(memberId, String.valueOf(LocalDate.now()));
        zirra.put(LocalDate.now(), todayZirra);

        List<Star> thisYearTotalStar = myPageService.findThisYearTotalStar(memberId);
        for (Star star : thisYearTotalStar) {
            LocalDate date = LocalDate.from(star.getCreatedAt());
            zirra.get(date).add(star.getImgUrl());
        }
        MyPageResponse myPageResponse = MyPageResponse.builder()
                .characterName(profile.get("characterName")).nickName(profile.get("nickname"))
                .characterImgPath(profile.get("characterImgPath")).score(Integer.parseInt(profile.get("score")))
                .badges(badge).total(thisYearTotalStar.size()).zirraforming(zirra).build();
        return ResponseEntity.ok(myPageResponse);
    }

    @GetMapping(value = "/member/{memberId}/zirraformingresult")
    public ResponseEntity<ZirraformingPredictResultResponse> getZirraformingResult(@PathVariable("memberId") Long memberId){
        return ResponseEntity.ok(ZirraformingPredictResultResponse.of(myPageService.getZirraformingResult(memberId)));
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ProfileAndEnvScoreResponse{
        private String nickname;
        private String characterName;
        private String characterImgPath;
        private String score;

        public static ProfileAndEnvScoreResponse of(Map<String, String> map) {
            return new ProfileAndEnvScoreResponse(map.get("nickname"), map.get("characterName"), map.get("characterImgPath"), map.get("score"));
        }
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class BadgeResponse{
        List<Integer> badges = new ArrayList<>();
        public static BadgeResponse of(List<Integer> badges) {
            return new BadgeResponse(badges);
        }
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ZirraformingResponse{
        List<String> year = new ArrayList<>();
        List<Integer> count = new ArrayList<>();

        public void changeYear(List<String> year){
            this.year = year;
        }

        public void changeCount(List<Integer> count){
            this.count = count;
        }
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ZirraformingImgResponse{
        int count;
        List<String> images = new ArrayList<>();

        public static ZirraformingImgResponse of(List<String> images) {
            return new ZirraformingImgResponse(images.size(), images);
        }
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ZirraformingPredictResultResponse {
        double temperature_2030;
        double ice_2030;
        double co2_2030;
        List<Integer> year;
        List<Double> temperature;
        List<Double> temperature_predict;

        public static ZirraformingPredictResultResponse of(PredictResultResponse predictResultResponse){
            return new ZirraformingPredictResultResponse(predictResultResponse.getTemperature_2030(), predictResultResponse.getIce_2030(), predictResultResponse.getCo2_2030(), predictResultResponse.getYear() ,predictResultResponse.getTemperature(), predictResultResponse.getTemperature_predict());
        }
    }
}
