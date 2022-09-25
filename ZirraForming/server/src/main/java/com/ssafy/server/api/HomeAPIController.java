package com.ssafy.server.api;

import com.ssafy.server.api.dto.home.Co2Dto;
import com.ssafy.server.api.dto.home.HomeResponse;
import com.ssafy.server.domain.service.Co2EmissionService;
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

    @GetMapping(value = "/co2", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Co2Dto> getCo2() {
        Co2Dto co2Dto = new Co2Dto(co2EmissionService.getCo2(), co2EmissionService.getCo2Img());
        return ResponseEntity.ok(co2Dto);
    }

    @GetMapping(value = "/total", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<HomeResponse> getTotalData() {
        Co2Dto co2Dto = new Co2Dto(co2EmissionService.getCo2(), co2EmissionService.getCo2Img());
        HomeResponse result = new HomeResponse(co2Dto);
        return ResponseEntity.ok(result);
    }
}
