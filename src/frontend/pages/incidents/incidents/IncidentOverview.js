import Alert from '@mui/material/Alert';
import "./Incident.css"
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useGet } from '../../../hooks/restful/useGet';

export default function IncidentSummary(props) {
    const { incident } = props
    const { data: organizationName, httpError: organizationNameHttpError, isOrganizationNameLoading } = useGet(`secure/organizations/getOrganizationNameFromOrganizationId?organizationId=${incident.organizationId}`)
    const { data: incidentCreatedBy, httpError: incidentCreatedByHttpError, isIncidentCreatedByLoading } = useGet(`secure/users/getDisplayNameFromUserId?userId=${incident.createdBy}`)


    const convertSeverity = severity => ({
        "low": "success",
        "medium": "info",
        "high": "warning",
        "critical": "error"
    }[severity])

    if (organizationNameHttpError || incidentCreatedByHttpError) return <div className="error">{organizationNameHttpError || incidentCreatedByHttpError}</div>
    if (isOrganizationNameLoading || isIncidentCreatedByLoading) return <div className="Loading">loading...</div>

    return (
        <div>
            <div className='incident-summary'>
                <h2 className='page-title'>{incident.incidentName}</h2>

                <p className='start-date'>Started {formatDistanceToNow(incident.incidentStartDate, { addSuffix: true })} by {incidentCreatedBy} ({organizationName})</p>
                <p className='details'>{incident.incidentDescription}</p>
                <Alert severity={convertSeverity(incident.incidentSeverity)}>{incident.incidentSeverity}</Alert>
            </div>
        </div>
    )
}
