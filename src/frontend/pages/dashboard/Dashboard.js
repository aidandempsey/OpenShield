import { useGet } from "../../hooks/restful/useGet";
import OrganizationsList from "../organization/OrganizationsList";

export default function Dashboard() {

    const { data: organizations, httpError: organizationsHttpError, isLoading: isOrganizationsLoading } = useGet("organizations")

    return (
        <div>
            <h3>Organizations</h3>
            <OrganizationsList organizations={organizations?._embedded?.organizations ?? []} httpError={organizationsHttpError} isLoading={isOrganizationsLoading} />
        </div>
    );
}
