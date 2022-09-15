package com.ssafy.server.domain.entity;

import javax.persistence.*;

@Entity
@Table(name = "air_pollution_emission")
public class AirPollutionEmission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String country;

    private Short year;

    private Double no;

    private Double so;

    @Column(name = "ultra_particular")
    private Double ultraParticular;

    private Double particular;

    private Double co;

    private Double nmvoc;
}
