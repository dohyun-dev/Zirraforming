package com.ssafy.server.domain.repository;

import com.ssafy.server.domain.entity.AirPollution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AirPollutionRepository extends JpaRepository<AirPollution, Long> {
}
