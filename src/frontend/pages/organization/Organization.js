import "./Organization.css"
import { useParams } from "react-router-dom";
import { useState } from "react";

export default function Organization() {
    const { id } = useParams();

    const [teams, setTeams] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [httpError, setHttpError] = useState(null)
    return (
        <div>Organization</div>
    )
}
