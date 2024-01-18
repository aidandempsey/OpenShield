package me.adempsey.openshield.requestmodels;

import lombok.Data;

import java.time.LocalDate;
import java.util.Optional;

@Data
public class TaskRequest {
    private String taskName;
    private Optional<String> taskDescription;
    private Long incidentId;
    private Optional<String> assignerUserId;
    private Optional<String> assignedUserId;
    private Optional<LocalDate> assignDate;
}
