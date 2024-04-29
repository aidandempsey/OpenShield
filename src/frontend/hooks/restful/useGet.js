import { useEffect, useState } from "react"
import { useAuthToken } from "../firebase/useAuthToken"

export const useGet = endpoint => {
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
                            'Authorization': `Bearer ${authToken}`,
                        },

                        body: null
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
        };


        if (!endpoint.endsWith("undefined")) {
            get()
        }
    }, [endpoint, authToken])

    return { data, httpError, isLoading }
}