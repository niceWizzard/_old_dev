import axios from "axios";
import { FormEvent, useContext, useState } from "react";
import { URLContext } from './Contexts'

export interface SignInProps {

}

const SignIn: React.FC<SignInProps> = () => {

    const [state, setState] = useState({
        email: '',
        password: '',
    })

    const mainUrl = useContext(URLContext)

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault()
        console.log(state)
        const res = await axios({
            method: 'POST',
            data: { ...state, username: new Date() },
            url: `${mainUrl}/users/register`
        })

        console.log(res.data)
    }

    return (
        <>
            <h1>Sign IN</h1>

            <form
                onSubmit={onSubmit}
            >
                <input type="text" placeholder="Email" value={state.email}
                    onChange={(e) => setState({ ...state, email: e.target.value })}

                />
                <input required={true} type="password" placeholder="Password" value={state.password}
                    onChange={(e) => setState({ ...state, password: e.target.value })}
                />
                <input type="submit" value="Log In" />
            </form>

        </>
    );
}

export default SignIn;