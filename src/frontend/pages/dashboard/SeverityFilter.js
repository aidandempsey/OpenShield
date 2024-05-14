import { useState } from "react"

export default function IncidentFilter(props) {
    const filterList = ["All", "Low", "Medium", "High", "Critical"]
    const { setSearch, currentFilter, setCurrentFilter } = props

    const handleClick = filter => {
        const lowerFilter = filter.toLowerCase()
        setCurrentFilter(lowerFilter)
        let query = "incidents/findIncidentsByUser"
        if (lowerFilter !== "all") {
            query = `incidents/findIncidentsByUserAndSeverity?incidentSeverity=${lowerFilter}`
        }
        setSearch(query)
    }

    return (
        <div className="incident-filter">
            <nav>
                <ul>
                    {filterList.map(filter => (
                        <button
                            key={filter}
                            onClick={() => { handleClick(filter) }}
                            className={currentFilter === filter.toLowerCase() ? "active" : ""}>
                            {filter}
                        </button>
                    ))}
                </ul>
            </nav>
        </div>
    )
}