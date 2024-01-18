package me.adempsey.openshield.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name="comment")
@NoArgsConstructor
@Data
public class Comment {

    public Comment(Long incidentId, String commentContent, String commentAuthor, LocalDate commentDate){
        this.incidentId = incidentId;
        this.commentContent = commentContent;
        this.commentAuthor = commentAuthor;
        this.commentDate = commentDate;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="comment_id")
    private Long commentId;

    @Column(name="incident_id")
    private Long incidentId;

    @Column(name="comment_content")
    private String commentContent;

    @Column(name="comment_author")
    private String commentAuthor;

    @Column(name="comment_date")
    private LocalDate commentDate;
}
