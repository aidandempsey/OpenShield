import { useEffect, useState } from "react";
import { timestamp } from "../../firebase/config";
import { useAuthContext } from "../../hooks/firebase/useAuthContext";
import { useTable } from "../../hooks/restful/useTable"

export default function IncidentComment(props) {
    const [newComment, setNewComment] = useState("")
    const [comments, setComments] = useState([])
    const { tableData, tableHttpError, isTableLoading } = useTable(`comments/search/findByIncidentId?incidentId=${props.incidentId}`)

    const handleSubmit = async e => {
        e.preventDefault()
    }

    useEffect(() => {
        if (tableData) {
            setComments(tableData.comments || [])
        }

    }, [tableData])

    return (
        <div className="incident-comments">
            <h4>Incident Comments</h4>
            <form className="add-comment" onSubmit={handleSubmit}>
                <label>
                    <span className="add-new-comment">Add new comment</span>
                    <textarea
                        required
                        onChange={(e) => setNewComment(e.target.value)}
                        value={newComment}
                    ></textarea>
                </label>
                <button className="btn">Add Comment</button>
            </form>
            <ul>
                {comments.length > 0 && comments.map(comment => (
                    <li key={comment.commentId}>
                        <div className="comment-author"></div>
                        <div className="comment-date"><p>{comment.commentDate}</p></div>
                        <div className="comment-content"><p>{comment.comment}</p></div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
