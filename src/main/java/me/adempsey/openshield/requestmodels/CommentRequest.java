package me.adempsey.openshield.requestmodels;

import lombok.Data;
import java.time.LocalDate;

@Data
public class CommentRequest {
    private Long incidentId;
    private String commentContent;
}
