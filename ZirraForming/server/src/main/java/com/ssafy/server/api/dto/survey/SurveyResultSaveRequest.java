package com.ssafy.server.api.dto.survey;

import lombok.Data;

@Data
public class SurveyResultSaveRequest {
    private Long memberId;
    private String characterName;
}