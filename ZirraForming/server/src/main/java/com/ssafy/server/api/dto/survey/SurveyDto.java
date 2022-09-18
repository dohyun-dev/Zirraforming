package com.ssafy.server.api.dto.survey;

import com.ssafy.server.domain.entity.Survey;
import lombok.Data;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class SurveyDto {
    private final String question;
    private final String answer1;
    private final String answer2;
    private final List<Integer> weight1;
    private final List<Integer> weight2;
    private final String imgUrl;

    public SurveyDto(Survey survey) {
        this.question = survey.getQuestion();
        this.answer1 = survey.getAnswer1();
        this.answer2 = survey.getAnswer2();
        this.weight1 = convertWeightToList(survey.getWeight1());
        this.weight2 = convertWeightToList(survey.getWeight2());
        this.imgUrl = survey.getImgUrl();
    }

    private List<Integer> convertWeightToList(String weight) {
        return Arrays.asList(weight.split(",")).stream().map(x -> Integer.parseInt(x)).collect(Collectors.toList());
    }
}
