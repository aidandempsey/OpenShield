// styles & images
import "./Organization.css"

// utils
import formatDistanceToNow from "date-fns/formatDistanceToNow"

// hooks
import { useUpdateResource } from "../../hooks/restful/useUpdateResource"

// material
import MuiButton from "../../components/material/buttons/MuiButton"
import MuiDisabledButton from "../../components/material/buttons/MuiDisabledButton"
import MuiLoading from "../../components/material/loading/MuiLoading"

export default function OrganizationList(props) {
    const { organizations, httpError, isLoading, userRole, setCreateOrganization } = props
    const { updateResource: patchOrganization, httpError: patchOrganizationHttpError, isLoading: isPatchOrganizationLoading } = useUpdateResource("PATCH")

    const joinOrganization = (organizationId) => {
        patchOrganization(`users/changeOrganizationAndRole?organizationId=${organizationId}&userRole=${userRole}`);
    }

    if (httpError || patchOrganizationHttpError) return <p className="error">{httpError || patchOrganizationHttpError}</p>
    if (isLoading || isPatchOrganizationLoading) return <MuiLoading />

    return (
        <div className="organization-list">
            <MuiButton text="Create Organization" handler={() => { setCreateOrganization(true) }} />

            {organizations.length === 0 && <p>No Organizations Yet!</p>}
            {organizations.length > 0 && organizations.map(organization => (
                <div className="organization" key={organization.organizationId}>
                    <h4>{organization.organizationName}</h4>
                    <p>Created {formatDistanceToNow(organization.organizationCreationDate, { addSuffix: true })}</p>

                    {!userRole && <MuiDisabledButton text="Join" />}
                    {userRole && <MuiButton text="Join" handler={() => { joinOrganization(organization.organizationId) }} />}
                </div>
            ))}
        </div>
    );
}