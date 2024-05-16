// react
import { Link } from "react-router-dom"

// hooks
import { useAuthContext } from "../../hooks/firebase/useAuthContext"
import { useLogout } from "../../hooks/firebase/useLogout"

// styles & images
import "./Navbar.css"
import Shield from "../../images/shield.svg"
import Search from "../../images/search.svg"
import Settings from "../../images/settings.svg"
import MuiButton from "../material/buttons/MuiButton"

export default function Navbar(props) {
    const { userHasOrganization } = props
    const { user } = useAuthContext()
    const { logout } = useLogout()

    return (
        <div className="navbar">
            <ul>
                <li className="logo"><Link to="/"><img className="grow" src={Shield} alt="logo" /><span className="shield">OpenShield</span></Link></li>
                {(user) &&
                    <>
                        {userHasOrganization && (
                            <>
                                <li className="search"><Link to="/searchIncidents"><img alt="Search Icon" className="grow" src={Search} /></Link></li>
                                <div className="dropdown">
                                    <MuiButton text="Create" />
                                    <div className="dropdown-content">
                                        <Link to="/createIncident">Incident</Link>
                                    </div>
                                </div>
                                <li className="settings"><Link to="/settings"><img className="grow" src={Settings} alt="logo" /></Link></li>
                            </>
                        )
                        }

                        <li><Link to="#" onClick={() => { logout() }}>Logout</Link></li>
                    </>
                }
            </ul>
        </div >
    )
}