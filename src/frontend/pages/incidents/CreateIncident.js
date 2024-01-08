import "./Incident.css"

import { useState } from "react"
import Select from 'react-select'
import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.module.css"
import { useEffect } from "react"

export default function CreateIncident() {
    const [incidentName, setIncidentName] = useState("")
    const [incidentDescription, setIncidentDescription] = useState("")
    const [teamId, setTeamId] = useState(0)
    const [incidentSeverity, setIncidentSeverity] = useState("")
    const [incidentStartDate, setIncidentStartDate] = useState(new Date())
    const [assignerUserId, setAssignerUserId] = useState(0)

    const handleCreateIncident = e => {
        e.preventDefault()
        console.log(e)
    }

    const colourStyles = {
        control: (styles) => ({
            ...styles,
            backgroundColor: "#f3f3f3",
            fontFamily: "Poppins",
        }),

        option: (styles, { isFocused }) => {
            return {
                ...styles,
                backgroundColor: isFocused ? '#343541' : "#ececf1",
                color: isFocused ? '#ececf1' : "#343541",
                fontFamily: "Poppins"
            }
        }
    }

    const teams = [
        { value: "Team 1", label: "Team 1" },
        { value: "Team 2", label: "Team 2" },
        { value: "Team 3", label: "Team 3" },
        { value: "Team 4", label: "Team 4" }
    ]

    const severities = [
        { value: "Low", label: "Low" },
        { value: "Medium", label: "Medium" },
        { value: "High", label: "High" },
        { value: "Critical", label: "Critical" }
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
        </div>
    )
}
