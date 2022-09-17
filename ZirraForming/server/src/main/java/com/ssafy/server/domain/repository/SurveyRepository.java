package com.ssafy.server.domain.repository;

import com.ssafy.server.domain.entity.Survey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SurveyRepository extends JpaRepository<Survey, Long> {
}