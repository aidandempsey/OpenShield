import { useEffect, useState } from "react";
import { useGet } from "../../../hooks/restful/useGet";
import Comment from "./Comment"
import "./Comments.css"

export default function CommentList(props) {
    const [newComment, setNewComment] = useState("")
    const { data, httpError, isLoading } = useGet(`comments/search/findByIncidentId?incidentId=${props.incidentId}`);

    const handleSubmit = async e => {
        e.preventDefault()
    }

    useEffect(() => {
    }, [])

    if (httpError) return <div className="error">{httpError}</div>
    if (isLoading) return <div className="Loading">loading...</div>

    return (
        <div className="comments">
            <form className="add-comment" onSubmit={handleSubmit}>
                <h4>Incident Comments</h4>
                <label>
                    <span className="add-new-comment">Add new comment</span>
                    <textarea required onChange={(e) => setNewComment(e.target.value)} value={newComment}></textarea>
                </label>
                <button className="btn">Add Comment</button>
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
