export default function IncidentFilter(props) {
    const filterList = ["Overview", "Tasks", "Progress", "Comments"]
    const { currentTab, setCurrentTab } = props

    const handleClick = filter => {
        setCurrentTab(filter.toLowerCase())
    }

    return (
        <div className="incident-filter">
            <nav>
                <ul>
                    {filterList.map(filter => (
                        <button
                            key={filter}
                            onClick={() => { handleClick(filter) }}
                            className={currentTab === filter.toLowerCase() ? "active" : ""}>
                            {filter}
                        </button>
                    ))}
                </ul>
            </nav>
        </div>
    )
}
