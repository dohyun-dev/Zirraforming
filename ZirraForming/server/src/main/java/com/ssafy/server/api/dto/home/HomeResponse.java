package com.ssafy.server.api.dto.home;

import lombok.Builder;
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
    private AirPollutionDto airPollution;

    @Builder
    public HomeResponse(Co2Dto co2Dto, SurfaceTemperatureDto surfaceTemperatureDto,
                        ArcticSeaIceDto arcticSeaIceDto, IceSheetsDto iceSheetsDto, AirPollutionDto airPollutionDto) {

        this.summary = Stream.of(surfaceTemperatureDto.getSummaryTemp(), co2Dto.getSummaryCo2(),
                arcticSeaIceDto.getSummaryArctic(), iceSheetsDto.getSummaryIceSheets()).collect(Collectors.toList());
        this.co2 = co2Dto;
        this.temperature = surfaceTemperatureDto;
        this.arcticSeaIceDto = arcticSeaIceDto;
        this.iceSheetsDto = iceSheetsDto;
        this.airPollution = airPollutionDto;
    }
}
