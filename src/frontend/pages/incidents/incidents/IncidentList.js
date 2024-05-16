// styles & images
import "./Incident.css"

// components
import { Link } from "react-router-dom"

// utils
import formatDistanceToNow from "date-fns/formatDistanceToNow"

// material
import MuiLoading from "../../../components/material/loading/MuiLoading"

export default function IncidentList(props) {
    const { incidents, httpError, isLoading } = props

    if (httpError) return <p className="error">{httpError}</p>
    if (isLoading) return <MuiLoading />

    return (
        <div className="incident-list">
            {incidents.length === 0 && <p>No Incidents Yet!</p>}
            {incidents.length > 0 && incidents.map(incident => (
                <Link to={`/incidents/${incident.incidentId}`} key={incident.incidentId}>
                    <h4>{incident.incidentName}</h4>
                    <p>Created {formatDistanceToNow(incident.incidentStartDate, { addSuffix: true })}</p>
                </Link>
            ))}
        </div>
    );
}