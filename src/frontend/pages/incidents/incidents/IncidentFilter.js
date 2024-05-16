// material
import MuiFilterButton from "../../../components/material/buttons/filterButtons/MuiFilterButton";
import MuiActiveFilterButton from "../../../components/material/buttons/filterButtons/MuiActiveFilterButton";
import ButtonGroup from '@mui/material/ButtonGroup';

export default function IncidentFilter(props) {
    const filterList = ["Overview", "Tasks", "Progress", "Comments"]
    const { currentTab, setCurrentTab } = props

    const handleClick = filter => {
        setCurrentTab(filter.toLowerCase())
    }

    return (
        <div className="incident-filter">
            <nav>
                <ButtonGroup color='inherit' variant="text" aria-label="Basic button group">

                    {filterList.map(filter => (
                        currentTab !== filter.toLowerCase() ? (
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
