package me.adempsey.openshield.entity.keys;

import java.io.Serializable;

import jakarta.persistence.Column;
import lombok.Data;
@Data
public class TaskID implements Serializable {
    private long taskId;
    private long incidentId;
}
