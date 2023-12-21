import "./Dashboard.css";
import { useTable } from "../../hooks/restful/useTable";
import IncidentList from "../incidents/IncidentList";
import { useState } from "react";
import IncidentFilter from "./IncidentFilter";

export default function Dashboard() {
    const [search, setSearch] = useState("incidents")
    const { tableData, tableHttpError, isTableLoading } = useTable(search)

    return (
        <div>
            <IncidentFilter setSearch={setSearch} />
            <IncidentList incidents={tableData.incidents} httpError={tableHttpError} isLoading={isTableLoading} />
        </div>
    );
}
