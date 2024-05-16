// material
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';

export default function CircularIndeterminate() {
    return (
        <>
            <div className="loading"><CircularProgress color="inherit" />loading...</div>
            <Skeleton variant="rectangular" width={1000} height={250} />
        </>
    );
}