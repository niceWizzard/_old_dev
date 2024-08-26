import axios from "axios";
import { FormEvent, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useHistory } from "react-router-dom";
import { SETUSERContext } from "../../contexts";
import { inputs, selection } from "../../types";
import UserAuth from "../customHooks/UserAuth";
import Form from "../Form/Form";
import Navbar from "./Navbar";

export interface CreateListProps {

}


let timer: NodeJS.Timeout
const CreateList: React.FC<CreateListProps> = () => {
    const source = useMemo(() => (axios.CancelToken.source()), []);
    const click = useRef(0)

    const history = useHistory()
    const form: inputs[] = [
        {
            name: "buyer",
            placeholder: "Buyer Name",
            required: true,
        },
        {
            name: 'amount',
            type: 'number',
            placeholder: "Amount",
            required: true,
        }
    ]
    const setUSER = useContext(SETUSERContext)
    const [msg, setMsg] = useState('')

    const selection: selection[] = [{
        name: 'carrier',
        initialValue: 'smart',
        optionArray: [{
            value: 'Smart',
        }, {
            value: 'Globe',
        }]
    }]

    useEffect(() => {
        return () => {
            source.cancel()
            clearTimeout(timer)
            console.log("CLEARING TIMER!")
        }
    }, [source])

    const onSubmit = (e: FormEvent, data: any) => {
        e.preventDefault()
        console.log(click.current)
        async function thing() {
            try {
                setMsg('Creating...')
                const res = await axios({
                    method: "POST", data,
                    url: '/lists/add', withCredentials: true, cancelToken: source.token
                })
                console.log(res.data)
                if (res.data.type === 1) {
                    setMsg(res.data.message + ' Redirecting...')
                    setUSER && setUSER(res.data.data.newUser)
                    return timer = setTimeout(() => history.push('/'), 2000)
                }
                click.current = 0
                setMsg(res.data.message)
                console.log(click.current)
            }
            catch (err) {
                if (axios.isCancel(err)) return false
                console.log(err)
            }
        }
        if (click.current === 0) {
            console.log("POSTING!")
            thing()
        }
        click.current += 1
        console.log(click.current > 0 ? "Creating" : 'Create')
    }

    return (
        <>
            <Helmet>
                <title>Create Receipt</title>
                <meta name="description" content={"Create any receipts anytime/anywhere you want!"} />
            </Helmet>
            <UserAuth fallback="/login">

                <Navbar />
                <h1>{click.current > 0 ? 'Crearing' : 'Create'}</h1>
                <h1>Create List</h1>
                <Form arrayInputs={form} onSubmit={onSubmit} arraySelect={selection} msg={msg}
                    submitValue={click.current === 0 ? "Create" : 'Creating'}
                />
            </UserAuth>
        </>
    );
}

export default CreateList;