import { useValue } from "../../../hooks/restful/useValue"

export default function IncidentProgress(props) {
    const { incidentId } = props
    const { value, valueHttpError, isValueLoading } = useValue(`secure/incidents/getIncidentProgress?incidentId=${incidentId}`)

    if (valueHttpError) return <div className="error">{valueHttpError}</div>
    if (isValueLoading) return <div className="Loading">loading...</div>

    return (
        <div>{value}% complete</div>
    )
}
