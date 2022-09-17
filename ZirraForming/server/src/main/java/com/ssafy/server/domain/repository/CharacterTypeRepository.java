package com.ssafy.server.domain.repository;

import com.ssafy.server.domain.entity.CharacterType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CharacterTypeRepository extends JpaRepository<CharacterType, Long> {
    Optional<CharacterType> findByName(String name);
}