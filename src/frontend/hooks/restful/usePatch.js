import { useState } from "react"
import { useAuthToken } from "../firebase/useAuthToken"


export const usePatch = () => {
    const [data, setData] = useState()
    const [httpError, setHttpError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { authToken: defaultAuthToken } = useAuthToken()

    const patch = async (endpoint, authorization = null) => {
        const authToken = authorization || defaultAuthToken;

        if (authToken) {
            setIsLoading(true)
            console.log(authToken)
            try {
                const apiUrl = `http://localhost:8080/api/${endpoint}`;
                const response = await fetch(apiUrl, {
                    method: "PUT",

                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`,
                    },
                    body: JSON.stringify(null)

                });

                // const responseJson = await response.json();
                // setData(responseJson);
            } catch (error) {
                setHttpError(error.message);
            }
            setIsLoading(false)
        }
        return { data }
    };

    return { patch, httpError, isLoading }
}