// hooks
import { useState } from "react";
import { useGet } from "../../../hooks/restful/useGet";
import { useUpdateResource } from "../../../hooks/restful/useUpdateResource";

// material
import MuiButton from "../../../components/material/buttons/MuiButton";
import MuiLoading from "../../../components/material/loading/MuiLoading"

// components
import Comment from "./Comment"

// styles & images
import "./Comments.css"

export default function CommentList(props) {
    const { incidentId } = props
    const [commentContent, setCommentContent] = useState("")
    const { data, httpError, isLoading } = useGet(`comments/search/findByIncidentId?incidentId=${incidentId}`);
    const { updateResource: post, httpError: postHttpError, isLoading: postIsLoading } = useUpdateResource("POST")

    const handleSubmit = async e => {
        e.preventDefault()
        post("comments/createComment", { incidentId, commentContent })
        setCommentContent("")
    }

    if (httpError || postHttpError) return <div className="error">{httpError || postHttpError}</div>
    if (isLoading || postIsLoading) return <MuiLoading />

    return (
        <div className="comments">
            <form className="add-comment" onSubmit={handleSubmit}>
                <h4>Incident Comments</h4>
                <label>
                    <span className="add-new-comment">Add new comment</span>
                    <textarea required onChange={(e) => setCommentContent(e.target.value)} value={commentContent}></textarea>
                </label>
                <MuiButton type="submit" text="Add Comment" />
            </form>
            <ul>
                {data?._embedded?.comments.length === 0 && <p>No Comments Yet!</p>}
                {data?._embedded?.comments.length > 0 && data._embedded.comments.map(comment => (
                    <Comment key={comment.commentId} comment={comment} />
                ))}
            </ul>
        </div>
    )
}
