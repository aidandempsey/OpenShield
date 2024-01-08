import { useState } from "react"
import Select from 'react-select'
import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.module.css"
import { useEffect } from "react"

export default function CreateOrganization() {
    const [organizationName, setOrganizationName] = useState("")
    const [organizationDescription, setOrganizationDescription] = useState("")
    const [teamLeaderId, setTeamLeaderId] = useState(0)

    const handleCreateOrganization = e => {
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
                onSubmit={handleCreateOrganization}>
                <h2>Create Organization</h2>
                <input
                    required
                    type="text"
                    value={organizationName}
                    placeholder="Organization Name"
                    onChange={e => { setOrganizationName(e.target.value) }} />
                <input
                    required
                    type="text"
                    value={organizationDescription}
                    placeholder="Organization Description"
                    onChange={e => { setOrganizationDescription(e.target.value) }} />
                <button className="btn">Create</button>
            </form>
        </div>
    )
}
