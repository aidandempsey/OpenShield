import { useGet } from "../../../hooks/restful/useGet"
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import { useAuthContext } from "../../../hooks/firebase/useAuthContext"

export default function Task(props) {
    const { task } = props
    const { user } = useAuthContext()
    const { data: assignedUserName, httpError: assignedUserHttpError, isLoading: assignedUserIsLoading } = useGet(`secure/users/getDisplayNameFromUserId?userId=${task.assignedUserId}`)
    const { data: assignerUserName, httpError: assignerUserHttpError, isLoading: assignerUserIsLoading } = useGet(`secure/users/getDisplayNameFromUserId?userId=${task.assignerUserId}`)
    const { data: taskAssigned, httpError: taskAssignedHttpError, isLoading: taskAssignedIsLoading } = useGet(`secure/tasks/isTaskAssigned?taskId=${task.taskId}`)
    const { data: taskAssignedToUser, httpError: taskAssignedToUserHttpError, isLoading: taskAssignedToUserIsLoading } = useGet(`secure/tasks/isTaskAssignedToUser?assignedUserId=${user.uid}&taskId=${task.taskId}`) ?? false

    const convertStatus = status => ({
        "open": "Open",
        "inProgress": "In Progress",
        "closed": "Closed"
    }[status])

    if (assignedUserHttpError || assignerUserHttpError || taskAssignedHttpError || taskAssignedToUserHttpError) return <div className="error">{assignedUserHttpError || assignerUserHttpError || taskAssignedHttpError || taskAssignedToUserHttpError}</div>
    if (assignedUserIsLoading || assignerUserIsLoading || taskAssignedIsLoading || taskAssignedToUserIsLoading) return <div className="Loading">loading...</div>

    if (task) {
        return (
            <li>
                <div className="task-name"><h4>{task.taskName}</h4></div>
                <div className="task-assigned-date"><p>Assigned {formatDistanceToNow(task.assignDate, { addSuffix: true })}</p></div>
                <div className="task-description"><p>{task.taskDescription}</p></div>
                <div className="task-assigned-user"><p>Assigned to {assignedUserName}</p></div>
                <div className="task-assigner-user"><p>Assigned by {assignerUserName}</p></div>
                <div className="task-status"><p>{convertStatus(task.taskStatus)}</p></div>
                {(!taskAssigned === "true") && <button className="btn">Assign</button>}
                {(taskAssignedToUser === "true") && <button className="btn">Unassign</button>}

            </li>
        )
    }

}
