// hooks
import { useGet } from "../../../hooks/restful/useGet"
import { useUpdateResource } from "../../../hooks/restful/useUpdateResource"
import { useColourStyle } from "../../../hooks/utils/useColourStyle"
import { useState } from "react"

// utils
import formatDistanceToNow from "date-fns/formatDistanceToNow"

// components
import Select from 'react-select'

// material
import MuiButton from "../../../components/material/buttons/MuiButton"
import MuiDisabledButton from "../../../components/material/buttons/MuiDisabledButton"
import MuiLoading from "../../../components/material/loading/MuiLoading"

export default function Task(props) {
    const { task, usersList } = props
    const [newAssignedUser, setNewAssignedUser] = useState(null)
    const { data: assignedUserName, httpError: assignedUserHttpError, isLoading: assignedUserIsLoading } = useGet(`users/getDisplayNameFromUserId?userId=${task.assignedUserId}`)
    const { data: assignerUserName, httpError: assignerUserHttpError, isLoading: assignerUserIsLoading } = useGet(`users/getDisplayNameFromUserId?userId=${task.assignerUserId}`)
    const { data: taskAssignedToUser, httpError: taskAssignedToUserHttpError, isLoading: taskAssignedToUserIsLoading } = useGet(`tasks/isTaskAssignedToUser?taskId=${task.taskId}`) ?? false
    const { data: taskOpen, httpError: taskOpenHttpError, isLoading: taskOpenIsLoading } = useGet(`tasks/isTaskOpen?taskId=${task.taskId}`)

    const { updateResource: patchAssignedUser, httpError: patchAssignedUserHttpError, isLoading: isPatchAssignedUserLoading } = useUpdateResource("PATCH")
    const { updateResource: patchStatus, httpError: patchStatusHttpError, isLoading: isPatchStatusLoading } = useUpdateResource("PATCH")

    const convertStatus = status => ({
        "open": "Open",
        "inProgress": "In Progress",
        "closed": "Closed"
    }[status])

    const colourStyles = useColourStyle()

    const unassign = (id) => {
        const { data } = patchAssignedUser(`tasks/updateAssignedUser?taskId=${id}&assignedUserId=${newAssignedUser}`);
    }

    const close = id => {
        const { data } = patchStatus(`tasks/changeStatus?taskId=${id}&taskStatus=closed`);
    }

    if (assignedUserHttpError || assignerUserHttpError || taskAssignedToUserHttpError || patchAssignedUserHttpError || patchStatusHttpError || taskOpenHttpError) return <div className="error">{assignedUserHttpError || assignerUserHttpError || taskAssignedToUserHttpError || patchAssignedUserHttpError || patchStatusHttpError || taskOpenHttpError}</div>
    if (assignedUserIsLoading || assignerUserIsLoading || taskAssignedToUserIsLoading || isPatchAssignedUserLoading || isPatchStatusLoading || taskOpenIsLoading) return <MuiLoading />

    if (task) {
        return (
            <li className={`${task.taskStatus}`}>
                <div className="task-name"><h4>{task.orderNumber}. {task.taskName}</h4></div>
                <div className="task-assigned-date"><p>Assigned to {assignedUserName} by {assignerUserName} {formatDistanceToNow(task.assignDate, { addSuffix: true })}</p></div>
                <div className="task-description"><p>{task.taskDescription}</p></div>
                <div className={`task-status-${task.taskStatus}`}><p>{convertStatus(task.taskStatus)}</p></div>
                {(taskAssignedToUser && taskOpen) && (
                    <>
                        {taskOpen && <MuiButton text="Close" handler={() => { close(task.taskId) }} />}

                        {newAssignedUser === null && <MuiDisabledButton text="Change" />}
                        {newAssignedUser && <MuiButton text="Change" handler={() => { unassign(task.taskId) }} />}
                        {usersList.length > 0 && <Select placeholder="Assigned User" options={usersList} onChange={(option) => { setNewAssignedUser(option.value) }} styles={colourStyles} className="selector assigned-user-selector" />}
                    </>)}
            </ li >
        )
    }

}
