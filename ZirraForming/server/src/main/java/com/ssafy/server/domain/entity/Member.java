package com.ssafy.server.domain.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Getter
@Table(name = "members")
@NoArgsConstructor
public class Member extends BaseTimeEntity{

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

    public Member(String email, String nickname) {
        this.email = email;
        this.nickname = nickname;
    }

    public static Member of(String email, String nickname) {
        return new Member(email, nickname);
    }

    public void updateCharacterType(CharacterType characterType) {
        this.characterType = characterType;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Member member = (Member) o;
        return member != null && Objects.equals(id, member.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
