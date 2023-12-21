import React, { useEffect } from 'react'
import Alert from '@mui/material/Alert';
import "./Incident.css"

export default function IncidentSummary(props) {
    const { incident } = props

    const convertSeverity = severity => {
        const severityMapping = {
            "low": "success",
            "medium": "info",
            "high": "warning",
            "critical": "error"
        };

        return severityMapping[severity]
    }
    return (
        <div>
            <div className='incident-summary'>
                <h2 className='page-title'>{incident.incidentName}</h2>
                <p className='start-date'>Started {(new Date(incident.incidentStartDate).toDateString())}</p>
                <p className='details'>{incident.incidentDescription}</p>
                <p className='details'>Assigned to {incident.teamId}</p>
                <Alert severity={convertSeverity(incident.incidentSeverity)}>{incident.incidentSeverity}</Alert>
            </div>
        </div>
    )
}
