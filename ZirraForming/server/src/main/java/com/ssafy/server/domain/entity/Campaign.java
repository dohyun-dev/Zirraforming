package com.ssafy.server.domain.entity;

import javax.persistence.*;

@Entity
@Table(name = "campaign")
public class Campaign {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "character_type_id")
    private CharacterType characterType;

    private String name;

    @Column(columnDefinition = "TEXT")
    private String url;

    private String imgUrl;
}
