const mongoose = require('mongoose');
const User = require('./user.model');

const listSchema = mongoose.Schema({
    list: [{
        date: {
            type: Date,
            default: new Date()
        },
        username: {
            type: String,
            required: true
        },
        buyer: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        carrier: {
            type: String,
            required: true
        },
        money: {
            profit: { type: Number, required: true },
            balance: { type: Number, required: true }
        }
    }]
}
    ,
    {
        timestamps: true
    }
)




listSchema.statics.getList = async function (id) {
    const doc = await this.findOne({ list: { $elemMatch: { _id: id } } }).lean()
    return doc
}

listSchema.statics.deleteList = async function (receipt, user) {
    const { id: receiptId, newList, docs } = receipt
    const { id: userId, money } = user;
    console.log("ORIGINAL DOCUMENT", docs)
    const newReceipt = await this.findByIdAndUpdate(receiptId, { ...docs, list: newList }, { new: true })
    console.log("NEW RECEIPT", newReceipt)
    const newUser = await User.findUserAndUpdateMoney(userId, (money.profit), (money.balance))
    return { user: newUser, resp: newReceipt }

}

const List = mongoose.model('List', listSchema);
module.exports = List;


