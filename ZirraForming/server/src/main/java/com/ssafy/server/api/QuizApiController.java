package com.ssafy.server.api;

import com.ssafy.server.api.dto.common.ResultDto;
import com.ssafy.server.api.dto.quiz.QuizDto;
import com.ssafy.server.api.dto.quiz.QuizResultSaveRequest;
import com.ssafy.server.domain.service.QuizService;
import com.ssafy.server.util.AuthenticationUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class QuizApiController {
    private final QuizService quizService;
    private final AuthenticationUtil authenticationUtil;

    @GetMapping("/quiz")
    public ResponseEntity<List<QuizDto>> getQuizList(){
        List<QuizDto> results = quizService.findAllRandomLimit10().stream().map(QuizDto::quizToQuizDto).collect(Collectors.toList());;
        return ResponseEntity.ok(results);
    }

    @PatchMapping(value = "/quiz", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResultDto> saveQuizResult(@RequestBody QuizResultSaveRequest request) {
        Long memberId = authenticationUtil.getLoginMemberId();
        quizService.updateMemberEnvScore(memberId, request.getScore());
        return ResponseEntity.ok(ResultDto.of("환경 상식 퀴즈 결과가 저장되었습니다."));
    }
}
