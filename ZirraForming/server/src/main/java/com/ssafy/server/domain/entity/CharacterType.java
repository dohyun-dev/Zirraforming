package com.ssafy.server.domain.entity;

import javax.persistence.*;

@Entity
@Table(name = "Character_type")
public class CharacterType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(name = "display_name")
    private String displayName;

    private String description;

    @Column(name = "img_url")
    private String imgUrl;
}
