package com.ssafy.server.domain.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class ErrorDto {
    public String exceptionName;
    public String message;

    public static ErrorDto of(String errorCode, String message) {
        return new ErrorDto(errorCode, message);
    }
}
