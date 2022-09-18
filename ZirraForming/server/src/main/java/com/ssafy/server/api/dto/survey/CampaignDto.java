package com.ssafy.server.api.dto.survey;

import com.ssafy.server.domain.entity.Campaign;
import lombok.Data;

import java.io.Serializable;

@Data
public class CampaignDto implements Serializable {
    private final String campaignName;
    private final String campaignUrl;
    private final String campaignImgUrl;

    public CampaignDto(Campaign campaign) {
        this.campaignName = campaign.getName();
        this.campaignUrl = campaign.getImgUrl();
        this.campaignImgUrl = campaign.getImgUrl();
    }
}
