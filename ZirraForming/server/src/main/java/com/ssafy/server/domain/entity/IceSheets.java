package com.ssafy.server.domain.entity;

import lombok.Getter;

import javax.persistence.*;

@Getter
@Table(name = "ice_sheets")
@Entity
public class IceSheets{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double mass;

    @Embedded
    private DateInfo dateInfo;
}
