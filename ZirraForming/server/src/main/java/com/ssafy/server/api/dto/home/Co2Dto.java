package com.ssafy.server.api.dto.home;

import com.ssafy.server.domain.entity.Co2Emission;
import com.ssafy.server.domain.entity.Co2EmissionImg;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
public class Co2Dto {
    private List<String> year;
    private List<Double> co2;
    private List<String> imgYear;
    private List<String> images;

    public Co2Dto(List<Co2Emission> co2Emission, List<Co2EmissionImg> co2EmissionImg) {
        this.year = co2Emission.stream().map(e -> e.makeDate()).collect(Collectors.toList());
        this.co2 = co2Emission.stream().map(Co2Emission::getEmission).collect(Collectors.toList());
        this.imgYear = co2Emission.stream().map(e -> e.makeDate()).collect(Collectors.toList());;
        this.images = co2EmissionImg.stream().map(Co2EmissionImg::getImgUrl).collect(Collectors.toList());;
    }
}
