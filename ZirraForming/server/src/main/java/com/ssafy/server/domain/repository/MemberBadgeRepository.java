package com.ssafy.server.domain.repository;

import com.ssafy.server.domain.entity.Badge;
import com.ssafy.server.domain.entity.Member;
import com.ssafy.server.domain.entity.MemberBadge;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MemberBadgeRepository  extends JpaRepository<MemberBadge, Long> {
    List<MemberBadge> findAllByMemberId(Long id);

    Optional<MemberBadge> findByMemberAndBadge(Member member, Badge badge);
}
