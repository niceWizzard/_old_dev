const mongoose = require('mongoose');
const List = require('./list.model')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    utang: {
        type: [],
        default: []
    },
    smart: {
        profit: {
            type: Number,
            default: 0
        },
        balance: {
            type: Number,
            default: 0
        }
    },
    globe: {
        profit: {
            type: Number,
            default: 0,
            min: 0
        },
        balance: {
            type: Number,
            default: 0,
            min: 0
        }
    },
    multiplier: {
        smart: {
            type: Number,
            default: 0.955
        }, globe: {
            type: Number,
            default: 0.956
        }
    },
    list: String
},
    {
        timestamps: true
    }
)

userSchema.pre('save', async function () {
    const newList = new List()
    const list = await newList.save()
    this.list = list.id
})


userSchema.statics.findUserAndUpdateMoney = async function (user, carrier, profitToAdd, balToAdd) {
    if ((user[carrier].profit + profitToAdd) < 0, (user[carrier].balance - balToAdd) < 0) {
        throw ({ message: 'Insufficient balance to update the receipt' })
    }
    const newUser = await this.findByIdAndUpdate(user.id,
        {
            $inc: {
                [`${carrier}.profit`]: profitToAdd,
                [`${carrier}.balance`]: (balToAdd * -1)
            }
        }, {
        new: true,
    }
    )
    console.log(newUser)
    return newUser
}


const User = mongoose.model('User', userSchema);

module.exports = User;


