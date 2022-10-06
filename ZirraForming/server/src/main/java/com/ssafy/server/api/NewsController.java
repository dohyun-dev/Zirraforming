package com.ssafy.server.api;

import com.ssafy.server.api.dto.news.NewsDto;
import com.ssafy.server.domain.entity.News;
import com.ssafy.server.domain.repository.NewsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.awt.print.Pageable;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class NewsController {

    private final NewsRepository newsRepository;

    @GetMapping(value = "/news", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<NewsDto>> getNews(@RequestParam("kind") String kind, @RequestParam(value = "size", defaultValue = "20") Integer size) {
        return ResponseEntity.ok(newsRepository.findTop20ByKindOrderByDateDesc(kind, PageRequest.of(0, size)));
    }
}
