package com.ssafy.server.domain.entity;

import javax.persistence.*;

@Entity
@Table(name = "air_polution_death")
public class AirPollutionDeath {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String country;

    private Short year;

    private Long death;

    @Column(name = "total_death")
    private Long totalDeath;
}
