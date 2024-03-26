import { useGet } from "../../../hooks/restful/useGet"
import formatDistanceToNow from "date-fns/formatDistanceToNow"

export default function IncidentComment(props) {
    const { comment } = props
    const { data, httpError, isLoading } = useGet(`secure/users/getDisplayNameFromUserId?userId=${comment.commentAuthor}`)

    if (httpError) return <div className="error">{httpError}</div>
    if (isLoading) return <div className="Loading">loading...</div>

    return (
        <li >
            <div className="comment-author">{data}</div>
            <div className="comment-date"><p> posted {formatDistanceToNow(comment.commentDate, { addSuffix: true })}</p></div>
            <div className="comment-content"><p>{comment.commentContent}</p></div>
        </li>
    )
}
