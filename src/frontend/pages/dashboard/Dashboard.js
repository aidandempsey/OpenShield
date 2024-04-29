import { useGet } from "../../hooks/restful/useGet";
import IncidentList from "../incidents/incidents/IncidentList";
import { useEffect, useState } from "react";
import SeverityFilter from "./SeverityFilter"

export default function Dashboard() {
    const { data: organizationId, httpError: organizationIdHttpError, isOrganizationIdLoading } = useGet("secure/organizations/getOrganizationIdFromUserId");
    const [search, setSearch] = useState(`incidents/search/findByOrganizationId?organizationId=${organizationId}`)
    const { data: incidents, httpError: incidentsHttpError, isLoading: isIncidentsLoading } = useGet(search)
    useEffect(() => { if (organizationId) { setSearch(`incidents/search/findByOrganizationId?organizationId=${organizationId}`) } }, [organizationId])

    return (
        <div>
            <SeverityFilter setSearch={setSearch} organizationId={organizationId} />
            <IncidentList incidents={incidents?._embedded?.incidents ?? []} httpError={incidentsHttpError || organizationIdHttpError} isLoading={isIncidentsLoading || isOrganizationIdLoading} />
        </div>
    );
}
