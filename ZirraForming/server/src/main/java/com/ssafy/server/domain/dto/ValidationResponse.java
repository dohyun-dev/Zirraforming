package com.ssafy.server.domain.dto;

import com.ssafy.server.domain.exception.ValidationException;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Map;

@Data
@AllArgsConstructor
public class ValidationResponse {
    private String message;
    private Map<String, String> validationErrors;

    public ValidationResponse(ValidationException exception) {
        this.message = exception.getMessage();
        this.validationErrors = exception.makeErrors();
    }
}
