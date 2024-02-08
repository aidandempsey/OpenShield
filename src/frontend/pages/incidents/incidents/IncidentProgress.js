import { useGet } from "../../../hooks/restful/useGet"

export default function IncidentProgress(props) {
    const { incidentId } = props
    const { data, httpError, isLoading } = useGet(`secure/incidents/getIncidentProgress?incidentId=${incidentId}`)

    if (httpError) return <div className="error">{httpError}</div>
    if (isLoading) return <div className="Loading">loading...</div>

    return (
        <div>{data}% complete</div>
    )
}
