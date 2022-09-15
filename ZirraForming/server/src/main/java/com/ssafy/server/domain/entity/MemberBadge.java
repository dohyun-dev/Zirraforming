package com.ssafy.server.domain.entity;

import javax.persistence.*;

@Entity
@Table(name = "member_badge")
public class MemberBadge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "badge_id")
    private Badge badge;


    @Embedded
    private DateTime dateTime;
}
