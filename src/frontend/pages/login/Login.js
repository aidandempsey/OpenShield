// styles & images
import "./Login.css"
import { useState } from "react"
import { useLogin } from "../../../hooks/useLogin"
import { useSignup } from "../../../hooks/useSignup"
import { useForgotPassword } from "../../../hooks/useForgotPassword"
import Select from 'react-select'

export default function LoginModal() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [userRole, setUserRole] = useState("")
    const [userTeam, setUserTeam] = useState("")
    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const [signingUp, setSigningUp] = useState(false)
    const [isForgotPassword, setIsForgotPassword] = useState(false)
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState("")
    const [forgotPasswordMessage, setForgotPasswordMessage] = useState(null)
    const { signup, signupError, isSignupPending } = useSignup()
    const { login, loginError, isLoginPending } = useLogin()
    const { forgotPassword, isForgotPasswordPending, forgotPasswordError } = useForgotPassword()

    const handleLogin = e => {
        e.preventDefault()
        login(loginEmail, loginPassword)
        setLoginEmail("")
        setLoginPassword("")
    }

    const handleSignup = e => {
        e.preventDefault()
        signup(email, password, displayName)
        setEmail("")
        setPassword("")
        setDisplayName("")
    }

    const handleForgotPassword = e => {
        e.preventDefault()
        forgotPassword(forgotPasswordEmail)
        setForgotPasswordMessage(`Password reset link has been emailed to ${forgotPasswordEmail}`)
    }

    const colourStyles = {
        control: (styles) => ({
            ...styles,
            backgroundColor: "#f3f3f3",
            fontFamily: "Poppins",
        }),

        option: (styles, { isFocused }) => {
            return {
                ...styles,
                backgroundColor: isFocused ? '#343541' : "#ececf1",
                color: isFocused ? '#ececf1' : "#343541",
                fontFamily: "Poppins"
            }
        }
    }

    const teams = [
        { value: "Team 1", label: "Team 1" },
        { value: "Team 2", label: "Team 2" },
        { value: "Team 3", label: "Team 3" },
        { value: "Team 4", label: "Team 4" }
    ]

    const roles = [
        { value: "securityAnalyst", label: "Security Analyst" },
        { value: "securityEngineer", label: "Security Engineer" },
        { value: "socManager", label: "Soc Manager" },
        { value: "threatIntelligenceAnalyst", label: "Threat Intelligence Analyst" },
        { value: "securityArchitect", label: "Security Architect" },
        { value: "Automation Engineer", label: "Automation Engineer" },
        { value: "complianceAnalyst", label: "Compliance Analyst" },
        { value: "userAndAccessManagementSpecialist", label: "User And Access Management Specialist" },
        { value: "trainingAndAwarenessSpecialist", label: "Training And Awareness Specialist" },
        { value: "dataPrivacyOfficer", label: "Data Privacy Officer" },
        { value: "vendorManagementSpecialist", label: "Vendor Management Specialist" },
        { value: "qualityAssuranceTester", label: "Quality Assurance Tester" },
        { value: "projectManager", label: "Project Manager" },
        { value: "communicationsSpecialist", label: "Communications Specialist" }
    ]

    return (
        <div className="modal-backdrop">
            <div className="modal">
                {signingUp && !isForgotPassword && (
                    <form
                        className="auth-form"
                        onSubmit={handleSignup}>
                        <h2>Sign up</h2>
                        <input
                            required
                            type="email"
                            value={email}
                            placeholder="Email"
                            onChange={e => { setEmail(e.target.value) }} />
                        <input
                            required
                            type="password"
                            value={password}
                            placeholder="Password"
                            onChange={e => { setPassword(e.target.value) }} />
                        <input
                            required
                            type="text"
                            value={displayName}
                            placeholder="First Name"
                            onChange={e => { setDisplayName(e.target.value) }} />
                        <Select placeholder="Select Team" options={teams} onChange={(option) => { setUserTeam(option.value) }} styles={colourStyles} className="theme-selector" />
                        <Select placeholder="Select Role" options={roles} onChange={(option) => { setUserRole(option.value) }} styles={colourStyles} className="theme-selector" />

                        {!isSignupPending && <button className="btn login-btn">Sign up</button>}
                        {isSignupPending && <button className="btn login-btn" disabled>Signing up...</button>}
                    </form>
                )}

                {!signingUp && !isForgotPassword && (
                    <form className="auth-form"
                        onSubmit={handleLogin}>
                        <h2>Login</h2>
                        <input
                            required
                            type="email"
                            value={loginEmail}
                            placeholder="Email"
                            onChange={e => { setLoginEmail(e.target.value) }} />
                        <input
                            required
                            type="password"
                            value={loginPassword}
                            placeholder="Password"
                            onChange={e => { setLoginPassword(e.target.value) }} />
                        {!isLoginPending && <button className="btn login-btn">Login</button>}
                        {!isLoginPending && <p className="forgot-password" onClick={() => {
                            setIsForgotPassword(true)
                            setSigningUp(true)
                        }}>Forgot Password?</p>}
                        {isLoginPending && <button className="btn login-btn" disabled>Logging in...</button>}
                    </form>)}
                {isForgotPassword && (
                    <form className="auth-form"
                        onSubmit={handleForgotPassword}>
                        <h2 className="forgot-password">Forgot Password</h2>
                        <input
                            required
                            type="email"
                            value={forgotPasswordEmail}
                            placeholder="Email"
                            onChange={e => { setForgotPasswordEmail(e.target.value) }} />
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
        </div>
    )
}