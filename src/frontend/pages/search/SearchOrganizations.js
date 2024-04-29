import { useEffect, useState } from "react"
import "./Search.css"
import { useGet } from "../../hooks/restful/useGet"
import OrganizationList from "../organization/OrganizationList"

export default function SearchOrganizations() {
    const [search, setSearch] = useState("")
    const [searchUrl, setSearchUrl] = useState("organizations")

    const { data, httpError, isLoading } = useGet(searchUrl)

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
            <OrganizationList organizations={data?._embedded?.organizations ?? []} httpError={httpError} isLoading={isLoading} />
        </div>
    )
}
