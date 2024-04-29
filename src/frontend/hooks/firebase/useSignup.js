import { useState, useEffect } from 'react'
import { projectAuth } from "../../firebase/config"
import { useAuthContext } from './useAuthContext'
import { useUpdateResource } from '../restful/useUpdateResource'

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [signupError, setSignupError] = useState(null)
  const [isSignupPending, setIsSignupPending] = useState(false)
  const { dispatch } = useAuthContext()
  const { updateResource: post, httpError, isLoading } = useUpdateResource("POST")

  useEffect(() => { if (isLoading) { setIsSignupPending(isLoading) } }, [isLoading])
  useEffect(() => { if (httpError) { setSignupError(httpError) } }, [httpError])

  const signup = async (emailAddress, password, displayName) => {
    setSignupError(null)
    setIsSignupPending(true)

    try {
      // signup
      const res = await projectAuth.createUserWithEmailAndPassword(emailAddress, password)

      await projectAuth.currentUser.sendEmailVerification()
      const token = await res.user.getIdToken();

      // update the database before the dispatch
      post("secure/users/createUser", { displayName, emailAddress }, token)

      if (!res) {
        throw new Error('Could not complete signup')
      }

      // add display name to user
      await res.user.updateProfile({ displayName })

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user })

      if (!isCancelled) {
        setSignupError(null)
      }
      setIsSignupPending(false)
    }
    catch (err) {
      setSignupError(err.message)
      setIsSignupPending(false)
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { signup, signupError, isSignupPending }
}