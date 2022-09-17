package com.ssafy.server.domain.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString(exclude = "campaignList")
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

    @OneToMany(mappedBy = "characterType")
    private List<Campaign> campaignList = new ArrayList<>();

    public CharacterType(String name, String displayName, String description, String imgUrl) {
        this.name = name;
        this.displayName = displayName;
        this.description = description;
        this.imgUrl = imgUrl;
    }

    public static CharacterType of(String name, String displayName, String description, String imgUrl) {
        return new CharacterType(name, displayName, description, imgUrl);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CharacterType that = (CharacterType) o;
        return that != null && Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
