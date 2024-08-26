import ImgLike from '../img/like.png'


const BlogPost = ({ handleGetTimePosted, ...props }) => {
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
        <>
            {props.blog && <div className="blog-card">
                <h1 className="title">{title}</h1>
                <p>Posted: {handleGetTimePosted(createdDate)}</p>
                <p>{body}</p>
                <div className="likes-group">
                    <p className="like-amount">{likes}</p>
                    <button className={getLikeBtnClass()}
                        onClick={e => handleLikeBtnClick()}
                    >
                        {<img src={ImgLike} className={liked ? 'inverted' : ''} />}
                    </button>
                </div>
                <h3 className="author">Written by: {author}</h3>
            </div>}
        </>
    );
}

export default BlogPost;