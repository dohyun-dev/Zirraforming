package com.ssafy.server.api.dto.home;

import com.ssafy.server.domain.entity.ArcticSeaIce;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
public class ArcticSeaIceDto {
    private List<String> year;
    private List<Double> extent;
    private List<String> images;
    private Double summaryArctic;

    public ArcticSeaIceDto(List<ArcticSeaIce> arcticSeaIces) {
        this.summaryArctic = arcticSeaIces.get(arcticSeaIces.size()-1).getExtent() - arcticSeaIces.get(0).getExtent();
        this.year = arcticSeaIces.stream().map(s -> String.valueOf(s.getYear())).collect(Collectors.toList());
        this.extent = arcticSeaIces.stream().map(ArcticSeaIce::getExtent).collect(Collectors.toList());
        this.images = arcticSeaIces.stream().map(ArcticSeaIce::getImgUrl).collect(Collectors.toList());
    }
}
