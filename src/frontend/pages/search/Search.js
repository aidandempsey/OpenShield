import { useEffect, useState } from "react"
import "./Search.css"
import IncidentList from "../incidents/incidents/IncidentList"
import { useGet } from "../../hooks/restful/useGet"

export default function Search() {
    const [search, setSearch] = useState("")
    const [searchUrl, setSearchUrl] = useState("")

    const { data, httpError, isLoading } = useGet(searchUrl)

    useEffect(() => {
        if (search === "") {
            setSearchUrl("")
        } else {
            setSearchUrl(`incidents/search/findByIncidentNameContaining?incidentName=${search}`)
        }
    }, [search])



    return (
        <div className="search">
            <form onSubmit={e => { e.preventDefault() }}>
                <input type="search" value={search} placeholder="Search Incidents" onChange={e => { setSearch(e.target.value) }} autoFocus />
            </form>
            <IncidentList incidents={data?._embedded?.incidents ?? []} httpError={httpError} isLoading={isLoading} />
        </div>
    )
}
