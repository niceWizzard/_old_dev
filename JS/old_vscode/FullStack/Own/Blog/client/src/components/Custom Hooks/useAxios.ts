import { useEffect, useReducer } from "react";
import axios from 'axios'

export interface useAxiosProps {
    url: string
    method: 'GET' | 'PUT' | 'POST' | 'DELETE'
    toSend?: any
}



interface initialState {
    data: any,
    loading: boolean,
    err: any
}

type Loading = { type: 'loading' }

type ErrAndData<data> = { type: 'err' | 'data', payload: data }

type ACTION<T> =
    | Loading
    | ErrAndData<T>

function reducer<P>(state: initialState, action: ACTION<P>) {
    switch (action.type) {
        case 'loading':
            return { ...state, loading: false }
        case 'data':
            return { ...state, data: action.payload }
        case 'err':
            return { ...state, err: action.payload }
        default:
            return state
    }
}

const useAxios = ({ url, method, toSend }: useAxiosProps) => {


    const initialState: initialState = {
        data: null,
        loading: true,
        err: null
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        const source = axios.CancelToken.source()
        async function Axios() {
            try {
                const res = await axios({
                    url,
                    method,
                    data: toSend,
                    cancelToken: source.token
                })
                dispatch({ type: 'data', payload: res.data })
                dispatch({ type: 'loading' })
            } catch (err) {
                if (axios.isCancel(err)) {
                    return console.log("CLWEAN BY AXIOS!", err.message)
                }
                dispatch({ type: 'err', payload: err })
            }
        }
        Axios()
        return () => {
            source.cancel('CANCELLED!!')
        }
    }, [url, toSend, method])
    const output = { ...state, dispatch }

    return output
};

export default useAxios;