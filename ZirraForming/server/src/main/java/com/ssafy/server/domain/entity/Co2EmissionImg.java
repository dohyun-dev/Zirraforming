package com.ssafy.server.domain.entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
@Table(name = "co2_emission_img")
public class Co2EmissionImg {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Short year;

    private Short month;

    private String imgUrl;

    public String makeDate() {
        return year.toString() + "-" + month.toString();
    }
}
