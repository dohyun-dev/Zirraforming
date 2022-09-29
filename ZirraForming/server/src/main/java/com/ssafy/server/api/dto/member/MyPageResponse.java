package com.ssafy.server.api.dto.member;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Getter
public class MyPageResponse {
    private String nickName;
    private String characterName;
    private String characterImgPath;
    private int score;
    private List<Integer> badges;
    private Map<LocalDate, List<String>> zirraforming;
    private int total;

    @Builder
    public MyPageResponse(String nickName, String characterName, String characterImgPath, int score,
                          List<Integer> badges, Map<LocalDate, List<String>> zirraforming, int total) {
        this.nickName = nickName;
        this.characterName = characterName;
        this.characterImgPath = characterImgPath;
        this.score = score;
        this.badges = badges;
        this.zirraforming = zirraforming;
        this.total = total;
    }
}
