const mongoose = require('mongoose')

const Schema = mongoose.Schema;


const commentSchema = new Schema({
    comments: [
        {
            user: {
                required: true,
                id: String,
                username: String
            },
            comment: {
                type: String,
                required: true
            }
        }
    ]

}, {
    timestamps: true,
}
)

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;





