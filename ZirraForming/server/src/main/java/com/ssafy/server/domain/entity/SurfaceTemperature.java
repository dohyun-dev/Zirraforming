package com.ssafy.server.domain.entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
@Table(name = "surface_temperature")
public class SurfaceTemperature {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Short year;

    private Double temperature;

    private Double lowess;

    private String imgUrl;
}
