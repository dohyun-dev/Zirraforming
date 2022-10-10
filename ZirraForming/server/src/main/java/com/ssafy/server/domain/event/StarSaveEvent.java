package com.ssafy.server.domain.event;

import com.ssafy.server.domain.entity.Stars;
import lombok.Data;

@Data
public class StarSaveEvent {

    private final Long memberId;

    public StarSaveEvent(Long memberId) {
        this.memberId = memberId;
    }
}
