// styles & images
import "./Navbar.css"
import Shield from "../../images/shield.svg"

export default function Navbar() {
    return (
        <div className="navbar">
            <ul>
                <li className="logo">
                    <img src={Shield} alt="logo" />
                    <span>OpenShield</span>
                </li>
            </ul>
        </div>
    )
}
