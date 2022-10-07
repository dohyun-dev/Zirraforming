package com.ssafy.server.domain.repository;

import com.ssafy.server.domain.entity.Trash;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrashRepository extends JpaRepository<Trash, Long> {
    Trash findByType(String type);
}