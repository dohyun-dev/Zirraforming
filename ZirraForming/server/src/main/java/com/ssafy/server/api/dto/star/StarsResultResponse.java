package com.ssafy.server.api.dto.star;

import com.ssafy.server.domain.entity.Stars;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class StarsResultResponse{
    List<Stars> stars = new ArrayList<>();
    int totalCount;

    public void changeStars(List<Stars> starsResult) {
        this.stars = starsResult;
    }

    public void changeTotalCount(int totalCount) {
        this.totalCount = totalCount;
    }
}

