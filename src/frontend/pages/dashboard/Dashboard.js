// hooks
import { useGet } from "../../hooks/restful/useGet";
import { useState } from "react";

// components
import IncidentList from "../incidents/incidents/IncidentList";
import SeverityFilter from "./SeverityFilter"

// material
import MuiLoading from "../../components/material/loading/MuiLoading"

export default function Dashboard() {
    const [currentFilter, setCurrentFilter] = useState("all")
    const [search, setSearch] = useState(`incidents/findIncidentsByUser`)
    const { data: incidents, httpError: incidentsHttpError, isLoading: isIncidentsLoading } = useGet(search)
    if (incidentsHttpError) return <div className="error">{incidentsHttpError}</div>
    if (isIncidentsLoading) return <MuiLoading />

    return (
        <div>
            <SeverityFilter setSearch={setSearch} currentFilter={currentFilter} setCurrentFilter={setCurrentFilter} />
            <IncidentList incidents={incidents ?? []} />
        </div>
    );
}
