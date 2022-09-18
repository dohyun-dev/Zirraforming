package com.ssafy.server.api.dto.common;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ResultDto {
    private final String message;

    public static ResultDto of(String message) {
        return new ResultDto(message);
    }
}
