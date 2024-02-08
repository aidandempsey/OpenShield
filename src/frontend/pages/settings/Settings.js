import { useState } from "react"
import "react-datepicker/dist/react-datepicker.module.css"
import "./Settings.css"

export default function Settings() {
    const [teamName, setTeamName] = useState("")
    const [teamDescription, setTeamDescription] = useState("")

    const handleCreateOrganization = e => {
        e.preventDefault()
    }

    return (
        <div className="settings">
            <div className="form-container">
                <form
                    className="form"
                    onSubmit={handleCreateOrganization}>
                    <h2>Update Profile</h2>
                    <input
                        required
                        type="text"
                        value={teamName}
                        placeholder="Team Name"
                        onChange={e => { setTeamName(e.target.value) }} />
                    <input
                        required
                        type="text"
                        value={teamDescription}
                        placeholder="Team Description"
                        onChange={e => { setTeamDescription(e.target.value) }} />
                    <button className="btn">Create</button>
                </form>
            </div>
        </div>
    )
}
