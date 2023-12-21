import { useEffect, useState } from "react"
import "./Search.css"
import SearchIncident from "./SearchIncident"
import { useTable } from "../../hooks/restful/useTable"
import IncidentList from "../incidents/IncidentList"

export default function Search() {
    const [search, setSearch] = useState("")
    const [searchUrl, setSearchUrl] = useState("")
    const [data, setData] = useState([])

    const { tableData, tableHttpError, isTableLoading } = useTable(searchUrl)//, query)

    const handleSearch = e => {
        e.preventDefault()
        if (search === "") {
            setSearchUrl("")
        } else {
            setSearchUrl(`incidents/search/findByIncidentNameContaining?incidentName=${search}`)
        }
    }

    useEffect(() => {
        if (tableData) {
            setData(tableData.incidents || [])
        }

    }, [tableData])

    if (isTableLoading) {
        return (
            <p>loading...</p>
        )
    }

    return (
        <div className="search">
            <form onSubmit={e => { handleSearch(e) }}>
                <input type="search" value={search} placeholder="Search Incidents" onChange={e => { setSearch(e.target.value) }} />
            </form>
            <IncidentList incidents={data} httpError={tableHttpError} isLoading={isTableLoading} />
        </div>
    )
}
