import Alert from '@mui/material/Alert';
import "./Incident.css"
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export default function IncidentSummary(props) {
    const { incident } = props

    const convertSeverity = severity => ({
        "low": "success",
        "medium": "info",
        "high": "warning",
        "critical": "error"
    }[severity])

    return (
        <div>
            <div className='incident-summary'>
                <h2 className='page-title'>{incident.incidentName}</h2>

                <p className='start-date'>Started {formatDistanceToNow(incident.incidentStartDate, { addSuffix: true })}</p>
                <p className='details'>{incident.incidentDescription}</p>
                <Alert severity={convertSeverity(incident.incidentSeverity)}>{incident.incidentSeverity}</Alert>
            </div>
        </div>
    )
}
