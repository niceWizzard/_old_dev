import React, { useState } from "react";
import axios, { Method } from 'axios';

export interface LogInProps {

}
interface RegisterUser {
    email: string | null,
    password: string | null,
    username: string | null
}

interface LogInInfo {
    email: string | null,
    password: string | null
}

interface UserObject {
    email: string | null,
    username: string | null,
    [key: string]: any
}

interface Hey {
    url: string | undefined,
    method: Method | undefined
}

const LogIn: React.FunctionComponent<LogInProps> = (props) => {


    const [regEmail, setRegEmail] = useState<string | null>(null)
    const [regPassword, setRegPassword] = useState<string | null>(null)

    const [logEmail, setLogEmail] = useState<string | null>(null)
    const [logPassword, setLogPassword] = useState<string | null>(null)

    const [user, setUser] = useState<UserObject | null>(null);
    const [message, setMessage] = useState<string | null>(null)

    const axiosFetch = async (param: Hey) => {
        const { url, method } = param;
        try {
            const res = await axios({
                method,
                url,
                withCredentials: true
            })
            return res.data
        } catch (err) {
            console.log(err)
        }

    }

    const getUser = async () => {
        console.log("GETTING USER!")
        setUser(await axiosFetch({ url: 'http://localhost:4000/users/get', method: "GET" }))
    }

    const createUser = async (obj: RegisterUser) => {
        console.log(JSON.stringify(obj))
        try {
            const res = await axios({
                method: "POST",
                url: "http://localhost:4000/users/register",
                data: obj
            })
            console.log(res)
        } catch (err) {
            console.log(err)
        }
    }

    const logInUser = async (info: LogInInfo) => {
        try {
            const res = await axios(
                {
                    method: "POST",
                    url: "http://localhost:4000/users/login",
                    data: info,
                    withCredentials: true
                }
            )
            console.log(res.data)
            if (res.data.isSuccessful) {
                console.log('GETTING RES2')
                const res2 = await axios({
                    method: "GET",
                    url: "http://localhost:4000/users/get",
                    withCredentials: true
                })
                console.log("RES2DATA", res2.data)
                setUser(res2.data)
            }


        } catch (err) {
            console.log(err)
        }

    }

    const handleRegSubmit = (e: React.SyntheticEvent<EventTarget>) => {
        e.preventDefault();
        const obj = {
            email: regEmail, password: regPassword, username: Date.now().toString()
        }
        createUser(obj)

    }

    const handleLogSubmit = (e: React.SyntheticEvent<EventTarget>) => {
        e.preventDefault();
        console.log({ logEmail, logPassword })
        logInUser({
            email: logEmail,
            password: logPassword
        })
    }

    return (
        <div>
            <form
                onSubmit={handleRegSubmit}
            >
                <h1>Register</h1>
                <input type="text" placeholder="Username"
                    onChange={e => setRegEmail(e.target.value)}
                />
                <input type="text" placeholder="Password"
                    onChange={e => setRegPassword(e.target.value)}
                />
                <input type="submit" value="Register" />
            </form>

            <form
                onSubmit={handleLogSubmit}
            >
                <h1>Login</h1>
                <input type="text" placeholder="EMail"
                    onChange={e => setLogEmail(e.target.value)}
                />
                <input type="text" placeholder="Password"
                    onChange={e => setLogPassword(e.target.value)}
                />

                < input type="submit" value="Login"
                />
            </form>

            <div>
                <h1>Register</h1>
                <h1>{user?.username}</h1>
                <h2>{user?.email}</h2>
                <button
                    onClick={e => getUser()}
                >Get User</button>
            </div>
        </div>
    );
}

export default LogIn;