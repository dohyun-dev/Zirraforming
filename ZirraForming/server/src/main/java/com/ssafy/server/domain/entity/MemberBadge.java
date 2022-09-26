package com.ssafy.server.domain.entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
@Table(name = "member_badge")
public class MemberBadge extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "badge_id")
    private Badge badge;
}
