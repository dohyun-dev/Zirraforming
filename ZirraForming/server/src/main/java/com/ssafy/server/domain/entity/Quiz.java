package com.ssafy.server.domain.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
@Document(collection = "quiz")
public class Quiz {

    @Id
    private String _id;
    private String question;
    private List<String> option;
    private int answer;
    private String solution;

    public Quiz(String question, List<String> option, int answer, String solution) {
        this.question = question;
        this.option = option;
        this.answer = answer;
        this.solution = solution;
    }

    public static Quiz of(String question, List<String> option, int answer, String solution) {
        return new Quiz(question, option, answer, solution);
    }
}
