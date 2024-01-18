package me.adempsey.openshield.service;

import me.adempsey.openshield.dao.CommentRepository;
import me.adempsey.openshield.entity.Comment;
import me.adempsey.openshield.requestmodels.CommentRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@Transactional
public class CommentService {
    private final CommentRepository commentRepository;

    @Autowired
    public CommentService(CommentRepository commentRepository){this.commentRepository = commentRepository; }

    public Comment createComment(String commentAuthor, CommentRequest commentRequest) throws Exception{
        Comment comment = new Comment();
        comment.setCommentAuthor(commentAuthor);
        comment.setIncidentId(commentRequest.getIncidentId());
        comment.setCommentContent(commentRequest.getCommentContent());
        comment.setCommentDate(LocalDate.now());
        commentRepository.save(comment);
        return comment;
    }
}
