import { useState } from "react";
import { timestamp } from "../../firebase/config";
import { useAuthContext } from "../../hooks/firebase/useAuthContext";

export default function IncidentComment() {
    const [newComment, setNewComment] = useState("")

    const handleSubmit = async e => {
        e.preventDefault()
    }

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
        </div>
    )
}
