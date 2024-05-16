// styles & images
import "./Organization.css"

// hooks
import { useState } from "react"
import { useUpdateResource } from "../../hooks/restful/useUpdateResource"
import MuiButton from "../../components/material/buttons/MuiButton"

// material
import MuiCancelButton from "../../components/material/buttons/MuiCancelButton"

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
                <MuiCancelButton text="Cancel" handler={() => { setCreateOrganization(false) }} />
                <MuiButton text="Create" type="submit" />
            </form>
        </div>
    )
}
