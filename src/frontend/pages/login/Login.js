// styles & images
import "./Login.css"
import { useState } from "react"
import { useLogin } from "../../hooks/firebase/useLogin"
import { useSignup } from "../../hooks/firebase/useSignup"
import { useForgotPassword } from "../../hooks/firebase/useForgotPassword"

export default function LoginModal() {
    const [emailAddress, setEmailAddress] = useState("")
    const [password, setPassword] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [signingUp, setSigningUp] = useState(false)
    const [isForgotPassword, setIsForgotPassword] = useState(false)
    const [forgotPasswordMessage, setForgotPasswordMessage] = useState(null)

    const { signup, signupError, isSignupPending } = useSignup()
    const { login, loginError, isLoginPending } = useLogin()
    const { forgotPassword, isForgotPasswordPending, forgotPasswordError } = useForgotPassword()

    const handleLogin = e => {
        e.preventDefault()
        login(emailAddress, password)
        setEmailAddress("")
        setPassword("")
    }

    const handleSignup = e => {
        e.preventDefault()
        signup(emailAddress, password, displayName)
        setEmailAddress("")
        setPassword("")
        setDisplayName("")
    }

    const handleForgotPassword = e => {
        e.preventDefault()
        forgotPassword(emailAddress)
        setForgotPasswordMessage(`Password reset link has been emailed to ${emailAddress}`)
    }

    return (
        <div className="form-container">
            {signingUp && !isForgotPassword && (
                <form className="form" onSubmit={handleSignup}>
                    <h2>Sign up</h2>
                    <input required type="emailAddress" value={emailAddress} placeholder="Email" onChange={e => { setEmailAddress(e.target.value) }} />
                    <input required type="password" value={password} placeholder="Password" onChange={e => { setPassword(e.target.value) }} />
                    <input required type="text" value={displayName} placeholder="Name" onChange={e => { setDisplayName(e.target.value) }} />

                    {!isSignupPending && <button className="btn login-btn">Sign up</button>}
                    {isSignupPending && <button className="btn login-btn" disabled>Signing up...</button>}
                </form>
            )}

            {!signingUp && !isForgotPassword && (
                <form className="form" onSubmit={handleLogin}>
                    <h2>Login</h2>
                    <input required type="emailAddress" value={emailAddress} placeholder="Email" onChange={e => { setEmailAddress(e.target.value) }} />
                    <input required type="password" value={password} placeholder="Password" onChange={e => { setPassword(e.target.value) }} />
                    {!isLoginPending && <button className="btn login-btn">Login</button>}
                    {!isLoginPending && <p className="forgot-password" onClick={() => {
                        setIsForgotPassword(true)
                        setSigningUp(true)
                    }}>Forgot Password?</p>}
                    {isLoginPending && <button className="btn login-btn" disabled>Logging in...</button>}
                </form>)}

            {isForgotPassword && (
                <form className="form" onSubmit={handleForgotPassword}>
                    <h2 className="forgot-password">Forgot Password</h2>
                    <input required type="emailAddress" value={emailAddress} placeholder="Email" onChange={e => { setEmailAddress(e.target.value) }} />
                    {!isForgotPasswordPending && <button className="btn login-btn">Submit</button>}
                    {isForgotPasswordPending && <button className="btn login-btn" disabled>Submitting...</button>}
                </form>
            )}

            {loginError && <p className="error form-error">{loginError}</p>}
            {signupError && <p className="error form-error">{signupError}</p>}
            {forgotPasswordError && <p className="error form-error">{forgotPasswordError}</p>}
            {forgotPasswordMessage && isForgotPassword && <p className="success form-error">{forgotPasswordMessage}</p>}

            {!signingUp && !isForgotPassword && <div className="options"> <p>Don't have an account?</p><button onClick={() => setSigningUp(true)} className="btn">Signup</button></div>}
            {signingUp && <div className="options"> <p>Already have an account?</p><button onClick={() => {
                setSigningUp(false)
                setIsForgotPassword(false)
                setForgotPasswordMessage(null)
            }
            } className="btn">Login</button></div>}
        </div>
    )
}