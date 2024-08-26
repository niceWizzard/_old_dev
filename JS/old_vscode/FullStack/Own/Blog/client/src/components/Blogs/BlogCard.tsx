import Anchor from "../Anchor";
import AnchorBtn from "../AnchorBtn"
import { BlogType } from '../Main/Home'

import IMG_User from '../../images/img_user.png'
import IMG_Date from '../../images/img-date.png'
import IMG_Bookmark from '../../images/img-bookmark-unsaved.png'
import IMG_Bookmarked from '../../images/img-bookmark-saved.png'
import IMG_Like from '../../images/img-like.png'
import IMG_Liked from '../../images/img-liked.png'
import IMG_Comments from '../../images/img-comments.png'
import IMG_Share from '../../images/img-share.png'
import React, { useState } from "react";




export interface BlogProps {
    Blog: BlogType
}

// const reducer = (state: any, action: any) => {
//     switch (action.type) {
//         default:
//             return state
//     }
// }



const Blog: React.FC<BlogProps> = ({ Blog }) => {
    // const initialState = {
    //     hey: 'nothing'
    // }
    const { createdDate, likes, title, writer, comments } = Blog;
    const [liked, setLiked] = useState(false)
    const [bookmarked, setBookmarked] = useState(false)

    return (

        <div className="blog-card">
            <h1 className="title"><a href="/">{title} {writer.id}</a></h1>
            <div className="sub-title">
                <p className="author"> <Anchor leftIcon={IMG_User} iconClass="icon icon-author" href={`/user/${writer.id}`}>{writer.username}</Anchor> </p>
                <div className="date">
                    <img src={IMG_Date} alt="Date PNG" className="icon" />
                    <p>{createdDate}</p>
                </div>
                <p onClick={() => setBookmarked(!bookmarked)} className="saved"><AnchorBtn leftIcon={bookmarked ? IMG_Bookmarked : IMG_Bookmark} iconClass="icon icon-saved" >{bookmarked ? 'Saved' : 'Bookmark'}</AnchorBtn></p>
            </div>
            <div className="interaction-group">
                <AnchorBtn onClick={() => setLiked(!liked)} className="btn-blog-card" iconClass="icon" leftIcon={liked ? IMG_Liked : IMG_Like}>{likes} Like</AnchorBtn>
                <div className="btn-blog-card"> <img src={IMG_Comments} alt="COmments" className="icon" />{comments.length} Comment</div>
                <AnchorBtn className="btn-blog-card" iconClass="icon icon-share" leftIcon={IMG_Share}  >Share</AnchorBtn>
            </div>
        </div>
    );
}

export default React.memo(Blog);