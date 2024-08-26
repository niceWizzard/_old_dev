const router = require('express').Router()
const List = require('../models/list.model')
const User = require('../models/user.model')
const { isAuth, isNotAuth } = require('./functions')





// =========================================================== GET ===========================================================

router.get('/', isAuth, async (req, res) => {
    const { list } = req.user

    const doc = await List.findById(list)
    if (doc.list.length === 0) {
        return res.json({ type: 0, data: [] })
    }
    res.json({ type: 1, data: doc.list })

})

router.get('/:id', isAuth, async (req, res) => {
    const id = req.params.id
    try {
        const doc = await List.getList(id)
        if (!doc) {
            return res.json({ type: -1, message: 'Receipt not Found' })
        }
        const hey = doc.list.find((el) => el['_id'] == id)

        res.json({ type: 1, data: hey })
    } catch (err) {
        if (err.path === 'id' && err.kind === 'ObjectId') return res.json({ type: -1, message: 'Invalid ID' })
        console.log(err)
        res.json({ type: -1, message: err.message, err })
    }

})

// =========================================================== PUT ===========================================================

// Update List
router.put('/:id', isAuth, checkFields, checkUser, async (req, res,) => {
    const { buyer, amount, carrier } = req.body
    const paramId = req.params.id
    const [newBalance, newProfit] = getMoney(amount, req.user.multiplier[carrier])
    const newt = { buyer, amount, carrier, money: { profit: newProfit, balance: newBalance } }
    let oldList;
    let updatedList;
    try {
        const docs = req.session.docs
        const chosenList = docs.list.map((el) => {
            if (el['_id'] == paramId) {
                oldList = el
                const { profit, balance } = el.money
                updatedList = { profit: newProfit - profit, balance: newBalance - balance }
                const out = { ...el, ...newt }
                return out
            }
            return el
        })
        const newUser = oldList.carrier === carrier ?
            await User.findUserAndUpdateMoney(req.user, carrier, updatedList.profit, updatedList.balance)
            : await updateMoneyWithNewCarrier(req.user, carrier, { profit: newProfit, balance: newBalance }, oldList)
        const newDocs = await List.findByIdAndUpdate(docs['_id'], { list: chosenList }, { new: true })
        return res.json({ type: 1, message: 'Updated Successfully!', user: newUser, doc: newDocs })
    } catch (err) {
        console.log(err)
        return res.json({ type: -1, message: err.message, err })
    }

})

async function updateMoneyWithNewCarrier(user, carrier, { profit, balance }, oldReceipt) {
    await User.findUserAndUpdateMoney(user, oldReceipt.carrier, (oldReceipt.money.profit * -1), (oldReceipt.money.balance * -1))
    const newUser = await User.findUserAndUpdateMoney(user, carrier, profit, balance)
    return newUser


}
//  =========================================================== POST ===========================================================

// Create/Add List
router.post('/add', checkFields, isAuth, async (req, res) => {
    const { buyer, amount, carrier } = req.body
    const { username, list } = req.user;
    const [balToAdd, profitToAdd] = getMoney(amount, req.user.multiplier[carrier])

    const money = { profit: profitToAdd, balance: balToAdd }

    try {

        const newUser = await User.findUserAndUpdateMoney(req.user, carrier, profitToAdd, balToAdd)
        const doc = await List.findById(list)
        const docs = await List.findByIdAndUpdate(list, {
            list: [
                ...doc.list, { username, buyer, amount, carrier, money, date: new Date() }
            ]
        }, { new: true })

        res.json({ type: 1, data: { newUser, docs }, message: 'Thingy Created!' })
    } catch (err) {
        res.json({ type: -1, message: err.message, err })
        console.log("ERROR", err)
    }

})




// DELETE
router.delete('/:id', isAuth, checkUser, async (req, res,) => {
    const paramId = req.params.id
    const docs = req.session.docs
    let deletedList;
    try {
        const newList = docs.list.filter((el) => {
            if (el['_id'].toString() !== paramId) {
                return el
            }
            deletedList = el
        })
        const { money: { profit, balance }, carrier: deletedCarrier } = deletedList && (deletedList)
        const resp = await List.findByIdAndUpdate(docs['_id'], { list: newList }, { new: true })
        const newUser = await User.findUserAndUpdateMoney(req.user, deletedCarrier, (profit * -1), (balance * -1))
        return res.json({ type: 1, message: 'Deleted Successfully!', data: { user: newUser, resp } })
    } catch (err) {
        console.log(err)
        return res.json({ type: -1, message: err.message, err })
    }

})



// MIDDLEWARES



function getMoney(amount, requestMultiplier) {
    const bal = amount * (requestMultiplier);
    const profit = (amount >= 50 ? (amount >= 100 ? 10 : 5) : 3)
    return [bal, profit]
}



async function checkUser(req, res, next) {
    const paramId = req.params.id
    try {
        const docs = await List.getList(paramId)
        if (docs['_id'].toString() !== req.user.list) {
            return res.json({ type: -1, message: 'Not allowed.' })
        }
        if (!docs) return res.json({ type: -1, message: 'Receipt not Found' })
        req.session.docs = docs
    } catch (err) {
        res.json({ type: -1, message: err.message })
    }
    next()
}

function checkFields(req, res, next) {
    const { amount, buyer, carrier } = req.body
    if (!amount || !buyer || !carrier) {
        return res.json({ type: -1, message: 'Please Fill in all fields.' })
    }
    if (amount <= 0) {
        return res.json({ type: -1, message: 'Invalid amount.' })
    }
    next()
}

module.exports = router;