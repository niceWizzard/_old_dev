import { useContext, useEffect, useMemo, useReducer } from "react";
import { Helmet } from "react-helmet-async";
import { SETUSERContext, USERContext } from "../../contexts";
import { capitalizeFirst, decimalToString } from "../../functions";
import UserAuth from "../customHooks/UserAuth"
import '../../css/dashboard.css'
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import useAxios from "../customHooks/useAxios";

export interface DashboardProps {

}

type state = {
    globe: {
        profit: string
        balance: string
    }
    smart: {
        profit: string
        balance: string
    }
    multiplier: {
        globe: string
        smart: string
    }
}

type action = {
    type: 'balance' | 'multipler' | 'profit' | 'default'
    payload: any
    carrier: 'globe' | 'smart'
}

const reducer = (state: state, action: action): state => {
    const { type, payload, carrier } = action
    switch (type) {
        case 'default':
            return { ...state, globe: payload.globe, smart: payload.smart, multiplier: payload.multiplier }
        case 'balance':
            return { ...state, [carrier]: { ...state[carrier], balance: payload } }
        case 'profit':
            return { ...state, [carrier]: { ...state[carrier], profit: payload } }
        case 'multipler':
            return { ...state, multiplier: { ...state.multiplier, [carrier]: payload } }

        default:
            return { ...state }
    }
}

const initialState: state = {
    globe: {
        profit: '',
        balance: ''
    },
    smart: {
        profit: '',
        balance: ''
    },
    multiplier: {
        smart: '',
        globe: ''
    }
}

const Dashboard: React.FC<DashboardProps> = () => {
    const source = useMemo(() => (axios.CancelToken.source()), [])
    const USER = useContext(USERContext)
    const setUSER = useContext(SETUSERContext)
    const [state, dispatch] = useReducer(reducer, initialState)
    const { data: USERbyAxios, isLoading } = useAxios({ method: "GET", url: '/users/user' })
    const history = useHistory()

    useEffect(() => {

        if (!USER) {
            setUSER && setUSER(USERbyAxios)
        }
        if (USER) {
            dispatch({ type: 'default', carrier: 'globe', payload: USER })
        }
    }, [setUSER, USER, source.token])

    useEffect(() => {
        return () => {
            source.cancel('Cancelled by axios')
        }
    }, [source])

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(state)
        try {
            const res = await axios({
                url: '/users/user', method: 'POST', withCredentials: true, cancelToken: source.token,
                data: { data: { ...state } }
            })
            if (res.data.type === 1) {
                setUSER && setUSER(res.data.user)
                return history.push('/')
            }
            alert(res.data.message)
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <>
            <Helmet>
                <title>{`Dashboard ${USER ? '- ' + capitalizeFirst(USER?.username) : ""}`}</title>
                <meta name="description" content="Create List of your Loads!" />
            </Helmet>
            <UserAuth>
                <h1>Dashboard</h1>
                <div className="dashboard">
                    <div className="container">
                        <form
                            onSubmit={onSubmit}
                        >
                            <div className="dashboard-group">
                                <h1 className="title">Globe</h1>
                                <div className="input-group">
                                    <label>Balance</label>
                                    <input type="number"
                                        value={!isLoading ? decimalToString(3, state?.globe.balance) || '' : 'Loading'}
                                        onChange={(e) => dispatch({ type: 'balance', carrier: 'globe', payload: e.target.value })}
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Profit</label>
                                    <input type="number"
                                        value={!isLoading ? state?.globe.profit : 'Loading'}
                                        onChange={(e) => dispatch({ type: 'profit', carrier: 'globe', payload: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="dashboard-group">
                                <h1 className="title">Smart</h1>
                                <div className="input-group">
                                    <label>Balance</label>
                                    <input type="number"
                                        value={!isLoading ? decimalToString(3, state?.smart.balance) || '' : 'Loading'}
                                        onChange={(e) => dispatch({ type: 'balance', carrier: 'smart', payload: e.target.value })}
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Profit</label>
                                    <input type="number"
                                        value={!isLoading ? state?.smart.profit : 'Loading'}
                                        onChange={(e) => dispatch({ type: 'profit', carrier: 'smart', payload: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="dashboard-group">
                                <h1 className="title" >Multiplier</h1>
                                <div className="input-group">
                                    <label>Smart</label>
                                    <input type="number"
                                        value={!isLoading ? state.multiplier.smart : 'Loading'}
                                        onChange={(e) => dispatch({ type: 'multipler', carrier: 'smart', payload: e.target.value })}
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Globe</label>
                                    <input type="number"
                                        value={!isLoading ? state.multiplier.globe : 'Loading'}
                                        onChange={(e) => dispatch({ type: 'multipler', carrier: 'globe', payload: e.target.value })}
                                    />
                                </div>
                            </div>
                            <Link className="" to="/">Cancel</Link>
                            <input type="submit" value="Save Changes" />
                        </form>
                    </div>
                </div>
            </UserAuth>
        </>
    );
}

export default Dashboard