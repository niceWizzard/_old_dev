
import BlogCard from '../BlogCard';
import { Link } from 'react-router-dom';


const Home = (props) => {

    const { mainUrl, blogs } = props

    const { handleLikeBtnClick, handleGetTimePosted } = props;


    const getTopLikes = (max, _blogLists) => {
        const sorted = [..._blogLists].sort((a, b) => {
            return b.likes - a.likes;
        });

        let output = [];

        if (sorted) {
            for (let i = 0; i < max; i++) {
                output.push(sorted[i])
            }

            return output;
        }
    }





    return (
        <>
            <Link to="/create-blog"
            >Create blog</Link>

            <div className="container">
                <div className="blogs-container">
                    <h1>Top Blogs</h1>
                    <div className="top-blogs">
                        {!!blogs && getTopLikes(4, blogs).map((_blog, index) => {
                            {/* {blogs && blogs.map((_blog, index) => { */ }
                            return <BlogCard blog={_blog} key={index}
                                handleLikeBtnClick={handleLikeBtnClick}
                                handleGetTimePosted={handleGetTimePosted}
                            />
                        })
                        }
                        {!blogs && <h2>No blogs available</h2>}

                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;