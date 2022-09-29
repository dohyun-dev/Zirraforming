package com.ssafy.server.api.dto.star;

import com.ssafy.server.domain.entity.Trash;
import lombok.Data;

@Data
public class StarSaveResponse {
    private String type;
    private String iceAmount;
    private String co2Amount;
    private String comment;

    public StarSaveResponse(Trash trash) {
        this.type = trash.getType();
        this.iceAmount = String.format("%.1f", trash.getIce());
        this.co2Amount = String.valueOf(Math.round(trash.getCo2()));
        this.comment = trash.getComment();
    }
}
