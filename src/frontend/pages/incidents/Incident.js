import "./Incident.css"
import { useParams } from "react-router-dom"
import { useRow } from "../../hooks/restful/useRow"
import { useEffect, useState } from "react"
import IncidentSummary from "./IncidentSummary"
import IncidentComment from "./IncidentComment"
import IncidentFilter from "./IncidentFilter"

export default function Incident() {
    const { id } = useParams()
    const { rowData, rowHttpError } = useRow("incidents", id)
    const [currentTab, setCurrentTab] = useState("overview")
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
            <IncidentFilter currentTab={currentTab} setCurrentTab={setCurrentTab} />
            {currentTab === "overview" && (<IncidentSummary incident={incident} />)}
            {currentTab === "comments" && (<IncidentComment incidentId={id} />)}
        </div>
    )
}
