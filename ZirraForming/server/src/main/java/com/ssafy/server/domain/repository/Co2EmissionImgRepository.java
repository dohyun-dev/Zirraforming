package com.ssafy.server.domain.repository;

import com.ssafy.server.domain.entity.Co2EmissionImg;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Co2EmissionImgRepository extends JpaRepository<Co2EmissionImg, Long> {
}
