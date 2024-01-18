import "./Tasks.css"

import { useState } from "react"
import Select from 'react-select'
import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.module.css"
import { useColourStyle } from "../../../hooks/style/useColourStyle"

export default function CreateIncidentTask(props) {
    const { setCreateTask } = props

    const [taskId, setTaskId] = useState(0)
    const [taskName, setTaskName] = useState("")
    const [taskDescription, setTaskDescription] = useState("")
    const [incidentId, setIncidentId] = useState(0)
    const [taskStatus, setTaskStatus] = useState("")
    const [assignerUserId, setAssignerUserId] = useState(0)
    const [assignedUserId, setAssignedUserId] = useState(0)
    const [assignDate, setAssignDate] = useState(new Date())

    const handleCreateIncident = e => {
        e.preventDefault()
    }

    const colourStyles = useColourStyle()

    const statuses = [
        { value: "open", label: "Open" },
        { value: "closed", label: "Closed" },
        { value: "inProgress", label: "In Progress" }
    ]

    const users = [
        { value: "1", label: "1" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4", label: "4" }
    ]

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
                <Select placeholder="Select Task Status" options={statuses} onChange={(option) => { setTaskStatus(option.value) }} styles={colourStyles} className="selector" />
                <Select placeholder="Assigner User" options={users} onChange={(option) => { setAssignerUserId(option.value) }} styles={colourStyles} className="selector" />
                <Select placeholder="Assigned User" options={users} onChange={(option) => { setAssignedUserId(option.value) }} styles={colourStyles} className="selector" />
                <label>Task Start Date<ReactDatePicker selected={assignDate} onChange={e => { setAssignDate(e) }} /></label>
                <button className="btn" onClick={() => { setCreateTask(false) }}>Cancel</button>
                <button className="btn">Create</button>
            </form>
        </div>
    )
}
