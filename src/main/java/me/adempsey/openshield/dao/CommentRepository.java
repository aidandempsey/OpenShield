package me.adempsey.openshield.dao;

import me.adempsey.openshield.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    // foreign keys
    Page<Comment> findByCommentAuthor(@RequestParam("comment_author")String commentAuthor, Pageable pageable);
    Page<Comment> findByIncidentId(@RequestParam("incident_id")Long incidentId, Pageable pageable);
}
