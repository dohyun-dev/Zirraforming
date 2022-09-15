package com.ssafy.server.domain.entity;

import javax.persistence.*;

@Entity
@Table(name = "member")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    private String nickname;

    @Column(name = "env_score")
    private Integer envScore;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "character_type_id")
    private CharacterType characterType;

    @Embedded
    private DateTime dateTime;
}
