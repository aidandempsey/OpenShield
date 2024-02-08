package me.adempsey.openshield.requestmodels;

import lombok.Data;
import me.adempsey.openshield.entity.enums.IncidentSeverity;

import java.time.LocalDateTime;
import java.util.Optional;

@Data
public class IncidentRequest {
    private String incidentName;
    private Optional<String> incidentDescription;
    private Optional<Long> organizationId;
    private IncidentSeverity incidentSeverity;
    private Optional<LocalDateTime> closureDate;
    private Optional<String> assignerUserId;
}
