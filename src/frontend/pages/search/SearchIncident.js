export default function SearchIncident(props) {

    const { incident, id } = props
    return (
        <div>
            <p>{incident.incidentName} {id}</p>
        </div>
    )
}
