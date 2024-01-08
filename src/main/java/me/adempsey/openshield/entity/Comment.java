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
    private Long commentId;

    @Column(name="incident_id")
    private Long incidentId;

    @Column(name="comment")
    private String comment;

    @Column(name="comment_author")
    private Long commentAuthor;

    @Column(name="comment_date")
    private LocalDate commentDate;
}
