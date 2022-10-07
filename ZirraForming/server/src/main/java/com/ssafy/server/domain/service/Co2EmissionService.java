package com.ssafy.server.domain.service;

import com.ssafy.server.domain.entity.Co2Emission;
import com.ssafy.server.domain.entity.Co2EmissionImg;
import com.ssafy.server.domain.repository.Co2EmissionImgRepository;
import com.ssafy.server.domain.repository.Co2EmissionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class Co2EmissionService {

    private final Co2EmissionRepository co2EmissionRepository;
    private final Co2EmissionImgRepository co2EmissionImgRepository;

    @Cacheable(value = "getCo2")
    public List<Co2Emission> getCo2(){
        return co2EmissionRepository.findAll();
    }

    @Cacheable(value = "getCo2Img")
    public List<Co2EmissionImg> getCo2Img(){
        return co2EmissionImgRepository.findAll();
    }
}
