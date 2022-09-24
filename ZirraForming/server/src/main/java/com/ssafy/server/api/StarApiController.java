package com.ssafy.server.api;

import com.ssafy.server.domain.entity.Stars;
import com.ssafy.server.domain.service.StarService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api")
@RestController
public class StarApiController {
    
    private final StarService starService;

    @GetMapping(value = "/stars", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<StarsResultResponse> getStarsResult() {
        StarsResultResponse result = new StarsResultResponse();
        result.changeStars(starService.getStarsResult());
        result.changeTotalCount(starService.getStarsTotalCount());
        return ResponseEntity.ok(result);
    }

    @GetMapping(value = "/stars/ranking", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<StarsRankingResponse> getRanking() {
        StarsRankingResponse result = new StarsRankingResponse();
        result.changeRank(starService.getRankResult());
        result.changeCount(starService.getRankCount());
        return ResponseEntity.ok(result);
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class StarsResultResponse{
        List<Stars> stars = new ArrayList<>();
        int totalCount;

        public void changeStars(List<Stars> starsResult) {
            this.stars = starsResult;
        }

        public void changeTotalCount(int totalCount) {
            this.totalCount = totalCount;
        }
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class StarsRankingResponse{
        List<String> rank = new ArrayList<>();
        List<Integer> count = new ArrayList<>();

        public void changeRank(List<String> rank) {
            this.rank = rank;
        }

        public void changeCount(List<Integer> count) {
            this.count = count;
        }
    }
}
