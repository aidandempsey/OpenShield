import { useColourStyle } from "../../../../hooks/utils/useColourStyle"
import Select from 'react-select'

export default function SshBruteforce(props) {
    const { portNumber, setPortNumber, ipAddress, setIpAddress, compromisedUsername, setCompromisedUsername, compromisedPassword, setCompromisedPassword, setDevice, opensshVersions, setSshVersion, devices } = props
    const colourStyles = useColourStyle()

    return (
        <>
            <br />
            <label>Port Number<input
                required
                type="number"
                value={portNumber}
                placeholder="Port Number"
                onChange={e => { setPortNumber(e.target.value) }} /></label>
            <input
                required
                type="text"
                value={ipAddress}
                placeholder="IP Address Number"
                onChange={e => { setIpAddress(e.target.value) }} />
            <input
                required
                type="text"
                value={compromisedUsername}
                placeholder="Compromised Username"
                onChange={e => { setCompromisedUsername(e.target.value) }} />
            <input
                required
                type="text"
                value={compromisedPassword}
                placeholder="Compromised Password"
                onChange={e => { setCompromisedPassword(e.target.value) }} />

            <Select placeholder="Select OpenSSH Version" options={opensshVersions} onChange={(option) => { setSshVersion(option.value) }} styles={colourStyles} className="selector" />
            <Select placeholder="Select Device" options={devices} onChange={(option) => { setDevice(option.value) }} styles={colourStyles} className="selector" />
        </>
    )
}
