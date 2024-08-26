import { Link } from 'react-router-dom';
import ImgLike from '../img/like.png'


const Blog = ({ handleGetTimePosted, ...props }) => {

    const { title, body, likes, author, id, liked, createdDate } = props.blog;

    const handleLikeBtnClick = () => {
        props.handleLikeBtnClick(id)
    }

    const getLikeBtnClass = () => {
        let classes = 'btn-like ';
        classes += liked ? 'liked' : ''
        return classes;
    }




    return (
        <div className="blog-card">
            <h1 className="title">
                <Link to={`/blogs/posts/${id}`}>
                    {title}
                </Link>

            </h1>
            { <h4 className="date-posted">Posted: {handleGetTimePosted(createdDate)}</h4>}
            <p className="blog-body">
                <Link to={`/blogs/posts/${id}`}>
                    {body.slice(0, 199)}{body.length > 299 ? '...' : ''}
                </Link>
            </p>
            <div className="likes-group">
                <p className="like-amount">{likes}</p>
                <button className={getLikeBtnClass()}
                    onClick={e => handleLikeBtnClick()}
                >
                    {<img src={ImgLike} className={liked ? 'inverted' : ''} />}
                </button>
            </div>
            <h3 className="author">Written by: {author}</h3>
        </div>
    );
}

export default Blog;