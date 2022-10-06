package com.ssafy.server.domain.entity;

import lombok.Getter;

import javax.persistence.*;

@Getter
@Entity @Table(name = "news")
public class News {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    @Lob
    private String content;
    private String link;
    private String imageLink;
    private String date;
    private String kind;
}
