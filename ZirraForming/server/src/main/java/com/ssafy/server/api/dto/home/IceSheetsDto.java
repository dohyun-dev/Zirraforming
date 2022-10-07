package com.ssafy.server.api.dto.home;

import com.ssafy.server.domain.entity.IceSheets;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
public class IceSheetsDto {
    private List<String> year;
    private List<Double> mass;
    private Double summaryIceSheets;

    public IceSheetsDto(List<IceSheets> iceSheets){
        this.summaryIceSheets = iceSheets.get(iceSheets.size()-1).getMass()
                - iceSheets.get(iceSheets.size()-2).getMass();
        this.year = iceSheets.stream().map(i -> i.getDateInfo().makeDate()).collect(Collectors.toList());
        this.mass = iceSheets.stream().map(IceSheets::getMass).collect(Collectors.toList());
    }
}
