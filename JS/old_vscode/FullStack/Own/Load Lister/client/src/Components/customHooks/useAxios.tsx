import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'

export type useAxiosProps = {
    url: string,
    method: "GET" | "POST" | "PUT"
    toSend?: any
}


function useAxios<T>({ url, method, toSend }: useAxiosProps) {
    const [data, setData] = useState<T | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const source = useMemo(() => (axios.CancelToken.source()), []);

    useEffect(() => {
        const thing = async () => {
            try {
                const res = await axios({
                    url, method,
                    data: toSend,
                    withCredentials: true, cancelToken: source.token
                })
                setIsLoading(false)
                if (res.data.user) return setData(res.data.user)
                if (res.data.type === 1 || res.data.type === 0) {
                    setData(res.data.data)
                }
                else {
                    setData(null)
                }
            }
            catch (err) {
                if (axios.isCancel(err)) return false
                console.log(err)
            }
        }
        thing()

        return () => {
            source.cancel()
        }

    }, [toSend, method, url, source])

    return (
        { data, setData, isLoading, setIsLoading }
    );
}

export default useAxios;