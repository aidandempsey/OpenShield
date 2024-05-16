// hooks
import { useGet } from "../../../hooks/restful/useGet"

// utils
import formatDistanceToNow from "date-fns/formatDistanceToNow"

// material
import MuiLoading from "../../../components/material/loading/MuiLoading"

export default function IncidentComment(props) {
    const { comment } = props
    const { data, httpError, isLoading } = useGet(`users/getDisplayNameFromUserId?userId=${comment.commentAuthor}`)

    if (httpError) return <div className="error">{httpError}</div>
    if (isLoading) return <MuiLoading />

    return (
        <li >
            <div className="comment-author">{data}</div>
            <div className="comment-date"><p> posted {formatDistanceToNow(comment.commentDate, { addSuffix: true })}</p></div>
            <div className="comment-content"><p>{comment.commentContent}</p></div>
        </li>
    )
}
