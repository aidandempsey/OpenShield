package me.adempsey.openshield.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name="comment")
@Data
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="comment_id")
    private long commentId;

    @Column(name="incident_id")
    private long incidentId;

    @Column(name="comment")
    private String comment;

    @Column(name="comment_author")
    private long commentAuthor;

    @Column(name="comment_date")
    private LocalDate commentDate;
}
