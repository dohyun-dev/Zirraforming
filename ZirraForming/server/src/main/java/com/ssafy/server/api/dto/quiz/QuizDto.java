package com.ssafy.server.api.dto.quiz;

import com.ssafy.server.domain.entity.Quiz;
import lombok.Data;

import java.util.List;

@Data
public class QuizDto {
    private String question;
    private List<String> option;
    private int answer;
    private String solution;

    public QuizDto(String question, List<String> option, int answer, String solution) {
        this.question = question;
        this.option = option;
        this.answer = answer;
        this.solution = solution;
    }

    public static QuizDto quizToQuizDto(Quiz quiz) {
        return new QuizDto(quiz.getQuestion(), quiz.getOption(), quiz.getAnswer(), quiz.getSolution());
    }
}
