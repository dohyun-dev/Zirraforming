package com.ssafy.server.api.dto.home;

import com.ssafy.server.domain.entity.Co2Emission;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Co2Dto {
    private final List<String> year;
    private final List<Double> co2;
    private final List<String> imgYear;
    private final List<String> images;

    public Co2Dto(Co2Emission co2Emission, Co2E) {
        this.year = year;
        this.co2 = co2;
        this.imgYear = imgYear;
        this.images = images;
    }

    public combineC
}
