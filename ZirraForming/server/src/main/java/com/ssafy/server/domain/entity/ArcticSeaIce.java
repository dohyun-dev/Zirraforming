package com.ssafy.server.domain.entity;

import javax.persistence.*;

@Entity
@Table(name = "arctic_sea_ice")
public class ArcticSeaIce {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Short year;

    private Double extent;
}
