import { useState } from "react"
import { useAuthToken } from "../firebase/useAuthToken"

export const useUpdateResource = (method) => {
    const [data, setData] = useState()
    const [httpError, setHttpError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { authToken: defaultAuthToken } = useAuthToken()

    const updateResource = async (endpoint, body = null, authorization = null) => {
        const authToken = authorization || defaultAuthToken;

        if (authToken) {
            setIsLoading(true)
            try {
                const apiUrl = `http://localhost:8080/api/${endpoint}`;
                const response = await fetch(apiUrl, {
                    method: method,

                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`,
                    },
                    body: JSON.stringify(body)

                });

                const responseContent =
                    ["application/hal+json", "application/json"]
                        .includes(response.headers.get("content-type"))
                        ? await response.json()
                        : await response.text()
                setData(responseContent);
            } catch (error) {
                setHttpError(error.message);
            }
            setIsLoading(false)
        }
        return { data }
    };

    return { updateResource, httpError, isLoading }
}