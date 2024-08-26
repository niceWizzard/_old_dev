import axios from "axios"
import { useContext, useEffect } from "react"
import { useHistory } from "react-router"
import { SETUSERContext, USERContext } from "../../contexts"

export interface WithUserProps {
    fallback?: string
}

const WithUser: React.FC<WithUserProps> = ({ children, fallback = "/" }) => {

    const USER = useContext(USERContext)
    const setUSER = useContext(SETUSERContext)
    const history = useHistory()

    useEffect(() => {
        async function f() {
            if (!USER) {
                try {
                    const res = await axios({
                        method: "GET",
                        url: '/users/user',
                        withCredentials: true
                    })
                    if (res.data.type === 1) {
                        setUSER && setUSER(res.data.user)
                        history.push(fallback)
                    }
                } catch (err) {
                    console.log(err)
                }
            }
        }
        f()
    }, [setUSER, history, USER, fallback])

    return (
        <>
            {children}
        </>
    );
}

export default WithUser;