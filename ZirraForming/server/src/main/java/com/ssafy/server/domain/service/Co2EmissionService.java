package com.ssafy.server.domain.service;

import com.ssafy.server.domain.entity.Co2Emission;
import com.ssafy.server.domain.entity.Co2EmissionImg;
import com.ssafy.server.domain.repository.Co2EmissionImgRepository;
import com.ssafy.server.domain.repository.Co2EmissionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class Co2EmissionService {

    private final Co2EmissionRepository co2EmissionRepository;
    private final Co2EmissionImgRepository co2EmissionImgRepository;

    public List<String> getCo2Date(){
        List<Co2Emission> co2EmissionList = co2EmissionRepository.findAll();
        return co2EmissionList.stream().map(Co2Emission::getDate).collect(Collectors.toList());
    }

    public List<Double> getCo2Emission(){
        List<Co2Emission> co2EmissionList = co2EmissionRepository.findAll();
        return co2EmissionList.stream().map(Co2Emission::getEmission).collect(Collectors.toList());
    }

    public List<String> getCo2ImgDate(){
        List<Co2EmissionImg> co2EmissionImgList = co2EmissionImgRepository.findAll();
        return co2EmissionImgList.stream().map(Co2EmissionImg::getDate).collect(Collectors.toList());
    }

    public List<String> getCo2Img(){
        List<Co2EmissionImg> co2EmissionImgList = co2EmissionImgRepository.findAll();
        return co2EmissionImgList.stream().map(Co2EmissionImg::getImgUrl).collect(Collectors.toList());
    }
}
