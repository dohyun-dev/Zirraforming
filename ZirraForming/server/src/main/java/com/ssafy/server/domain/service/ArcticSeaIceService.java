package com.ssafy.server.domain.service;

import com.ssafy.server.domain.entity.ArcticSeaIce;
import com.ssafy.server.domain.repository.ArcticSeaIceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ArcticSeaIceService {
    private final ArcticSeaIceRepository arcticSeaIceRepository;
    public List<ArcticSeaIce> getArctic(){
        return arcticSeaIceRepository.findAll();
    }

}
