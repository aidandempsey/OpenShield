import "./Incident.css"
import { useParams } from "react-router-dom"
import { useGet } from "../../../hooks/restful/useGet"
import { useState } from "react"
import IncidentOverview from "./IncidentOverview"
import CommentList from "../comments/CommentsList"
import IncidentFilter from "./IncidentFilter"
import TaskList from "../tasks/TaskList"
import IncidentProgress from "./IncidentProgress"

export default function Incident() {
    const { id } = useParams()
    const { data, httpError, isLoading } = useGet(`incidents/${id}`)
    const [currentTab, setCurrentTab] = useState("overview")

    if (httpError) return <div className="error">{httpError}</div>
    if (isLoading) return <div className="loading">loading...</div>

    return (
        <div className="incident-details">
            <IncidentFilter currentTab={currentTab} setCurrentTab={setCurrentTab} />
            {currentTab === "overview" && (<IncidentOverview incident={data} />)}
            {currentTab === "tasks" && (<TaskList incidentId={id} />)}
            {currentTab === "progress" && (<IncidentProgress incidentId={id} />)}
            {currentTab === "comments" && (<CommentList incidentId={id} />)}

        </div>
    )
}
