package com.ssafy.server.api;

import com.ssafy.server.api.dto.star.StarSaveResponse;
import com.ssafy.server.api.dto.star.StarTodayResultResponse;
import com.ssafy.server.domain.entity.Stars;
import com.ssafy.server.domain.entity.Trash;
import com.ssafy.server.domain.service.StarService;
import lombok.*;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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

    @PostMapping(value = "/stars", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<StarSaveResponse> savaStar(@ModelAttribute StarSaveRequest request) throws IOException {
        Trash result = starService.saveStar(request.memberId, request.getImage());
        return ResponseEntity.ok().body(new StarSaveResponse(result));
    }

    @GetMapping(value = "/todayresult", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<StarTodayResultResponse> savaStar() throws IOException {
        return ResponseEntity.ok().body(new StarTodayResultResponse(starService.getTodayResult()));
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

    @Data
    public static class StarSaveRequest {
        private Long memberId;
        private MultipartFile image;
    }
}
