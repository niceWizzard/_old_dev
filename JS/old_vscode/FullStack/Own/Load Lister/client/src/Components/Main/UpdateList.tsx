import axios from "axios";
import { FormEvent, useContext, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useHistory, useParams } from "react-router-dom";
import { SETUSERContext } from "../../contexts";
import UserAuth from "../customHooks/UserAuth";
import NotFound from "../NotFound";
import Navbar from "./Navbar";

export interface UpdateListProps {

}

type actionType = "buyer" | "amount" | "carrier" | 'notfound'
type action = {
    type: actionType
    payload: string
}

type state = {
    buyer: string,
    amount: string,
    carrier: string
    found?: boolean
}

const reducer = (state: state, action: action) => {
    const { payload } = action
    switch (action.type) {
        case 'amount':
            return { ...state, amount: payload }
        case 'buyer':
            return { ...state, buyer: payload }
        case 'carrier':
            return { ...state, carrier: payload }
        case 'notfound':
            return { ...state, found: false }

        default:
            return state
    }
}

const initialState: state = {
    buyer: '',
    amount: '',
    carrier: '',
    found: true
}

let timer: NodeJS.Timeout


const UpdateList: React.FC<UpdateListProps> = () => {
    const source = useMemo(() => (axios.CancelToken.source()), []);
    const id = useParams<{ id: string }>().id
    const setUSER = useContext(SETUSERContext)
    const [state, dispatch] = useReducer(reducer, initialState)
    const history = useHistory();
    const [confirm, setConfirm] = useState(false);
    const click = useRef({ delete: 0, update: 0 })
    const isFetched = useRef(false)
    const [msg, setMsg] = useState('')

    useEffect(() => {
        async function thing() {
            try {
                const res = await axios({
                    url: '/lists/' + id, withCredentials: true,
                    method: "GET",
                    cancelToken: source.token
                })
                const { type } = res.data
                console.log(res.data)
                if (type > 0) {
                    const data = res.data.data
                    isFetched.current = true
                    setMsg('')
                    dispatch({ payload: data.amount, type: 'amount' })
                    dispatch({ payload: data.buyer, type: 'buyer' })
                    dispatch({ payload: data.carrier, type: 'carrier' })
                } else if (type < 0) {
                    return dispatch({ type: 'notfound', payload: 'fd' })
                }
            }
            catch (err) {
                if (axios.isCancel(err)) return console.log(err.message)
                setMsg(err.message)
            }
        }
        thing()
        return () => {
            source.cancel("USEFFECT 1, Cancelled by Axios")
            clearTimeout(timer)
        }

    }, [id, source])




    const onSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setMsg('Updating...')
        console.log(click.current.update)
        if (click.current.update === 0) {
            click.current.update += 1
            try {
                console.log("SENDING", state)
                const res = await axios({
                    method: "PUT", data: { ...state, amount: parseInt(state.amount) },
                    url: '/lists/' + id, withCredentials: true,
                    cancelToken: source.token
                })
                if (res.data.type > 0) {
                    setMsg(res.data.message + ' Redirecting...')
                    setUSER && setUSER(res.data.user)
                    return timer = setTimeout(() => history.push('/'), 2000)
                }
                click.current.update = 0
                setMsg(res.data.message)
                return console.log(click.current.update)

            } catch (err) {
                if (axios.isCancel(err)) return console.log(err.message)
                setMsg(err.message)
            }
        }
        click.current.update += 1

    }

    const handleDelete = async () => {
        if (click.current.delete === 1) {
            click.current.delete += 1
            try {
                const res = await axios({
                    method: "DELETE", url: '/lists/' + id, withCredentials: true,
                    cancelToken: source.token

                })
                setMsg(res.data.message + ' Redirecting...')
                if (res.data.type > 0) {
                    setUSER && setUSER(res.data.user)
                    return timer = setTimeout(() => history.push('/'), 2000)
                }
                click.current.delete = 1
            } catch (err) {
                if (axios.isCancel(err)) return console.log(err.message)
                setMsg(err.message)
            }
        }
        setConfirm(true);
        click.current.delete += 1
    }

    const updateAmount = (e: any) => {
        const val = e.target.value;
        !(parseInt(val) < 0) && dispatch({ payload: val, type: 'amount' })
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, type: actionType) => {

        if (!isFetched.current) {
            setMsg('Still fetching!')
            return
        }
        if (type === 'amount') {
            return updateAmount(e)
        }
        return dispatch({ payload: e.target.value, type })
    }

    return (
        <>
            <Helmet>
                <title>Update - {id}</title>
                <meta name="description" content={"Update or Delete any of your created receipts anytime you want!"} />
            </Helmet>
            <UserAuth fallback="/login">
                <Navbar />
                {
                    state.found ?
                        <>
                            <h1>Update List</h1>
                            {msg && <p className="form-message">{msg}</p>}
                            <form onSubmit={onSubmit}  >
                                <input type="text" placeholder="Buyer"
                                    value={state.buyer}
                                    onChange={(e) => onChange(e, 'buyer')}
                                />
                                <input type="number" placeholder="Amount"
                                    onChange={(e) => onChange(e, 'amount')}
                                    value={state.amount}
                                />
                                <select
                                    value={state.carrier}
                                    onChange={(e) => onChange(e, 'carrier')}
                                >
                                    <option value="smart">Smart</option>
                                    <option value="globe">Globe</option>
                                </select>
                                <input type="submit" value={click.current.update > 0 ? "Updating" : "Update"} />
                            </form>
                            <button
                                onClick={handleDelete}
                            >{confirm ? 'Confirm Delete' : 'Delete'}</button>
                        </>
                        : <NotFound />
                }

            </UserAuth>
        </>
    );
}

export default UpdateList;