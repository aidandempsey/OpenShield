import { useGet } from "../../../hooks/restful/useGet"
import CircularProgressWithLabel from '@mui/material/CircularProgress';


export default function IncidentProgress(props) {
    const { incidentId } = props
    const { data, httpError, isLoading } = useGet(`incidents/getIncidentProgress?incidentId=${incidentId}`)

    if (httpError) return <div className="error">{httpError}</div>
    if (isLoading) return <div className="loading">loading...</div>

    return (
        <div>
            <div className="percentage">{data}%</div>
            <CircularProgressWithLabel variant="determinate" value={data} color="success" size={300} />

        </div>
    )
}
