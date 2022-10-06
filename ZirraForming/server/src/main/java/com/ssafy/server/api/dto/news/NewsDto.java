package com.ssafy.server.api.dto.news;

import com.ssafy.server.domain.entity.News;
import lombok.Data;

import java.io.Serializable;

@Data
public class NewsDto {
    private final String title;
    private final String content;
    private final String link;
    private final String imageLink;
    private final String date;
    private final String kind;

    public NewsDto(News news) {
        this.title = news.getTitle();
        this.content = news.getContent();
        this.link = news.getLink();
        this.imageLink = news.getImageLink();
        this.date = news.getDate();
        this.kind = news.getKind();
    }
}
