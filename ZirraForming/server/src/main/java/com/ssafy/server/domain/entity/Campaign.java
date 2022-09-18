package com.ssafy.server.domain.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Objects;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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

    public Campaign(CharacterType characterType, String name, String url, String imgUrl) {
        this.characterType = characterType;
        this.name = name;
        this.url = url;
        this.imgUrl = imgUrl;
    }

    public static Campaign of(CharacterType characterType, String name, String url, String imgUrl) {
        return new Campaign(characterType, name, url, imgUrl);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Campaign campaign = (Campaign) o;
        return campaign != null && Objects.equals(id, campaign.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
