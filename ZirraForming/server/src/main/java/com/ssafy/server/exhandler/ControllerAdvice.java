package com.ssafy.server.exhandler;

import com.ssafy.server.domain.dto.ErrorDto;
import com.ssafy.server.domain.dto.ValidationResponse;
import com.ssafy.server.domain.exception.CharacterTypeNotFoundException;
import com.ssafy.server.domain.exception.MemberNotFountException;
import com.ssafy.server.domain.exception.ValidationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ControllerAdvice {

    @ExceptionHandler(MemberNotFountException.class)
    public ResponseEntity<ErrorDto> memberNotFoundExHandler(RuntimeException ex) {
        return ResponseEntity.badRequest().body(ErrorDto.of(ex.getClass().getSimpleName(), ex.getMessage()));
    }

    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<ValidationResponse> validationExHandler(ValidationException ex) {
        return ResponseEntity.badRequest().body(new ValidationResponse(ex));
    }
}
