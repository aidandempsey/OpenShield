// material
import MuiFilterButton from "../../components/material/buttons/filterButtons/MuiFilterButton"
import MuiActiveFilterButton from "../../components/material/buttons/filterButtons/MuiActiveFilterButton";
import ButtonGroup from '@mui/material/ButtonGroup';

export default function SeverityFilter(props) {
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
                <ButtonGroup color='inherit' variant="text" aria-label="Basic button group">

                    {filterList.map(filter => (
                        currentFilter !== filter.toLowerCase() ? (
                            <MuiFilterButton
                                key={filter}
                                handler={() => { handleClick(filter) }}
                                text={filter}
                            />
                        ) : (
                            <MuiActiveFilterButton
                                key={filter}
                                handler={() => { handleClick(filter) }}
                                text={filter}
                            />
                        )
                    ))}
                </ButtonGroup>

            </nav>
        </div>
    )
}
