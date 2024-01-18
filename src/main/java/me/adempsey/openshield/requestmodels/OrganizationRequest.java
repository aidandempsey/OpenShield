package me.adempsey.openshield.requestmodels;

import lombok.Data;
import java.util.Optional;

@Data
public class OrganizationRequest {
    private String organizationName;
    private String organizationLeader;
    private Optional<String> organizationDescription;
}