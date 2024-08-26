import axios from "axios"
import { useContext, useEffect } from "react"
import { useHistory } from "react-router"
import { SETUSERContext, USERContext } from "../../contexts"

export interface UserAthProps {
    fallback?: string
}

const UserAuth: React.FC<UserAthProps> = ({ children, fallback = "/login" }) => {
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
                    }
                    if (res.data.type !== 1) {
                        history.push(fallback)
                        console.log("THERE IS NO USER!")
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
            { children}
        </>
    );
}

export default UserAuth;