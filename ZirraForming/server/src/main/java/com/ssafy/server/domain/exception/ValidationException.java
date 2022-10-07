package com.ssafy.server.domain.exception;

import lombok.Getter;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.HashMap;
import java.util.Map;

@Getter
public class ValidationException extends RuntimeException {

    private final BindingResult bindingResult;

    public ValidationException(BindingResult bindingResult) {
        super("유효성 검증 실패");
        this.bindingResult = bindingResult;
    }

    public Map<String, String> makeErrors() {
        HashMap<String, String> errors = new HashMap<>();
        bindingResult.getAllErrors().stream()
                .forEach(e -> {
                            if (e instanceof FieldError) {
                                errors.put(((FieldError) e).getField(), e.getDefaultMessage());
                            } else {
                                errors.put(e.getCode(), e.getDefaultMessage());
                            }
                        }
                );
        return errors;
    }
}
