import { Link } from "react-router-dom"
import { useAuthContext } from "../../hooks/firebase/useAuthContext"
import { useLogout } from "../../hooks/firebase/useLogout"

// styles & images
import "./Navbar.css"
import Shield from "../../images/shield.svg"
import Search from "../../images/search.svg"

export default function Navbar() {
    const { user } = useAuthContext()
    const { logout } = useLogout()

    return (
        <div className="navbar">
            <ul>

                <li className="logo"><Link to="/"><img className="grow" src={Shield} alt="logo" /><span className="shield">OpenShield</span></Link></li>

                {user && <>
                    <li className="search"><Link to="/search"><img className="grow" src={Search} /></Link></li>
                    <div className="dropdown">
                        <button className="btn">Create</button>
                        <div className="dropdown-content">
                            <Link to="/createIncident">Incident</Link>
                            <Link to="/createDevice">Device</Link>
                        </div>
                    </div>
                    <li><Link to="#" onClick={() => { logout() }}>Logout</Link></li>
                </>
                }
            </ul>
        </div>
    )
}
