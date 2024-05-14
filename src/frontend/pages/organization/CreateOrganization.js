import "./Organization.css"

import { useState } from "react"
import { useUpdateResource } from "../../hooks/restful/useUpdateResource"

export default function CreateOrganization(props) {
    const { setCreateOrganization } = props

    const [organizationName, setOrgnaizationName] = useState("")
    const [organizationDescription, setOrganizationDescription] = useState("")
    const { updateResource: post, httpError, isLoading } = useUpdateResource("POST")

    const handleCreateOrganization = e => {
        e.preventDefault()
        let body = {
            organizationName,
            organizationDescription
        }

        post("organizations/createOrganization", body)
        setCreateOrganization(false)
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
                    onChange={e => { setOrgnaizationName(e.target.value) }} />
                <input
                    required
                    type="text"
                    value={organizationDescription}
                    placeholder="Organization Description"
                    onChange={e => { setOrganizationDescription(e.target.value) }} />
                <button className="btn" onClick={() => { setCreateOrganization(false) }}>Cancel</button>
                <button className="btn">Create</button>
            </form>
        </div>
    )
}
