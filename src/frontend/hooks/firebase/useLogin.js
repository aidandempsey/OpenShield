// hooks
import { useState, useEffect } from 'react'
import { useAuthContext } from './useAuthContext'

// firebase
import { projectAuth } from "../../firebase/config"

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [loginError, setLoginError] = useState(null)
  const [isLoginPending, setIsLoginPending] = useState(false)
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setLoginError(null)
    setIsLoginPending(true)

    try {
      // login
      const res = await projectAuth.signInWithEmailAndPassword(email, password)
      const token = await res.user.getIdToken();
      console.log(token)

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user })

      if (!isCancelled) {
        setIsLoginPending(false)
        setLoginError(null)
      }
    }
    catch (err) {
      setLoginError(err.message)
      setIsLoginPending(false)
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { login, isLoginPending, loginError }
}