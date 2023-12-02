export default function IncidentSummary(props) {
    const { incident } = props
    return (
        <div>
            <div className="incident-summary">
                <h2 className="page-title">{incident.incidentName}</h2>
                <p className="due-date">Incident Started: {new Date(incident.incidentStartDate).toDateString()}</p>
                <p className="due-date">Incident detected: {new Date(incident.detectionDate).toDateString()}</p>
                <p className="due-date">Incident closed: {new Date(incident.closureDate).toDateString()}</p>
                <p className="details">{incident.incidentDescription}</p>
                <p>{incident.teamId}</p>
                <p>{incident.severity}</p>
                <p>{incident.incidentStartDate}</p>

                <p>{incident.assignerUserId}</p>
            </div>
        </div>
    )
}
