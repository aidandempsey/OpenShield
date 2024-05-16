// hooks
import { useEffect, useState } from "react"
import { useGet } from "../../hooks/restful/useGet"
import { useColourStyle } from "../../hooks/utils/useColourStyle"
import { useRoles } from "../../hooks/utils/useRoles"

// components
import OrganizationList from "./OrganizationList"
import Select from 'react-select'
import CreateOrganization from "./CreateOrganization"

export default function SearchOrganizations() {
    const [search, setSearch] = useState("")
    const [searchUrl, setSearchUrl] = useState()
    const [userRole, setUserRole] = useState()
    const [createOrganization, setCreateOrganization] = useState(false)

    const { data, httpError, isLoading } = useGet(searchUrl || "organizations")

    const colourStyles = useColourStyle()

    const roles = useRoles()

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
