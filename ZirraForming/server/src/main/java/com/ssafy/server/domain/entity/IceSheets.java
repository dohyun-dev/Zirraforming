package com.ssafy.server.domain.entity;

import javax.persistence.*;

@Entity
@Table(name = "ice_sheets")
public class IceSheets {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Short year;

    private Double mass;
}
