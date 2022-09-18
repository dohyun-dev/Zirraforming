package com.ssafy.server.domain.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.Objects;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
@Entity
@Table(name = "survey")
public class Survey {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String question;

    private String answer1;

    private String answer2;

    private String weight1;

    private String weight2;

    @Column(name = "img_url")
    private String imgUrl;

    public Survey(String question, String answer1, String answer2, String weight1, String weight2, String imgUrl) {
        this.question = question;
        this.answer1 = answer1;
        this.answer2 = answer2;
        this.weight1 = weight1;
        this.weight2 = weight2;
        this.imgUrl = imgUrl;
    }

    public static Survey of(String question, String answer1, String answer2, String weight1, String weight2, String imgUrl) {
        return new Survey(question, answer1, answer2, weight1, weight2, imgUrl);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Survey survey = (Survey) o;
        return survey != null && Objects.equals(id, survey.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
