package com.ssafy.server.domain.repository;

import com.ssafy.server.domain.entity.IceSheets;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IceSheetsRepository extends JpaRepository<IceSheets, Long> {
}
