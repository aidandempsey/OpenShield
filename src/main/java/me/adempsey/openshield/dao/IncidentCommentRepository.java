package me.adempsey.openshield.dao;

import me.adempsey.openshield.entity.IncidentComment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

public interface IncidentCommentRepository extends JpaRepository<IncidentComment, Long> {
    Page<IncidentComment> findByCommentAuthor(@RequestParam("comment_author")Long commentAuthor, Pageable pageable);
    Page<IncidentComment> findByIncidentId(@RequestParam("incident_id")Long incidentId, Pageable pageable);
}
