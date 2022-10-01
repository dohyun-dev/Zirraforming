package com.ssafy.server.domain.dto;

import lombok.Data;

import java.util.List;

@Data
public class PredictResultResponse {
    double temperature_2030;
    double ice_2030;
    double co2_2030;
    List<Integer> year;
    List<Double> temperature;
    List<Double> temperature_predict;
    List<Double> ice_mass;
    List<Double> ice_mass_predict;
}
