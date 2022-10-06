package com.ssafy.server.domain.service;

import com.ssafy.server.domain.entity.IceSheets;
import com.ssafy.server.domain.repository.IceSheetsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class IceSheetsService {
    private final IceSheetsRepository iceSheetsRepository;

    @Cacheable(value = "getIceSheets")
    public List<IceSheets> getIceSheets(){
        return iceSheetsRepository.findAll();
    }
}
