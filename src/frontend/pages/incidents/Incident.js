import "./Incident.css"
import { useParams } from "react-router-dom"
import { useRow } from "../../hooks/restful/useRow"
import { useEffect, useState } from "react"
import IncidentSummary from "./IncidentSummary"
import IncidentComment from "./IncidentComment"
import IncidentFilter from "./IncidentFilter"
import IncidentTasks from "./IncidentTasks"
import IncidentProgress from "./IncidentProgress"

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
            {currentTab === "tasks" && (<IncidentTasks incidentId={id} />)}
            {currentTab === "progress" && (<IncidentProgress incident={incident} />)}
            {currentTab === "comments" && (<IncidentComment incidentId={id} />)}
        </div>
    )
}
