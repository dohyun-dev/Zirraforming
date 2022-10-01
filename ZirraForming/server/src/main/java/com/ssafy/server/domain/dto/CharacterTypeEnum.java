package com.ssafy.server.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum CharacterTypeEnum {
    주디("환경지킴이 주디"),
    진구("환경 어린이 진구"),
    푸("환경 애호가 곰돌이 푸"),
    코난("환경분석관 코난"),
    펭수("환경 지도자 펭수"),
    보노보노("환경분석관 코난"),
    다람이("환경수호자 다람이"),
    짱구("모험가 짱구");

    private final String name;
}
