import { useGet } from "../../hooks/restful/useGet";

import IncidentList from "../incidents/incidents/IncidentList";
import { useState } from "react";
import IncidentFilter from "./IncidentFilter";

export default function Dashboard() {
    const [search, setSearch] = useState("incidents")
    const { data, httpError, isLoading } = useGet(search)

    return (
        <div>
            <IncidentFilter setSearch={setSearch} />
            <IncidentList incidents={data?._embedded?.incidents ?? []} httpError={httpError} isLoading={isLoading} />
        </div>
    );
}
