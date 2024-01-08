import { useEffect, useState } from "react"
import "./Incident.css"
import { Link } from "react-router-dom"

export default function IncidentList(props) {
    const { incidents, httpError, isLoading } = props
    const [data, setData] = useState([])

    useEffect(() => { if (incidents) { setData(incidents) } }, [incidents])

    if (httpError) {
        return (
            <p className="error">{httpError}</p>
        )
    }

    if (isLoading) {
        return (
            <p className="loading">loading...</p>
        )
    }

    return (
        <div className="incident-list">
            {data.length === 0 && <p>No Incidents Yet!</p>}
            {data.length > 0 && data.map(incident => (
                <Link to={`/incidents/${incident.incidentId}`} key={incident.incidentId}>
                    <h4>{incident.incidentName}</h4>
                    <p>Created {(new Date(incident.incidentStartDate)).toDateString()}</p>
                </Link>
            ))}
        </div>
    )
}
