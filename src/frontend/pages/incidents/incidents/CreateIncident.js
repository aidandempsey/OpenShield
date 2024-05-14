import { useState } from "react"
import { useUpdateResource } from "../../../hooks/restful/useUpdateResource"
import { useColourStyle } from "../../../hooks/utils/useColourStyle"
import { useSeverities } from "../../../hooks/utils/useSeverities"

import Select from 'react-select'
import SshBruteforce from "./templates/SshBruteforce"

export default function CreateTask() {
    const [incidentName, setIncidentName] = useState("")
    const [incidentDescription, setIncidentDescription] = useState("")
    const [incidentSeverity, setIncidentSeverity] = useState("low")
    const [template, setTemplate] = useState(null)
    const [usingTemplate, setUsingTemplate] = useState(false)
    const { updateResource: post, httpError, isLoading } = useUpdateResource("POST")
    const colourStyles = useColourStyle()
    const severities = useSeverities()

    // SSH Bruteforce
    const [portNumber, setPortNumber] = useState(22)
    const [ipAddress, setIpAddress] = useState("")
    const [compromisedUsername, setCompromisedUsername] = useState("")
    const [compromisedPassword, setCompromisedPassword] = useState("")
    const [device, setDevice] = useState("")
    const [sshVersion, setSshVersion] = useState("")

    const handleCreateIncident = e => {
        e.preventDefault()
        let body = {
            incidentName,
            incidentDescription,
            incidentSeverity,
        }

        post("incidents/createIncident", body)
    }

    const handleCreateIncidentFromTemplate = e => {
        e.preventDefault()
        let body = {
            portNumber,
            ipAddress,
            compromisedUsername,
            compromisedPassword,
            device,
            sshVersion
        }

        setIpAddress("")
        setCompromisedUsername("")
        setCompromisedPassword("")
        setDevice("")
        setSshVersion("")

        post(`incidents/createIncidentFromTemplate?template=${template}`, body)
    }

    const templates = [
        { value: "sshBruteForce", label: "SSH Brute Force" },
        { value: "phishing", label: "Phishing" },
        { value: "ddos", label: "DDOS" },
    ]

    const devices = [
        { value: "Raspberry Pi 1 Model B", label: "Raspberry Pi 1 Model B" },
        { value: "Raspberry Pi 1 Model B+", label: "Raspberry Pi 1 Model B+" },
        { value: "Raspberry Pi 2 Model B", label: "Raspberry Pi 2 Model B" },
        { value: "Raspberry Pi 2 Model B v1.2", label: "Raspberry Pi 2 Model B v1.2" },
        { value: "Raspberry Pi 3 Model B", label: "Raspberry Pi 3 Model B" },
        { value: "Raspberry Pi 3 Model B+", label: "Raspberry Pi 3 Model B+" },
        { value: "Raspberry Pi 4 Model B", label: "Raspberry Pi 4 Model B" },
        { value: "Raspberry Pi 5 Model B", label: "Raspberry Pi 5 Model B" }
    ];

    const opensshVersions = [
        { value: "OpenSSH 1.0", label: "OpenSSH 1.0" },
        { value: "OpenSSH 2.0", label: "OpenSSH 2.0" },
        { value: "OpenSSH 3.0", label: "OpenSSH 3.0" },
        { value: "OpenSSH 4.0", label: "OpenSSH 4.0" },
        { value: "OpenSSH 5.0", label: "OpenSSH 5.0" },
        { value: "OpenSSH 6.0", label: "OpenSSH 6.0" },
        { value: "OpenSSH 7.0", label: "OpenSSH 7.0" },
        { value: "OpenSSH 8.0", label: "OpenSSH 8.0" },
        { value: "OpenSSH 9.0", label: "OpenSSH 9.0" }
    ];

    return (
        <div className="form-container">
            {!usingTemplate && (
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
                    <p className="forgot-password" onClick={() => {
                        setUsingTemplate(true)
                    }}>Use Template</p>
                </form>

            )}

            {(httpError) && <div className="error">{httpError}</div>}
            {(isLoading) && <div className="loading">loading...</div>}
            {usingTemplate && (<form
                className="form"
                onSubmit={handleCreateIncidentFromTemplate}>
                <h2>Create From Template</h2>
                <Select placeholder="Select Template" options={templates} onChange={(option) => { setTemplate(option.value) }} styles={colourStyles} className="selector" />

                {template === "sshBruteForce" && <SshBruteforce
                    portNumber={portNumber} setPortNumber={setPortNumber} ipAddress={ipAddress} setIpAddress={setIpAddress}
                    compromisedUsername={compromisedUsername} setCompromisedUsername={setCompromisedUsername}
                    compromisedPassword={compromisedPassword} setCompromisedPassword={setCompromisedPassword}
                    setDevice={setDevice} opensshVersions={opensshVersions} setSshVersion={setSshVersion} devices={devices}
                />}

                {template && <button className="btn">Create</button>}
                {!template && <button className="disabled-btn" disabled>Create</button>}

                <p className="forgot-password" onClick={() => {
                    setUsingTemplate(false)
                }}>Create Manually</p>
            </form>)}
        </div>
    )
}
