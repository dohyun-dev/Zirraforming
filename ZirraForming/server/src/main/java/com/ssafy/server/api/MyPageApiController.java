package com.ssafy.server.api;

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

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class MyPageApiController {

    private final MyPageService myPageService;

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
}
