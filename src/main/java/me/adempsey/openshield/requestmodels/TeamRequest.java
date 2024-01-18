package me.adempsey.openshield.requestmodels;

import lombok.Data;

import java.util.Optional;

@Data
public class TeamRequest {
    private String teamName;
    private Optional<String> teamDescription;
    private String teamLeader;
    private Long organizationId;
}
