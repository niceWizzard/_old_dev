import { useState } from "react";
import axios from 'axios';

const Login = () => {

    const [regUsername, setRegUsername] = useState('')
    const [regPassword, setRegPassword] = useState('');

    const [logUsername, setLogUsername] = useState('')
    const [logPassword, setLogPassword] = useState('');
    const [data, setData] = useState(null)
    const [message, setMessage] = useState(null)


    const handleRegister = async () => {
        if (regPassword !== '' || regPassword !== '') {
            const res = await axios({
                method: 'POST',
                data: {
                    username: regUsername,
                    password: regPassword
                },
                withCredentials: true,
                url: 'http://localhost:4000/register'
            })
            handleSetMessage(res.data)
        } else {
            handleSetMessage('Please fill in all fields')
        }


    }
    const handleLogin = async () => {
        if (logPassword !== '' || logUsername !== '') {
            const res = await axios({
                method: 'POST',
                data: {
                    username: logUsername,
                    password: logPassword
                },
                withCredentials: true,
                url: 'http://localhost:4000/login/'
            })
            handleSetMessage(res.data)
            handleGetUser();
        } else {
            handleSetMessage('Please fill in all fields')
        }
    }
    const handleGetUser = async () => {
        const res = await axios({
            method: 'GET',

            withCredentials: true,
            url: 'http://localhost:4000/user/'
        })
        res.data.msg ? handleSetMessage(res.data.msg) : setData(res.data)

    }

    const handleLogoutUser = async () => {
        const res = await axios({
            method: 'POST',

            withCredentials: true,
            url: 'http://localhost:4000/user'
        })
        res.data && setData(null)
        handleSetMessage(res.data)

    }

    const handleSetMessage = (_data) => {
        setMessage(_data)
        setTimeout(() => {
            console.log('Clearing!')
            setMessage(null)
        }, 3000)
    }

    return (
        <>
            <h3>{message}</h3>

            <div>
                <h1>Register</h1>
                <input placeholder="username"
                    onChange={e => setRegUsername(e.target.value)} />
                <input placeholder="password"
                    onChange={e => setRegPassword(e.target.value)} />
                <button
                    onClick={handleRegister}
                >Register</button>
            </div>
            <div>
                <h1>Login</h1>
                <input placeholder="username"
                    onChange={e => setLogUsername(e.target.value)} />
                <input placeholder="password"
                    onChange={e => setLogPassword(e.target.value)} />
                <button
                    onClick={handleLogin}

                >Login</button>
            </div>

            <div>
                <h1>Get user</h1>
                {data && <h1>Welcome {data.username}</h1>}

                {!data &&
                    <button
                        onClick={handleGetUser}
                    >Submit</button>}
                {data &&
                    <button
                        onClick={handleLogoutUser}
                    >Logout</button>
                }
            </div>

        </>
    );
}

export default Login;