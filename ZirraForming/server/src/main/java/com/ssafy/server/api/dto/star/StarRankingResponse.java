package com.ssafy.server.api.dto.star;

import com.ssafy.server.domain.entity.Stars;
import lombok.Data;

@Data
public class StarRankingResponse {
    String nickname;
    int count;

    public StarRankingResponse(Stars stars) {
        this.nickname = stars.getNickname();
        this.count = stars.getCount();
    }
}
