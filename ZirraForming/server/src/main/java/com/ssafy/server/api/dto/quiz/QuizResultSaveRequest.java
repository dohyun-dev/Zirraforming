package com.ssafy.server.api.dto.quiz;

import lombok.Data;

@Data
public class QuizResultSaveRequest {
    private Long memberId;
    private Integer score;
}
