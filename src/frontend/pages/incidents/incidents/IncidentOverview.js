// material
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import MuiLoading from "../../../components/material/loading/MuiLoading"

// styles & images
import "./Incident.css"

// utisl
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

// hooks
import { useGet } from '../../../hooks/restful/useGet';

export default function IncidentSummary(props) {
    const { incident } = props
    const { data: organizationName, httpError: organizationNameHttpError, isOrganizationNameLoading } = useGet(`organizations/getOrganizationNameFromOrganizationId?organizationId=${incident.organizationId}`)
    const { data: incidentCreatedBy, httpError: incidentCreatedByHttpError, isIncidentCreatedByLoading } = useGet(`users/getDisplayNameFromUserId?userId=${incident.createdBy}`)

    const convertSeverity = severity => ({
        "low": "success",
        "medium": "info",
        "high": "warning",
        "critical": "error"
    }[severity])

    if (organizationNameHttpError || incidentCreatedByHttpError) return <div className="error">{organizationNameHttpError || incidentCreatedByHttpError}</div>
    if (isOrganizationNameLoading || isIncidentCreatedByLoading) return <MuiLoading />

    return (
        <div>
            <div className='incident-summary'>
                <h2 className='page-title'>{incident.incidentName}</h2>

                <p className='start-date'>Started {formatDistanceToNow(incident.incidentStartDate, { addSuffix: true })} by {incidentCreatedBy} ({organizationName})</p>
                {incident.incidentDescription.split("\n").map((line, lineIndex) => (
                    <p className='details' key={lineIndex}>
                        {lineIndex === 0 ? line : line.split(":").map((part, i) => (
                            <span className={i === 0 ? "properties" : ""} key={i}>
                                {part}{i === 0 && ":"}
                            </span>
                        ))}
                    </p>
                ))}
                <Alert severity={convertSeverity(incident.incidentSeverity)}>
                    <AlertTitle>{incident.incidentSeverity.charAt(0).toUpperCase() + incident.incidentSeverity.slice(1)}</AlertTitle>
                    This incident has been marked with a severity of {incident.incidentSeverity}
                </Alert>
            </div>
        </div>
    )
}
