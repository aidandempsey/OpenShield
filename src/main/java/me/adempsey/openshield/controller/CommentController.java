package me.adempsey.openshield.controller;
import me.adempsey.openshield.entity.Comment;
import me.adempsey.openshield.requestmodels.CommentRequest;
import me.adempsey.openshield.service.CommentService;
import me.adempsey.openshield.utils.GetUidFromJWT;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/secure/comments")
public class CommentController {
    private final CommentService commentService;

    public CommentController(CommentService commentService){this.commentService = commentService;}

    @PostMapping("/createComment")
    public Comment createComment(@RequestHeader(value = "Authorization")String token, @RequestBody CommentRequest commentRequest) throws Exception {
        return commentService.createComment(GetUidFromJWT.validateToken(token), commentRequest);
    }
}
