import { Link, useHistory } from 'react-router-dom'
import { useState } from 'react'


const Create = (props) => {


    const { handleAddNewBlog } = props;
    const history = useHistory()

    const [blog, setBlog] = useState({
        title: '',
        body: '',
        createdDate: new Date(),
        id: '',
        author: 'Main Admin',
        likes: 0,
        liked: false
    })

    const handleCreateSubmit = (e) => {
        e.preventDefault()
        handleAddNewBlog(blog)
        history.push('/blogs-all')

    }

    const handleTitleChange = ({ target }) => {
        const newBlog = { ...blog };
        newBlog.title = target.value;
        setBlog(newBlog)
    }

    const handleTextareaChange = ({ target }) => {
        const newBlog = { ...blog };
        newBlog.body = target.value;
        setBlog(newBlog)
    }

    const handleKeyDown = (e) => {
        if (e.altKey && e.key === 'a') {
            const newBlog = { ...blog };
            newBlog.body += '\t';
            setBlog(newBlog)
        }

    }


    return (
        <div className="create">
            <h2 className="create-text-title">Add a new blog</h2>
            <form className="create-form"
                onSubmit={handleCreateSubmit}
            >
                <input required type="text" placeholder="Title" className="create-title"
                    value={blog.title}
                    onChange={handleTitleChange}
                />
                <textarea required name="input" className="create-body" placeholder="Write something......."
                    value={blog.body}
                    onChange={handleTextareaChange}
                    onKeyDown={handleKeyDown}
                ></textarea>
                <input type="submit" value="Create" />
            </form>
        </div>
    );
}

export default Create;