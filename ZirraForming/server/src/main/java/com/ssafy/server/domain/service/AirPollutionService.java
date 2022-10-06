package com.ssafy.server.domain.service;

import com.ssafy.server.domain.entity.AirPollution;
import com.ssafy.server.domain.repository.AirPollutionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AirPollutionService {
    private final AirPollutionRepository airPollutionRepository;

    @Cacheable(value = "getAirPollution")
    public List<AirPollution> getAirPollution(){
        return airPollutionRepository.findAll();
    }
}
