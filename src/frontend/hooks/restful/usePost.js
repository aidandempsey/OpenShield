import { useEffect, useState } from "react"
import { useAuthToken } from "../firebase/useAuthToken"


export const usePost = () => {
    const [data, setData] = useState()
    const [httpError, setHttpError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { authToken } = useAuthToken()

    const post = async (endpoint, body) => {
        if (authToken) {
            setIsLoading(true)
            try {
                const apiUrl = `http://localhost:8080/api/${endpoint}`;
                const response = await fetch(apiUrl, {
                    method: "POST",

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
        return { data }
    };

    return { post, httpError, isLoading }
}