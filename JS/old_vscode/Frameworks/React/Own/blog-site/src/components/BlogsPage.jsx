
import BlogCard from './BlogCard';
import { useState, useEffect } from 'react'



const BlogsPage = (props) => {

    const { handleLikeBtnClick, handleGetTimePosted } = props;
    const { blogs } = props;


    const sortByTime = (_arr) => {
        return _arr.sort((a, b) => {
            return new Date(b.createdDate) - new Date(a.createdDate);
        })
    }

    const sortByTitle = (_arr) => {
        return _arr.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
            else if (a.title.toLowerCase() === b.title.toLowerCase()) return 0;
            else if (a.title.toLowerCase() > b.title.toLowerCase()) return 1
        })
    }

    const sortByLikes = (_arr) => {
        return _arr.sort((a, b) => {
            return b.likes - a.likes;
        })
    }

    const sortByAuthor = (_arr) => {
        return _arr.sort((a, b) => {
            if (a.author.toLowerCase() < b.author.toLowerCase()) return -1;
            else if (a.author.toLowerCase() === b.author.toLowerCase()) return 0;
            else if (a.author.toLowerCase() > b.author.toLowerCase()) return 1
        })
    }

    const handleSort = (sortType, direction, arr) => {
        let output;
        if (sortType === 'time') {
            output = sortByTime(arr)
            if (direction === 'ascend') output.reverse()
        } else if (sortType === 'title') {
            output = sortByTitle(arr);
            if (direction === 'ascend') output.reverse()
        } else if (sortType === 'likes') {
            output = sortByLikes(arr)
            if (direction === 'ascend') output.reverse()
        } else if (sortType === 'author') {
            output = sortByAuthor(arr)
            if (direction === 'ascend') output.reverse()
        }

        return output
    }



    return (
        <>
            <h1>All Blogs</h1>
            <div className="blog-content">
                {blogs && handleSort('time', '', blogs).map((blog, index) => {
                    return <BlogCard blog={blog} key={index}
                        handleLikeBtnClick={handleLikeBtnClick}
                        handleGetTimePosted={handleGetTimePosted}
                    />
                })}
                {!blogs && <h2>No blogs available</h2>}
            </div>
        </>

    );
}

export default BlogsPage;



