package com.ssafy.server.domain.repository;

import com.ssafy.server.domain.entity.Co2Emission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Co2EmissionRepository extends JpaRepository<Co2Emission, Long> {
}
