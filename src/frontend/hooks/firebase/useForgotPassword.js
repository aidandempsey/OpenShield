// hooks
import { useState, useEffect } from 'react'

// firebase
import { projectAuth } from "../../firebase/config"

export const useForgotPassword = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [forgotPasswordError, setForgotPasswordError] = useState(null)
    const [isForgotPasswordPending, setIsForgotPasswordPending] = useState(false)

    const forgotPassword = async (email) => {
        setForgotPasswordError(null)
        setIsForgotPasswordPending(true)

        try {
            await projectAuth.sendPasswordResetEmail(email)

            if (!isCancelled) {
                setIsForgotPasswordPending(false)
                setForgotPasswordError(null)
            }
        }
        catch (err) {
            setForgotPasswordError(err.message)
            if (!isCancelled) {
                setIsForgotPasswordPending(false)
            }
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { forgotPassword, isForgotPasswordPending, forgotPasswordError }
}