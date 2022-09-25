package com.ssafy.server.domain.entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
@Table(name = "co2_emission")
public class Co2Emission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Short year;

    private Short month;

    private Double emission;
}
