const mongoose = require('mongoose')

const Schema = mongoose.Schema;


const blogSchema = new Schema({
    writer: {
        type: String
    },
    title: String,
    body: String,
    comments: {
        type: String,
        default: undefined
    },
    likes: Number
}, {
    timestamps: true,
}
)

const User = mongoose.model('Blog', blogSchema);

module.exports = User;





