// hooks
import { useGet } from "../../../hooks/restful/useGet"

// material
import CircularProgressWithLabel from '@mui/material/CircularProgress';
import MuiLoading from "../../../components/material/loading/MuiLoading"

export default function IncidentProgress(props) {
    const { incidentId } = props
    const { data, httpError, isLoading } = useGet(`incidents/getIncidentProgress?incidentId=${incidentId}`)

    if (httpError) return <div className="error">{httpError}</div>
    if (isLoading) return <MuiLoading />

    return (
        <div>
            <div className="percentage">{data}%</div>
            <CircularProgressWithLabel variant="determinate" value={data} color="success" size={300} />

        </div>
    )
}
