import { useEffect, useState } from "react"
import { useAuthToken } from "../firebase/useAuthToken"


export const useGet = (endpoint, body) => {
    const [data, setData] = useState()
    const [httpError, setHttpError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const { authToken } = useAuthToken()

    useEffect(() => {
        const get = async () => {
            if (authToken) {
                setIsLoading(true)
                try {
                    const apiUrl = `http://localhost:8080/api/${endpoint}`;

                    const response = await fetch(apiUrl, {
                        method: "GET",

                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `bearer ${authToken}`,
                        },
                        body: JSON.stringify(body)
                    });

                    const responseJson = await response.json();
                    setData(responseJson);
                } catch (error) {
                    setHttpError(error.message);
                }
                setIsLoading(false)
            }
        };

        get()

    }, [endpoint, body, authToken])

    return { data, httpError, isLoading }
}