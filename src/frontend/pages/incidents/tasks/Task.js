import { useGet } from "../../../hooks/restful/useGet"
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import { useAuthContext } from "../../../hooks/firebase/useAuthContext"
import { usePatch } from "../../../hooks/restful/usePatch"
import { useColourStyle } from "../../../hooks/style/useColourStyle"
import Select from 'react-select'
import { useState } from "react"

export default function Task(props) {
    const { task, usersList } = props
    const { user } = useAuthContext()
    const [newAssignedUser, setNewAssignedUser] = useState(null)
    const { data: assignedUserName, httpError: assignedUserHttpError, isLoading: assignedUserIsLoading } = useGet(`secure/users/getDisplayNameFromUserId?userId=${task.assignedUserId}`)
    const { data: assignerUserName, httpError: assignerUserHttpError, isLoading: assignerUserIsLoading } = useGet(`secure/users/getDisplayNameFromUserId?userId=${task.assignerUserId}`)
    const { data: taskAssigned, httpError: taskAssignedHttpError, isLoading: taskAssignedIsLoading } = useGet(`secure/tasks/isTaskAssigned?taskId=${task.taskId}`)
    const { data: taskAssignedToUser, httpError: taskAssignedToUserHttpError, isLoading: taskAssignedToUserIsLoading } = useGet(`secure/tasks/isTaskAssignedToUser?assignedUserId=${user.uid}&taskId=${task.taskId}`) ?? false
    const { data: taskOpen, httpError: taskOpenHttpError, isLoading: taskOpenIsLoading } = useGet(`secure/tasks/isTaskOpen?taskId=${task.taskId}`)

    const { patch: patchAssignedUser, httpError: patchAssignedUserHttpError, isLoading: isPatchAssignedUserLoading } = usePatch()
    const { patch: patchStatus, httpError: patchStatusHttpError, isLoading: isPatchStatusLoading } = usePatch()


    const convertStatus = status => ({
        "open": "Open",
        "inProgress": "In Progress",
        "closed": "Closed"
    }[status])

    const colourStyles = useColourStyle()

    const unassign = (id) => {
        const { data } = patchAssignedUser(`secure/tasks/updateAssignedUser?taskId=${id}&assignedUserId=${newAssignedUser}`);
    }

    const close = id => {
        const { data } = patchStatus(`secure/tasks/changeStatus?taskId=${id}&taskStatus=closed`);

    }

    if (assignedUserHttpError || assignerUserHttpError || taskAssignedHttpError || taskAssignedToUserHttpError || patchAssignedUserHttpError || patchStatusHttpError || taskOpenHttpError) return <div className="error">{assignedUserHttpError || assignerUserHttpError || taskAssignedHttpError || taskAssignedToUserHttpError || patchAssignedUserHttpError || patchStatusHttpError || taskOpenHttpError}</div>
    if (assignedUserIsLoading || assignerUserIsLoading || taskAssignedIsLoading || taskAssignedToUserIsLoading || isPatchAssignedUserLoading || isPatchStatusLoading || taskOpenIsLoading) return <div className="Loading">loading...</div>

    if (task) {
        return (
            <li className={`${task.taskStatus}`}>
                <div className="task-name"><h4>{task.taskName}</h4></div>
                <div className="task-assigned-date"><p>Assigned to {assignedUserName} by {assignerUserName} {formatDistanceToNow(task.assignDate, { addSuffix: true })}</p></div>
                <div className="task-description"><p>{task.taskDescription}</p></div>
                <div className={`task-status-${task.taskStatus}`}><p>{convertStatus(task.taskStatus)}</p></div>
                {(!taskAssigned) && <button className="btn">Assign</button>}
                {(taskAssignedToUser && taskOpen) && (
                    <>
                        {taskOpen && <button className="inverted-btn" onClick={() => { close(task.taskId) }}>Close</button>}
                        {newAssignedUser === null && <button className="disabled-btn" type="button" disabled>Change</button>}
                        {newAssignedUser && <button className="btn" onClick={() => { unassign(task.taskId) }}>Change</button>}
                        {usersList.length > 0 && <Select placeholder="Assigned User" options={usersList} onChange={(option) => { setNewAssignedUser(option.value) }} styles={colourStyles} className="selector assigned-user-selector" />}
                    </>)}
            </ li >
        )
    }

}
