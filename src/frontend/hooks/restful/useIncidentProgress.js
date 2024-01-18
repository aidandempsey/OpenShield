import { useEffect, useState } from "react"
import { useAuthToken } from "../firebase/useAuthToken"


export const useIncidentProgress = id => {
    const [progress, setProgress] = useState()
    const [progressHttpError, setProgressHttpError] = useState(null)
    const [isProgressLoading, setIsProgressLoading] = useState(true)
    const { authToken } = useAuthToken()

    useEffect(() => {
        const getName = async () => {
            if (authToken) {
                setIsProgressLoading(true)
                try {
                    const apiUrl = `http://localhost:8080/api/${endpoint}`;
                    const response = await fetch(apiUrl, {
                        method: "GET",
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `bearer ${authToken}`,
                        },

                        body: null
                    });

                    const responseText = await response.text();

                    setProgress(responseText);
                } catch (error) {
                    console.log(error)
                    setProgressHttpError(error.message);
                }
                setIsProgressLoading(false)
            }
        };

        getName()

    }, [endpoint, authToken])

    return { progress, progressHttpError, isProgressLoading }
}