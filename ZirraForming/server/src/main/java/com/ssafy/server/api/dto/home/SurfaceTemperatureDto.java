package com.ssafy.server.api.dto.home;

import com.ssafy.server.domain.entity.Co2Emission;
import com.ssafy.server.domain.entity.Co2EmissionImg;
import com.ssafy.server.domain.entity.SurfaceTemperature;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
public class SurfaceTemperatureDto {
    private List<String> year;
    private List<Double> temperature;
    private List<Double> lowess;
    private List<String> images;

    public SurfaceTemperatureDto(List<SurfaceTemperature> surfaceTemperatures) {
        this.year = surfaceTemperatures.stream().map(s -> String.valueOf(s.getYear())).collect(Collectors.toList());
        this.temperature = surfaceTemperatures.stream().map(SurfaceTemperature::getTemperature).collect(Collectors.toList());
        this.lowess = surfaceTemperatures.stream().map(SurfaceTemperature::getLowess).collect(Collectors.toList());
        this.images = surfaceTemperatures.stream().map(SurfaceTemperature::getImgUrl).collect(Collectors.toList());
    }
}
