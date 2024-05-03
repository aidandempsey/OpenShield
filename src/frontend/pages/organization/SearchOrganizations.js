import { useEffect, useState } from "react"
import { useGet } from "../../hooks/restful/useGet"
import OrganizationList from "./OrganizationList"
import Select from 'react-select'
import { useColourStyle } from "../../hooks/style/useColourStyle"
import CreateOrganization from "./CreateOrganization"

export default function SearchOrganizations() {
    const [search, setSearch] = useState("")
    const [searchUrl, setSearchUrl] = useState()
    const [userRole, setUserRole] = useState()
    const [createOrganization, setCreateOrganization] = useState(false)

    const { data, httpError, isLoading } = useGet(searchUrl || "organizations")

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

    useEffect(() => {
        if (search === "") {
            setSearchUrl("")
        } else {
            setSearchUrl(`organizations/search/findByOrganizationNameContaining?organizationName=${search}`)
        }
    }, [search])

    return (
        <div className="search">
            <form onSubmit={e => { e.preventDefault() }}>
                <input type="search" value={search} placeholder="Search Organizations" onChange={e => { setSearch(e.target.value) }} autoFocus />
            </form>
            {data?._embedded?.organizations.length > 0 && (<Select placeholder="Select User Role" options={roles} onChange={(option) => { setUserRole(option.value) }} styles={colourStyles} className="selector" />)}
            {!createOrganization && <OrganizationList organizations={data?._embedded?.organizations ?? []} httpError={httpError} isLoading={isLoading} userRole={userRole} setCreateOrganization={setCreateOrganization} />}
            {createOrganization && <CreateOrganization setCreateOrganization={setCreateOrganization} />}

        </div>
    )
}
