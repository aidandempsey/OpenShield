import "./Dashboard.css";
import { useTable } from "../../hooks/restful/useTable";
import { useEffect, useState } from "react";
import IncidentList from "../incidents/IncidentList";

export default function Dashboard() {
    const { tableData, tableHttpError } = useTable("incidents")
    const [data, setData] = useState([])

    useEffect(() => {
        if (tableData) {
            setData(tableData.incidents)
        }
    }, [tableData])

    return (
        <div>
            <IncidentList incidents={data} />
        </div>
    );
}
