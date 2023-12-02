import "./Incident.css"
import IncidentSummary from "./components/IncidentSummary";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
export default function Incident() {
    const { id } = useParams();

    const [incident, setIncident] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [httpError, setHttpError] = useState(null)

    useEffect(() => {
        const fetchIncident = async () => {
            const baseUrl = `http://localhost:8080/api/incidents/${id}`
            const url = `${baseUrl}?page=0&size=9`
            const response = await fetch(url)

            if (!response.ok) {
                throw new Error("Something went wrong")
            }

            const responseJson = await response.json()
            const responseData = responseJson

            const loadedIncident = {
                incidentId: responseData.incidentId,
                incidentName: responseData.incidentName,
                incidentDescription: responseData.incidentDescription,
                teamId: responseData.teamId,
                severity: responseData.severity,
                incidentStartDate: responseData.incidentStartDate,
                detectionDate: responseData.detectionDate,
                closureDate: responseData.closureDate,
                assignerUserId: responseData.assignerUserId
            }

            setIncident(loadedIncident)
            setIsLoading(false)
        }

        fetchIncident().catch(error => {
            setIsLoading(false)
            setHttpError(error.message)
        })
    }, [])

    if (incident === null) {
        return <p>Loading...</p>
    }

    return (
        <div className="incident-details">
            <IncidentSummary incident={incident} />
        </div>
    )
}
