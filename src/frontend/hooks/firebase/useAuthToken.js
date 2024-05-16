// hooks
import { useEffect, useState } from "react"
import { useAuthContext } from "./useAuthContext"

export const useAuthToken = () => {
    const [authToken, setAuthToken] = useState(null)
    const [authTokenHttpError, setAuthTokenHttpError] = useState(null)

    const { user } = useAuthContext()

    useEffect(() => {
        if (user) {
            user.getIdToken().then(idToken => {
                setAuthToken(idToken)
            }).catch(error => {
                setAuthTokenHttpError(error)
            });
        }
    }, [user])

    return { authToken, authTokenHttpError }
}