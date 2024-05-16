// styles & images
import "./Tasks.css"

// hooks
import { useState } from "react"
import { useColourStyle } from "../../../hooks/utils/useColourStyle"
import { useUpdateResource } from "../../../hooks/restful/useUpdateResource"

// components
import Select from 'react-select'

// material
import MuiButton from "../../../components/material/buttons/MuiButton"
import MuiCancelButton from "../../../components/material/buttons/MuiCancelButton"

export default function CreateIncidentTask(props) {
    const { usersList } = props
    const { setCreateTask, incidentId } = props

    const [taskName, setTaskName] = useState("")
    const [taskDescription, setTaskDescription] = useState("")
    const [assignedUserId, setAssignedUserId] = useState(0)
    const { updateResource: post, httpError, isLoading } = useUpdateResource("POST")

    const handleCreateIncident = e => {
        e.preventDefault()
        let body = {
            taskName,
            taskDescription,
            incidentId,
            assignedUserId,
        }

        const { data } = post("tasks/createTask", body)
    }

    const colourStyles = useColourStyle()

    return (
        <div className="form-container">
            <form
                className="form"
                onSubmit={handleCreateIncident}>
                <h2>Create Task</h2>
                <input
                    required
                    type="text"
                    value={taskName}
                    placeholder="Task Name"
                    onChange={e => { setTaskName(e.target.value) }} />
                <input
                    required
                    type="text"
                    value={taskDescription}
                    placeholder="Task Description"
                    onChange={e => { setTaskDescription(e.target.value) }} />
                {usersList.length > 0 && <Select placeholder="Assigned User" options={usersList} onChange={(option) => { setAssignedUserId(option.value) }} styles={colourStyles} className="selector" />}
                <MuiCancelButton text="Cancel" handler={() => { setCreateTask(false) }} />
                <MuiButton text="Create" type="submit" />
            </form>
        </div>
    )
}
