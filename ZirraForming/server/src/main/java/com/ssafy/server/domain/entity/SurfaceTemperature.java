package com.ssafy.server.domain.entity;

import javax.persistence.*;

@Entity
@Table(name = "surface_temperature")
public class SurfaceTemperature {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Short year;

    private Double temperature;

    private Double lowess;

    @Column(name = "img_url")
    private String imgUrl;
}
