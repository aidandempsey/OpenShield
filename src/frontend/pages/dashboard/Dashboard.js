import { useGet } from "../../hooks/restful/useGet";
import IncidentList from "../incidents/incidents/IncidentList";
import { useState } from "react";
import SeverityFilter from "./SeverityFilter"

export default function Dashboard() {
    const [search, setSearch] = useState(`secure/incidents/findIncidentsByUser`)
    const { data: incidents, httpError: incidentsHttpError, isLoading: isIncidentsLoading } = useGet(search)

    if (incidentsHttpError) return <div className="error">{incidentsHttpError}</div>
    if (isIncidentsLoading) return <div className="loading">loading...</div>

    return (
        <div>
            <SeverityFilter setSearch={setSearch} />
            <IncidentList incidents={incidents ?? []} />
        </div>
    );
}
