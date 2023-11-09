import { Redirect } from "react-router-dom"
import { useOktaAuth } from "@okta/okta-react"

export default function LoginWidget() {
    const { oktaAuth, authState } = useOktaAuth()
    const onSuccess = tokens => {
        oktaAuth.handleLoginRedirect(tokens)
    }

    const onError = err => {
        console.log(err)
    }

    if (!authState) {
        return (
            <p>Loading</p>
        )
    }

    return (
        <div>LoginWidget</div>
    )
}
