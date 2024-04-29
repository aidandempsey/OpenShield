package me.adempsey.openshield.requestmodels;

import lombok.Data;

@Data
public class CommentRequest {
    private Long incidentId;
    private String commentContent;
}
