import { Link } from "react-router-dom"
import { useAuthContext } from "../../../hooks/useAuthContext"
import { useLogout } from "../../../hooks/useLogout"

// styles & images
import "./Navbar.css"
import Shield from "../../images/shield.svg"

export default function Navbar() {
    const { user } = useAuthContext()
    const { logout } = useLogout()

    return (
        <div className="navbar">
            <ul>

                <li className="logo"><Link to="/"><img className="grow" src={Shield} alt="logo" /><span className="shield">OpenShield</span></Link></li>

                {!user ? (
                    <>
                        <li><Link to="/login">Login</Link></li>
                    </>
                ) :
                    <li className="logout"><Link to="#" onClick={() => { logout() }}>Logout</Link></li>
                }
            </ul>
        </div>
    )
}
