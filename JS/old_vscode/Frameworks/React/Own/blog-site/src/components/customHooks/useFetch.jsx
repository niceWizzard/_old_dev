import { useState, useEffect } from 'react'


export const putItem = (id, item) => {
    fetch(`http://localhost:8000/blogs/${id}`, {
        method: "PUT",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(item)
    })
}

export const postItem = (item) => {
    fetch(`http://localhost:8000/blogs/`, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(item)
    })
}

export const fetchItem = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    return data;
}




const useFetch = (url) => {

    const [data, setData] = useState(null);

    const fetchBlogs = async () => {
        const res = await fetch(url);
        const _data = await res.json();
        return _data;
    }

    useEffect(() => {
        fetchBlogs()
            .then(res => {
                setData(res);
            })
            .catch(err => {
                console.log(err.message)
            })

    }, []);


    return { data, setData };
}

export default useFetch;