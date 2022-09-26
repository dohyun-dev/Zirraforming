package com.ssafy.server.api;

import com.ssafy.server.api.dto.home.ArcticSeaIceDto;
import com.ssafy.server.api.dto.home.Co2Dto;
import com.ssafy.server.api.dto.home.HomeResponse;
import com.ssafy.server.api.dto.home.SurfaceTemperatureDto;
import com.ssafy.server.domain.service.ArcticSeaIceService;
import com.ssafy.server.domain.service.Co2EmissionService;
import com.ssafy.server.domain.service.SurfaceTemperatureService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class HomeAPIController {

    private final Co2EmissionService co2EmissionService;
    private final SurfaceTemperatureService surfaceTemperatureService;

    private final ArcticSeaIceService arcticSeaIceService;

    @GetMapping(value = "/co2", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Co2Dto> getCo2() {
        Co2Dto co2Dto = new Co2Dto(co2EmissionService.getCo2(), co2EmissionService.getCo2Img());
        return ResponseEntity.ok(co2Dto);
    }

    @GetMapping(value = "/surfacetemper", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SurfaceTemperatureDto> getSurfaceTemperature() {
        SurfaceTemperatureDto surfaceTemperatureDto = new SurfaceTemperatureDto(surfaceTemperatureService.getTemp());
        return ResponseEntity.ok(surfaceTemperatureDto);
    }

    @GetMapping(value = "/artic", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ArcticSeaIceDto> getArcticSeaIce() {
        ArcticSeaIceDto arcticSeaIceDto = new ArcticSeaIceDto(arcticSeaIceService.getArctic());
        return ResponseEntity.ok(arcticSeaIceDto);
    }

    @GetMapping(value = "/total", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<HomeResponse> getTotalData() {
        Co2Dto co2Dto = new Co2Dto(co2EmissionService.getCo2(), co2EmissionService.getCo2Img());
        SurfaceTemperatureDto surfaceTemperatureDto = new SurfaceTemperatureDto(surfaceTemperatureService.getTemp());
        ArcticSeaIceDto arcticSeaIceDto = new ArcticSeaIceDto(arcticSeaIceService.getArctic());
        HomeResponse result = new HomeResponse(co2Dto, surfaceTemperatureDto, arcticSeaIceDto);
        return ResponseEntity.ok(result);
    }
}
