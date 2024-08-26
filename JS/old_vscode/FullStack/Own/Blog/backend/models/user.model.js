const mongoose = require('mongoose')

const Schema = mongoose.Schema;


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true
    },
    bookmarks: {
        type: [],
        default: [],
    },
    liked: {
        type: [],
        default: []
    },
    subscribed: {
        type: [],
        default: []
    }
}, {
    timestamps: true,
}
)

const User = mongoose.model('User', userSchema);

module.exports = User;





