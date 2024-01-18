import { useValue } from "../../../hooks/restful/useValue"
import formatDistanceToNow from "date-fns/formatDistanceToNow"

export default function IncidentComment(props) {
    const { comment } = props
    const { value, valueHttpError, isValueLoading } = useValue(`secure/users/getDisplayNameFromUserId?userId=${comment.commentAuthor}`)

    if (valueHttpError) return <div className="error">{valueHttpError}</div>
    if (isValueLoading) return <div className="Loading">loading...</div>
    return (
        <li >
            <div className="comment-author">{value}</div>
            <div className="comment-date"><p> posted {formatDistanceToNow(comment.commentDate, { addSuffix: true })}</p></div>
            <div className="comment-content"><p>{comment.commentContent}</p></div>
        </li>
    )
}
