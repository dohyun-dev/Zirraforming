package com.ssafy.server.api.dto.survey;

import com.ssafy.server.domain.entity.CharacterType;
import lombok.Data;

import java.io.Serializable;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class SurveyTestResultResponse implements Serializable {
    private final String characterName;
    private final String characterImgUrl;
    private final String description;
    private final List<CampaignDto> campaigns;

    public SurveyTestResultResponse(CharacterType result) {
        this.characterName = result.getDisplayName() + " " + result.getName();
        this.characterImgUrl = result.getImgUrl();
        this.description = result.getDescription();
        this.campaigns = result.getCampaignList().stream().map(CampaignDto::new).collect(Collectors.toList());
    }
}
