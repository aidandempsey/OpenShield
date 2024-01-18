package me.adempsey.openshield.requestmodels;

import lombok.Data;
import me.adempsey.openshield.entity.enums.IncidentSeverity;

import java.time.LocalDate;
import java.util.Optional;

@Data
public class IncidentRequest {
    private String incidentName;
    private Optional<String> incidentDescription;
    private Optional<Long> teamId;
    private IncidentSeverity incidentSeverity;
    private Optional<LocalDate> closureDate;
    private Optional<String> assignerUserId;
}
