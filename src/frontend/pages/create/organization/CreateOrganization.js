import { useState } from "react"
import { usePost } from "../../../hooks/restful/usePost"
import { useAuthContext } from "../../../hooks/firebase/useAuthContext"

import "react-datepicker/dist/react-datepicker.module.css"

export default function CreateOrganization() {
    const [organizationName, setOrganizationName] = useState("")
    const [organizationDescription, setOrganizationDescription] = useState("")
    const { user } = useAuthContext()
    const { post, httpError, isLoading } = usePost()

    const handleCreateOrganization = e => {
        e.preventDefault()
        post("secure/organizations/createOrganization", { organizationName, organizationLeader: user.uid, organizationDescription })
        setOrganizationName("")
        setOrganizationDescription("")
    }

    return (
        <div className="form-container">
            <form
                className="form"
                onSubmit={handleCreateOrganization}>
                <h2>Create Organization</h2>
                <input
                    required
                    type="text"
                    value={organizationName}
                    placeholder="Organization Name"
                    onChange={e => { setOrganizationName(e.target.value) }} />
                <input
                    required
                    type="text"
                    value={organizationDescription}
                    placeholder="Organization Description"
                    onChange={e => { setOrganizationDescription(e.target.value) }} />
                <button className="btn">Create</button>
            </form>
            {httpError && <p className="error form-error">{httpError}</p>}
            {isLoading && <div className="Loading">loading...</div>}
        </div>
    )
}
