import "./Tasks.css"

import { useState } from "react"
import Select from 'react-select'
import { useColourStyle } from "../../../hooks/utils/useColourStyle"
import { useUpdateResource } from "../../../hooks/restful/useUpdateResource"

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
                <button className="btn" onClick={() => { setCreateTask(false) }}>Cancel</button>
                <button className="btn">Create</button>
            </form>
        </div>
    )
}
