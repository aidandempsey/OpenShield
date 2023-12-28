import "./Incident.css"
import { useParams } from "react-router-dom"
import { useRow } from "../../hooks/restful/useRow"
import { useEffect, useState } from "react"
import IncidentSummary from "./IncidentSummary"
import IncidentComment from "./IncidentComment"

export default function Incident() {
    const { id } = useParams()
    const { rowData, rowHttpError } = useRow("incidents", id)
    const [incident, setIncident] = useState({})

    useEffect(() => {
        if (rowData) {
            setIncident(rowData)
        }
    }, [rowData])

    if (rowHttpError) {
        return <div className="error">{rowHttpError}</div>
    }
    if (!incident) {
        return <div className="Loading">loading...</div>
    }

    return (
        <div className="incident-details">
            <IncidentSummary incident={incident} />
            <IncidentComment incidentId={id} />
        </div>
    )
}
