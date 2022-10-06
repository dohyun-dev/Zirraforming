package com.ssafy.server.domain.repository;

import com.ssafy.server.api.dto.news.NewsDto;
import com.ssafy.server.domain.entity.News;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.awt.print.Pageable;
import java.util.List;

public interface NewsRepository extends JpaRepository<News, Long> {
    @Query(value = "select new com.ssafy.server.api.dto.news.NewsDto(n) from News n where n.kind = :kind order by n.date desc")
    List<NewsDto> findTop20ByKindOrderByDateDesc(@Param("kind") String kind, PageRequest pageable);
}