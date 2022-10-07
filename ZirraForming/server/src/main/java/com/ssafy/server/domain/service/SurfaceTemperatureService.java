package com.ssafy.server.domain.service;

import com.ssafy.server.domain.entity.SurfaceTemperature;
import com.ssafy.server.domain.repository.SurfaceTemperatureRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SurfaceTemperatureService {

    private final SurfaceTemperatureRepository surfaceTemperatureRepository;

    @Cacheable(value = "getTemp")
    public List<SurfaceTemperature> getTemp(){
        return surfaceTemperatureRepository.findAll();
    }

}
