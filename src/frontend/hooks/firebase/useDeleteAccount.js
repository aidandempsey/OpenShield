// hooks
import { useState, useEffect } from 'react'
import { useUpdateResource } from '../restful/useUpdateResource'

// firebase
import { projectAuth } from "../../firebase/config"

export const useDeleteAccount = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [deleteAccountError, setDeleteAccountError] = useState(null)
    const [isDeleteAccountPending, setIsDeleteAccountPending] = useState(false)
    const { updateResource: deleteUser, httpError: deleteUserHttpError, isLoading: isdeleteUserLoading } = useUpdateResource("DELETE")

    useEffect(() => { if (isdeleteUserLoading) { setIsDeleteAccountPending(isdeleteUserLoading) } }, [isdeleteUserLoading])
    useEffect(() => { if (deleteUserHttpError) { setDeleteAccountError(deleteUserHttpError) } }, [deleteUserHttpError])

    const deleteAccount = async () => {
        setDeleteAccountError(null)
        setIsDeleteAccountPending(true)

        try {
            // delete user
            await projectAuth.currentUser.delete()

            // update the database before the dispatch
            await deleteUser(`users/deleteUser`);

            if (!isCancelled) {
                setDeleteAccountError(null)
            }
            setIsDeleteAccountPending(false)
        }
        catch (err) {
            setDeleteAccountError(err.message)
            setIsDeleteAccountPending(false)
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { deleteAccount, deleteAccountError, isDeleteAccountPending }
}