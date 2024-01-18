import { useEffect, useState } from "react"
import { useAuthToken } from "../firebase/useAuthToken"


export const useValue = endpoint => {
    const [value, setValue] = useState()
    const [valueHttpError, setValueHttpError] = useState(null)
    const [isValueLoading, setIsValueLoading] = useState(true)
    const { authToken } = useAuthToken()

    useEffect(() => {
        const getName = async () => {
            if (authToken) {
                setIsValueLoading(true)
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

                    setValue(responseText);
                } catch (error) {
                    console.log(error)
                    setValueHttpError(error.message);
                }
                setIsValueLoading(false)
            }
        };

        getName()

    }, [endpoint, authToken])

    return { value, valueHttpError, isValueLoading }
}