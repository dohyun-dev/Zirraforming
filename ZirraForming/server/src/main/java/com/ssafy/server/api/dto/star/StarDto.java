package com.ssafy.server.api.dto.star;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class StarDto {
    private Long memberId;
    private double co2;
    private double ice;
    private String imgUrl;
    private String type;
}
