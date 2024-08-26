import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'

import BlogPost from './BlogPost'

const BlogLink = ({ blogs, handleLikeBtnClick, handleGetTimePosted, ...props }) => {

    const { id } = useParams()

    const [blog, setBlog] = useState();


    useEffect(async () => {
        let gotBlog;
        for (let _blog of blogs) {
            if (_blog.id === id) {
                gotBlog = _blog
            }
        }
        setBlog(gotBlog)
    }, [])

    return (
        <>
            {blog && <h1>Blog Link - {id}</h1>}
            {blog && <BlogPost blog={blog}
                handleGetTimePosted={handleGetTimePosted}
                handleLikeBtnClick={handleLikeBtnClick}
            />}
            {!blog && <h1>Blog not found...</h1>}

        </>
    );
}

export default BlogLink;