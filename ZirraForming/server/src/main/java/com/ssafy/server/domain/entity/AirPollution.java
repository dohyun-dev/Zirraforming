package com.ssafy.server.domain.entity;

import javax.persistence.*;

@Entity
@Table(name = "air_pollution")
public class AirPollution {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Short year;

    private String kind;

    private Double emission;
}
