import "./Organization.css"
import { Link } from "react-router-dom"
import formatDistanceToNow from "date-fns/formatDistanceToNow"

export default function OrganizationsList(props) {
    const { organizations, httpError, isLoading } = props

    if (httpError) return <p className="error">{httpError}</p>
    if (isLoading) return <p className="loading">loading...</p>

    return (
        <div className="organization-list">
            {organizations.length > 0 && (
                <>
                    <Link to="/createOrganization">
                        <h4>New Organization</h4>
                    </Link>
                    {organizations.map(organization => (
                        <Link to={`/organizations/${organization.organizationId}`} key={organization.organizationId}>
                            <h4>{organization.organizationName}</h4>
                            <p>{organization.organizationDescription}</p>
                            <p>Created {formatDistanceToNow(organization.organizationCreationDate, { addSuffix: true })}</p>
                        </Link>
                    ))}
                </>
            )}
        </div>
    );
}