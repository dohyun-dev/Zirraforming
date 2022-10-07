package com.ssafy.server.api.dto.star;

import com.ssafy.server.domain.entity.Trash;
import lombok.Data;

@Data
public class StarSaveResponse {
    private String type;
    private String iceAmount;
    private String co2Amount;
    private String comment;
    private String imgUrl;

    public StarSaveResponse(Trash trash) {
        this.type = trash.getName();
        this.iceAmount = String.format("%.1f", trash.getIce());
        this.co2Amount = String.format("%.1f", trash.getCo2());
        this.comment = trash.getComment();
        this.imgUrl = trash.getImgUrl();
    }
}
