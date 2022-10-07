package com.ssafy.server.domain.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;

@Getter
@Embeddable
@NoArgsConstructor
public class DateInfo {
    private Short year;

    private Short month;

    public String makeDate(){
        return String.format("%4d-%02d", year, month);
    }
}
