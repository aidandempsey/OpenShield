// styles
import "./Dashboard.css"

import { useEffect, useState } from "react"

export default function Dashboard() {

    const [incidents, setIncidents] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [httpError, setHttpError] = useState(null)

    useEffect(() => {
        const fetchIncidents = async () => {
            const baseUrl = "http://localhost:8080/api/incidents"
            const url = `${baseUrl}?page=0&size=9`
            const response = await fetch(url)

            if (!response.ok) {
                throw new Error("Something went wrong")
            }

            const responseJson = await response.json()
            const responseData = responseJson._embedded.incidents

            const loadedIncidents = []

            for (const key in responseData) {
                loadedIncidents.push({
                    incidentId: responseData[key].incidentId,
                    incidentName: responseData[key].incidentName,
                    teamId: responseData[key].teamId,
                    severity: responseData[key].severity,
                    detectionDate: responseData[key].detectionDate,
                    closureDate: responseData[key].closureDate
                })
            }

            setIncidents(loadedIncidents)
            setIsLoading(false)
            console.log(incidents)
        }

        fetchIncidents().catch(error => {
            setIsLoading(false)
            setHttpError(error.message)
        })
    }, [])

    return (
        <div>
            {incidents.length > 0 &&
                incidents.map(incident => (
                    <div>
                        <h1>{incident.incidentName}</h1>
                        <p>incidentId: {incident.incidentId}</p>
                        <p>teamId: {incident.teamId}</p>
                        <p>severity: {incident.severity}</p>
                        <p>detectionDate: {incident.detectionDate}</p>
                        <p>closureDate: {incident.closureDate}</p>
                        <hr></hr>
                    </div>
                ))
            }
        </div>
    )
}
