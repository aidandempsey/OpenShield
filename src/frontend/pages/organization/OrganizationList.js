import "./Organization.css"
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import { useUpdateResource } from "../../hooks/restful/useUpdateResource"

export default function OrganizationList(props) {
    const { organizations, httpError, isLoading, userRole, setCreateOrganization } = props
    const { updateResource: patchOrganization, httpError: patchOrganizationHttpError, isLoading: isPatchOrganizationLoading } = useUpdateResource("PATCH")

    const joinOrganization = (organizationId) => {
        patchOrganization(`secure/users/changeOrganizationAndRole?organizationId=${organizationId}&userRole=${userRole}`);
    }

    if (httpError || patchOrganizationHttpError) return <p className="error">{httpError || patchOrganizationHttpError}</p>
    if (isLoading || isPatchOrganizationLoading) return <p className="loading">loading...</p>

    return (
        <div className="organization-list">
            <button className="btn" onClick={() => { setCreateOrganization(true) }}>Create Organization</button>
            {organizations.length === 0 && <p>No Organizations Yet!</p>}
            {organizations.length > 0 && organizations.map(organization => (
                <div className="organization" key={organization.organizationId}>
                    <h4>{organization.organizationName}</h4>
                    <p>Created {formatDistanceToNow(organization.organizationCreationDate, { addSuffix: true })}</p>

                    {!userRole && <button className="disabled-btn" type="button" disabled>Join</button>}
                    {userRole && <button className="btn" onClick={() => { joinOrganization(organization.organizationId) }}>Join</button>}
                </div>
            ))}
        </div>
    );
}