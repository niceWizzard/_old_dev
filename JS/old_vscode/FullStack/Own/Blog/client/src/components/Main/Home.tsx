// import { useEffect, useState } from "react";
import { useState } from "react";

import useAxios, { useAxiosProps } from "../Custom Hooks/useAxios";
import BlogCards from "../Blogs/BlogCards";

export interface HomeProps {

}

export interface BlogType {
    writer: {
        username: string,
        id: string
    },
    likes: number,
    title: string
    body: string,
    comments: string[],
    createdDate: Date
}

const hello: useAxiosProps = {
    url: 'http://localhost:4000/blogs', method: "GET"

}

const Home: React.FC<HomeProps> = () => {

    const { data: blogs, loading } = useAxios(hello)
    const [state, setState] = useState('')

    return (
        <>
            <div id="top" className="CONTENT">
                <div className="container">
                    <input type="text" value={state} onChange={(e) => setState(e.target.value)} />
                    <h1 > Home</h1>
                    <div className="content-tab">
                        <h1 className="content-tab-title">Trending</h1>
                        <div className="content-tab-body">
                            {loading && <h1>Loading...</h1>}
                            {blogs &&
                                <BlogCards blogs={blogs} />
                            }

                        </div>
                    </div>
                </div>
                <h1 > Home</h1>
                <h1 > Home</h1>
                <h1 > Home</h1>
                <h1 > Home</h1>
                <h1 > Home</h1>
                <h1 > Home</h1>
                <h1 > Home</h1>
                <h1 > Home</h1>
                <h1 > Home</h1>
                <h1 > Home</h1>
                <h1 > Home</h1>
                <h1 > Home</h1>
                <h1 > Home</h1>
                <h1 > Home</h1>
                <h1 > Home</h1>
                <h1 > Home</h1>
                <h1 > Home</h1>
                <h1 > Home</h1>
                <h1 > Home</h1>
                <h1 > Home</h1>
                <h1 > Home</h1>
                <h1 > Home</h1>
                <h1 > Home</h1>
                <h1 > Home</h1>
                <h1 > Home</h1>
                <h1 > Home</h1>
                <a href="#top">Top</a>
            </div>

        </>

    );
}

export default Home;