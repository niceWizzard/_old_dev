import { Link, useHistory } from "react-router-dom"
import Form from "./Form/Form";
import { inputs, User } from '../types'
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { showMessage as doMessage } from '../functions'
import axios from "axios";
import WithUser from "./customHooks/withUser";
import { Helmet } from "react-helmet-async";

export interface LoginProps {
    setUSER: React.Dispatch<React.SetStateAction<User | null>>
}


const Login: React.FC<LoginProps> = ({ setUSER }) => {
    const source = useMemo(() => (axios.CancelToken.source()), []);
    const [message, setMessage] = useState<string | null>(null)
    const [, render] = useState<any>(null)
    const click = useRef(0)
    const ref = useRef<any>(null)
    const history = useHistory()

    useEffect(() => {
        return () => {
            source.cancel()
            clearTimeout(ref.current)
        }
    }, [source])

    const inputs: inputs[] = [
        {
            placeholder: 'Username',
            name: 'username',
            required: true,
            initialValue: JSON.parse(window.localStorage.getItem('info')!).username || ''
        },
        {
            type: 'password',
            placeholder: 'password',
            name: 'password',
            required: true,
            initialValue: JSON.parse(window.localStorage.getItem('info')!).password || ''

        }
    ]

    const showMessage = (msg: string, duration = 3000) => {
        if (ref.current !== null) {
            clearTimeout(ref.current)
        }
        ref.current = doMessage(msg, setMessage, duration)
    }

    const onSubmit = async (e: FormEvent, data: any) => {
        e.preventDefault()
        click.current += 1
        render(undefined)
        if (click.current === 1) {
            console.log("TRYING")
            try {
                const res = await axios({
                    url: '/users/login', data, method: "POST",
                    withCredentials: true,
                    cancelToken: source.token
                })
                showMessage(res.data.message)
                console.log(res.data)
                if (res.data.type === 1) {
                    console.log("REDIRECTING")
                    setUSER(res.data.user)
                    setTimeout(() => {
                        history.push('/lists/create')
                    }, 1000)
                    return window.localStorage.setItem('info', JSON.stringify({ username: data.username, password: data.password }))
                }
                click.current -= 1

            } catch (err) {
                console.log(err)
            }
        }

    }


    return (
        <>
            <Helmet>
                <title>Login - Load Lister</title>
                <meta name="description" content={"Load Lister is the best Load Receipt Manager in the whole internet. Create an account and simply login and enjoy the Management!"} />
            </Helmet>
            <WithUser >
                <h1>Login</h1>
                <Form arrayInputs={inputs} onSubmit={onSubmit} submitValue={click.current < 1 ? "Login" : 'Logging in'} msg={message} />
                <Link to="/register">Register</Link>
            </WithUser>
        </>
    );
}

export default Login;