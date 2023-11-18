package me.adempsey.openshield.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name="comments")
@Data
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="comment_id")
    private long incidentCommentId;

    @Column(name="incident_id")
    private long incidentId;

    @Column(name="comment")
    private long comment;

    @Column(name="comment_author")
    private long commentAuthor;

    @Column(name="comment_date")
    private LocalDate commentDate;
}
