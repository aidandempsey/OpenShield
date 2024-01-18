import { useValue } from "../../../hooks/restful/useValue"
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import { useAuthContext } from "../../../hooks/firebase/useAuthContext"

export default function Task(props) {
    const { task } = props
    const { user } = useAuthContext()
    const { value: assignedUserName, valueHttpError: assignedUserHttpError, isValueLoading: assignedUserIsLoading } = useValue(`secure/users/getDisplayNameFromUserId?userId=${task.assignedUserId}`)
    const { value: assignerUserName, valueHttpError: assignerUserHttpError, isValueLoading: assignerUserIsLoading } = useValue(`secure/users/getDisplayNameFromUserId?userId=${task.assignerUserId}`)
    const { value: taskAssigned, valueHttpError: taskAssignedHttpError, isValueLoading: taskAssignedIsLoading } = useValue(`secure/tasks/isTaskAssigned?taskId=${task.taskId}`)
    const { value: taskAssignedToUser, valueHttpError: taskAssignedToUserHttpError, isValueLoading: taskAssignedToUserIsLoading } = useValue(`secure/tasks/isTaskAssignedToUser?assignedUserId=${user.uid}&taskId=${task.taskId}`) ?? false

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
                {(!taskAssigned == "true") && <button className="btn">Assign</button>}
                {(taskAssignedToUser == "true") && <button className="btn">Unassign</button>}

            </li>
        )
    }

}
