import "./IncidentList.css"
import { Link } from "react-router-dom"

export default function IncidentList(props) {
    const { incidents } = props

    return (
        <div className="incident-list">
            {(incidents || []).length == 0 && <p>No Incidents Yet!</p>}
            {(incidents || []).map(incident => (
                <Link to={`/incidents/${incident.incidentId}`} key={incident.incidentId}>
                    <h4>{incident.incidentName}</h4>
                    <p>Created {(new Date(incident.incidentStartDate)).toDateString()}</p>
                </Link>
            ))}
        </div>
    )
}
