package com.ssafy.server.domain.entity;

import javax.persistence.*;

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
}
