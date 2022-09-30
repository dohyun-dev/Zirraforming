package com.ssafy.server.domain.repository;

import com.ssafy.server.domain.entity.Badge;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BadgeRepository extends JpaRepository<Badge, Long> {
}
