import { useState } from "react"
import { usePost } from "../../../hooks/restful/usePost"
import { useColourStyle } from "../../../hooks/style/useColourStyle"

import Select from 'react-select'
import "react-datepicker/dist/react-datepicker.module.css"

export default function CreateTask() {
    const [incidentName, setIncidentName] = useState("")
    const [incidentDescription, setIncidentDescription] = useState("")
    const [incidentSeverity, setIncidentSeverity] = useState("low")
    const { post, httpError, isLoading } = usePost()
    const colourStyles = useColourStyle()

    const handleCreateIncident = e => {
        e.preventDefault()
        let body = {
            incidentName,
            incidentDescription,
            incidentSeverity,
        }

        const { data } = post("secure/incidents/createIncident", body)
    }

    const severities = [
        { value: "low", label: "Low" },
        { value: "medium", label: "Medium" },
        { value: "high", label: "High" },
        { value: "critical", label: "Critical" }
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
                <Select placeholder="Select Incident Severity" options={severities} onChange={(option) => { setIncidentSeverity(option.value) }} styles={colourStyles} className="selector" />
                <button className="btn">Create</button>
            </form>
            {(httpError) && <div className="error">{httpError}</div>}
            {(isLoading) && <div className="Loading">loading...</div>}
        </div>
    )
}
