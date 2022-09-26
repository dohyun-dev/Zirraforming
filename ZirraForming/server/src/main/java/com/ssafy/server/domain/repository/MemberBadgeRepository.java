package com.ssafy.server.domain.repository;

import com.ssafy.server.domain.entity.MemberBadge;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemberBadgeRepository  extends JpaRepository<MemberBadge, Long> {
    List<MemberBadge> findAllByMemberId(Long id);
}
