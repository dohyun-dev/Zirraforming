package com.ssafy.server.api.dto.home;

import com.ssafy.server.domain.entity.AirPollution;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AirPollutionDto {
    private List<String> year;
    private List<Double> no;
    private List<Double> co2;
    private List<Double> ch4;

    public AirPollutionDto(List<AirPollution> airPollutionList) {
        this.year = airPollutionList.stream().map(a -> String.valueOf(a.getYear())).collect(Collectors.toList());
        this.no = airPollutionList.stream().map(AirPollution::getNo).collect(Collectors.toList());
        this.co2 = airPollutionList.stream().map(AirPollution::getCo2).collect(Collectors.toList());
        this.ch4 = airPollutionList.stream().map(AirPollution::getCh4).collect(Collectors.toList());
    }
}
