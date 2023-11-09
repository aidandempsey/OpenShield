import { Link } from "react-router-dom"
import { useOktaAuth } from "@okta/okta-react"

// styles & images
import "./Navbar.css"
import Shield from "../../images/shield.svg"

export default function Navbar() {

    const { oktaAuth, authState } = useOktaAuth()

    const handleLogout = async () => oktaAuth.signOut()

    if (!authState) {
        return (
            <p>loading</p>
        )
    }

    return (
        <div className="navbar">
            <ul>

                <li className="logo"><Link to="/"><img className="grow" src={Shield} alt="logo" /><span className="shield">OpenShield</span></Link></li>


                {!authState.isAuthenticated ? (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Sign up</Link></li>
                    </>
                ) : <li><Link to="#" onClick={() => { handleLogout() }}>Logout</Link></li>

                }
            </ul>
        </div>
    )
}
