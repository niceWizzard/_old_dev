import { Link } from 'react-router-dom'
import Form from './Form/Form';
import { inputs } from '../types'
import { FormEvent, useEffect, useRef, useState } from 'react';
import { showMessage as doMessage, usernameTest } from '../functions'
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

export interface RegisterProps {

}

const source = axios.CancelToken.source();

const Register: React.FC<RegisterProps> = () => {

    const [message, setMessage] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const ref = useRef<any>(null)

    useEffect(() => {
        return () => {
            source.cancel()
        }
    }, [])

    const showMessage = (msg: string, duration: number = 3000) => {
        let hey: any
        if (ref.current !== null) {
            clearTimeout(ref.current)
        }
        hey = doMessage(msg, setMessage, duration)
        ref.current = hey

    }

    const inputs: inputs[] = [
        {
            placeholder: 'Username',
            name: 'username',
            required: true
        },
        {
            // type: 'password',
            placeholder: 'password',
            name: 'password',
            required: true
        },
        {
            // type: 'password',
            placeholder: 'Retype password',
            name: 'repassword',
            required: true
        }
    ]

    const onSubmit = (e: FormEvent, data: any) => {
        e.preventDefault()
        const { username, password, repassword } = data
        if (password !== repassword) {
            return showMessage('Passwords don\'t match.')
        }
        if (password.length < 8) {
            return showMessage('Password must atleast be 8 characters long.')
        }

        const nameTest = usernameTest(username)

        if (nameTest) {
            const msg = `Username must be atleast 5 characters long. 
            Only '@', '_', '.' are allowed
            `
            return showMessage(msg)
        }

        setIsLoading(true)
        axios({
            method: "POST",
            url: '/users/register',
            cancelToken: source.token,

            data: {
                username, password, repassword
            }
        })
            .then(res => {
                if (res.data.type === 'error') {
                    showMessage(res.data.message)
                } else {
                    setMessage(res.data.message)
                }
                setIsLoading(false)
            })
            .catch((err) => {
                if (axios.isCancel(err)) {
                    return console.log("Cancelled Axios Request")
                }
                console.log(err)
            })


    }

    return (
        <>
            <Helmet>
                <title>Register - Load Lister</title>
                <meta name="description" content={"Load Lister is the best Load Receipt Manager in the whole internet. Create an account and simply login and enjoy the Management!"} />
            </Helmet>
            <h1>Register</h1>
            <Form arrayInputs={inputs} onSubmit={onSubmit} submitValue={isLoading ? 'Registering...' : 'Register'} msg={message} />
            <Link to="/login">Login</Link>
        </>
    );
}

export default Register;