package com.ssafy.server.domain.entity;

import lombok.Getter;

import javax.persistence.*;

@Getter
@Entity @Table(name = "air_pollution")
public class AirPollution {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Short year;

    private Double no;

    private Double co2;

    private Double ch4;
}

