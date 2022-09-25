package com.ssafy.server.domain.repository;

import com.ssafy.server.domain.entity.SurfaceTemperature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SurfaceTemperatureRepository extends JpaRepository<SurfaceTemperature, Long> {
}
