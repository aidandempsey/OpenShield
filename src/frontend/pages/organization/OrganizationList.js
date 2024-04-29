import "./Organization.css"
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import { useUpdateResource } from "../../hooks/restful/useUpdateResource"
import { useColourStyle } from "../../hooks/style/useColourStyle"
import { useState } from "react"
import Select from 'react-select'

export default function OrganizationList(props) {
    const { organizations, httpError, isLoading } = props
    const { updateResource: patchOrganization, httpError: patchOrganizationHttpError, isLoading: isPatchOrganizationLoading } = useUpdateResource("PATCH")
    const [userRole, setUserRole] = useState()
    const colourStyles = useColourStyle()

    const roles = [
        { value: "securityAnalyst", label: "Security Analyst" },
        { value: "securityEngineer", label: "security Engineer" },
        { value: "socManager", label: "SOC Manager" },
        { value: "threatIntelligenceAnalyst", label: "Threat Intelligence Analyst" },
        { value: "securityArchitect", label: "Security Architect" },
        { value: "automationEngineer", label: "Automation Engineer " },
        { value: "complianceAnalyst", label: "Compliance Analyst" },
        { value: "userAndAccessManagementSpecialist", label: "User And Access Management Specialist" },
        { value: "trainingAndAwarenessSpecialist", label: "Training And Awareness Specialist" },
        { value: "dataPrivacyOfficer", label: "Data Privacy Officer" },
        { value: "vendorManagementSpecialist", label: "Vendor Management Specialist" },
        { value: "qualityAssuranceTester", label: "Quality Assurance Tester" },
        { value: "projectManager", label: "Project Manager" },
        { value: "communicationsSpecialist", label: "Communications Specialist" }
    ]

    const joinOrganization = (organizationId) => {
        const { data } = patchOrganization(`secure/users/changeOrganizationAndRole?organizationId=${organizationId}&userRole=${userRole}`);
    }

    if (httpError || patchOrganizationHttpError) return <p className="error">{httpError || patchOrganizationHttpError}</p>
    if (isLoading || isPatchOrganizationLoading) return <p className="loading">loading...</p>

    return (
        <div className="organization-list">
            <Select placeholder="Select User Role" options={roles} onChange={(option) => { setUserRole(option.value) }} styles={colourStyles} className="selector" />

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