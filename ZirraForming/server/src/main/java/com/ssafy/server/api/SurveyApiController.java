package com.ssafy.server.api;

import com.ssafy.server.api.dto.common.ResultDto;
import com.ssafy.server.api.dto.survey.SurveyDto;
import com.ssafy.server.api.dto.survey.SurveyTestResultResponse;
import com.ssafy.server.api.dto.survey.SurveyResultSaveRequest;
import com.ssafy.server.domain.dto.CharacterTypeEnum;
import com.ssafy.server.domain.service.SurveyService;
import com.ssafy.server.util.AuthenticationUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RequestMapping("/api")
@RequiredArgsConstructor
@RestController
public class SurveyApiController {

    private final SurveyService surveyService;

    @GetMapping(value = "/survey", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<SurveyDto>> getProblemList() {
        List<SurveyDto> results = surveyService.findAll().stream().map(SurveyDto::new).collect(Collectors.toList());
        return ResponseEntity.ok(results);
    }

    @GetMapping(value = "/charactor", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SurveyTestResultResponse> getSurveyTestResult(@RequestParam(value = "characterId") CharacterTypeEnum characterType) {
        SurveyTestResultResponse result = new SurveyTestResultResponse(surveyService.getSurveyTestResult(characterType.getName()));
        return ResponseEntity.ok(result);
    }

    @PutMapping(value = "/surveyresult", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResultDto> saveSurveyResult(@RequestBody SurveyResultSaveRequest request) {
        surveyService.updateMemberCharacterType(request.getMemberId(), request.getCharacterId());
        return ResponseEntity.ok(ResultDto.of("환경유형 테스트 결과가 저장되었습니다."));
    }

}
