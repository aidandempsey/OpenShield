package me.adempsey.openshield.requestmodels;

import lombok.Data;

import java.util.Optional;

@Data
public class TaskRequest {
    private String taskName;
    private Optional<String> taskDescription;
    private Long incidentId;
    private Optional<String> assignedUserId;
}
