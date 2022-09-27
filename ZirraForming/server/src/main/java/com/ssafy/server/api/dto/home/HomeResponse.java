package com.ssafy.server.api.dto.home;

import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Getter
public class HomeResponse {
    private List<Double> summary;
    private Co2Dto co2;
    private SurfaceTemperatureDto temperature;
    private ArcticSeaIceDto arcticSeaIceDto;
    private IceSheetsDto iceSheetsDto;

    public HomeResponse(Co2Dto co2, SurfaceTemperatureDto surfaceTemperatureDto,
                        ArcticSeaIceDto arcticSeaIceDto, IceSheetsDto iceSheetsDto) {

        this.summary = Stream.of(co2.getSummaryCo2(), surfaceTemperatureDto.getSummaryTemp(),
                arcticSeaIceDto.getSummaryArctic(), iceSheetsDto.getSummaryIceSheets()).collect(Collectors.toList());
        this.co2 = co2;
        this.temperature = surfaceTemperatureDto;
        this.arcticSeaIceDto = arcticSeaIceDto;
        this.iceSheetsDto = iceSheetsDto;
    }
}
