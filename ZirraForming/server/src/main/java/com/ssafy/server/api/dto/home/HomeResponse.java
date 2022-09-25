package com.ssafy.server.api.dto.home;

import lombok.Getter;

@Getter
public class HomeResponse {
    private Co2Dto co2;

    public HomeResponse(Co2Dto co2) {
        this.co2 = co2;
    }
}
