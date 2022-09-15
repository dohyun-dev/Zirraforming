package com.ssafy.server.domain.entity;

import javax.persistence.*;

@Entity
@Table(name = "climate_change")
public class ClimateChange {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String country;

    private Short year;

    private Double temperature;
}
