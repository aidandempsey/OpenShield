import { useState } from "react"
import { usePost } from "../../../hooks/restful/usePost"
import { useColourStyle } from "../../../hooks/style/useColourStyle"

import Select from 'react-select'
import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.module.css"

export default function CreateTask() {
    const [incidentName, setIncidentName] = useState("")
    const [incidentDescription, setIncidentDescription] = useState("")
    const [teamId, setTeamId] = useState(0)
    const [incidentSeverity, setIncidentSeverity] = useState("low")
    const [incidentStartDate, setIncidentStartDate] = useState(new Date())
    const [assignerUserId, setAssignerUserId] = useState(0)
    const { post, httpError, isLoading } = usePost()
    const colourStyles = useColourStyle()

    const handleCreateIncident = e => {
        e.preventDefault()
        let body = {
            incidentName,
            incidentDescription,
            organizationId: 1,
            incidentSeverity,
            incidentStartDate,
            assignerUserId: "LYt1ohqu4Ef4TNypIykYNkDUeDR2"
        }

        const { data } = post("secure/incidents/createIncident", body)
    }

    const teams = [
        { value: "Team 1", label: "Team 1" },
        { value: "Team 2", label: "Team 2" },
        { value: "Team 3", label: "Team 3" },
        { value: "Team 4", label: "Team 4" }
    ]

    const severities = [
        { value: "low", label: "Low" },
        { value: "medium", label: "Medium" },
        { value: "high", label: "High" },
        { value: "critical", label: "Critical" }
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
                <h2>Create Incident</h2>
                <input
                    required
                    type="text"
                    value={incidentName}
                    placeholder="Incident Name"
                    onChange={e => { setIncidentName(e.target.value) }} />
                <input
                    required
                    type="text"
                    value={incidentDescription}
                    placeholder="Incident Description"
                    onChange={e => { setIncidentDescription(e.target.value) }} />
                <Select placeholder="Select Team" options={teams} onChange={(option) => { setTeamId(option.value) }} styles={colourStyles} className="selector" />
                <Select placeholder="Select Incident Severity" options={severities} onChange={(option) => { setIncidentSeverity(option.value) }} styles={colourStyles} className="selector" />
                <Select placeholder="Assign User" options={users} onChange={(option) => { setAssignerUserId(option.value) }} styles={colourStyles} className="selector" />
                <label>Incident Start Date<ReactDatePicker selected={incidentStartDate} onChange={e => { setIncidentStartDate(e) }} /></label>
                <button className="btn">Create</button>
            </form>
            {(httpError) && <div className="error">{httpError}</div>}
            {isLoading && <div className="Loading">loading...</div>}
        </div>
    )
}
