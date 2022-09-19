package com.ssafy.server.api.dto.member;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DuplicatedCheckResultResponse {
    private final boolean result;
    private final String message;

    public static DuplicatedCheckResultResponse of(boolean result, String message) {
        return new DuplicatedCheckResultResponse(result, message);
    }
}
