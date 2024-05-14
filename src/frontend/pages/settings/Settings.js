import { useEffect, useState } from "react"
import { useGet } from "../../hooks/restful/useGet"
import "./Settings.css"
import { useColourStyle } from "../../hooks/utils/useColourStyle"
import Select from 'react-select'
import { useRoles } from "../../hooks/utils/useRoles"
import { useUpdateResource } from "../../hooks/restful/useUpdateResource"
import { useDeleteAccount } from "../../hooks/firebase/useDeleteAccount"

export default function Settings() {
    const { data: user, httpError: userHttpError, isLoading: isUserLoading } = useGet("users/getUserByUser")
    const { data: organizations, httpError: organizationHttpError, isLoading: isOrganizationsLoading } = useGet("organizations")
    const { updateResource: patchUser, httpError: patchUserHttpError, isLoading: isPatchUserLoading } = useUpdateResource("PATCH")
    const { deleteAccount, deleteAccountError, isDeleteAccountPending } = useDeleteAccount()

    const [displayName, setDisplayName] = useState("")
    const [organizationId, setOrganizationId] = useState("")
    const [userRole, setUserRole] = useState("")

    const [organizationNames, setOrganizationNames] = useState("");
    const colourStyles = useColourStyle()
    const roles = useRoles()

    const handleUpdateUser = e => {
        e.preventDefault()
        const { data } = patchUser(`users/updateUser?displayName=${displayName}&organizationId=${organizationId}&userRole=${userRole}`);
    }

    useEffect(() => {
        if (user) {
            setDisplayName(user.displayName)
            setUserRole(user.userRole)
            setOrganizationId(user.organizationId)
        }
    }, [user])

    useEffect(() => {
        if (organizations) {
            setOrganizationNames(organizations._embedded.organizations.map(obj => ({
                value: obj.organizationId,
                label: obj.organizationName
            })))
        }

    }, [organizations])

    if (userHttpError || organizationHttpError || patchUserHttpError || deleteAccountError) return <div className="error">{userHttpError || organizationHttpError || patchUserHttpError || deleteAccountError}</div>
    if (isUserLoading || isOrganizationsLoading || isPatchUserLoading || isDeleteAccountPending) return <div className="loading">loading...</div>

    return (
        <div className="settings">
            <div className="form-container">
                <form
                    className="form"
                    onSubmit={handleUpdateUser}>
                    <h2>Update Profile</h2>
                    <input
                        required
                        type="text"
                        value={displayName}
                        placeholder="Display Name"
                        onChange={e => { setDisplayName(e.target.value) }} />
                    <Select placeholder="Role" options={roles} onChange={(option) => { setUserRole(option.value) }} styles={colourStyles} className="selector" defaultValue={roles.find(userRole => userRole.value === user.userRole)} />
                    {organizationNames && <Select placeholder="Organization" options={organizationNames} onChange={(option) => { setOrganizationId(option.value) }} styles={colourStyles} className="selector" defaultValue={organizationNames.find(org => org.value === user.organizationId)} />}
                    <button className="btn">Update Profile</button>
                </form>
                <button className="inverted-btn" onClick={() => { deleteAccount() }}>Delete Account</button>

            </div>
        </div>
    )
}
