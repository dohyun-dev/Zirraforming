package com.ssafy.server.domain.repository;

import com.ssafy.server.domain.entity.ArcticSeaIce;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArcticSeaIceRepository extends JpaRepository<ArcticSeaIce, Long> {
}
