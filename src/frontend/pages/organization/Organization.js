import { useGet } from "../../hooks/restful/useGet";

import IncidentList from "../incidents/incidents/IncidentList";
import { useState } from "react";
import IncidentFilter from "./IncidentFilter";
import { useParams } from "react-router-dom";

export default function Organization() {
    const { id } = useParams()
    const [search, setSearch] = useState(`incidents/search/findByOrganizationId?organizationId=${id}`)
    const { data, httpError, isLoading } = useGet(search)

    return (
        <div>
            <IncidentFilter setSearch={setSearch} organizationId={id} />
            <IncidentList incidents={data?._embedded?.incidents ?? []} httpError={httpError} isLoading={isLoading} />
        </div>
    );
}
