package com.ssafy.server.domain.entity;

import javax.persistence.*;

@Entity
@Table(name = "star")
public class Star extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    private Double co2;

    @Column(name = "img_url")
    private String imgUrl;
}
