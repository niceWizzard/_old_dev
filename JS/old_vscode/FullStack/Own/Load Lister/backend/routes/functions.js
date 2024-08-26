function isNotAuth(req, res, next) {
    const { username, password } = req.body
    if (!username || !password) {
        return res.json({ type: -1, message: 'Insufficient Fields!' })
    }
    if (req.isAuthenticated()) {
        return res.json({ type: -1, message: 'Already Loginned' })
    }
    next()
}

function isAuth(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.json({ type: -1, message: 'Not allowed. Login for futher actions' })
    }
    next()
}

function checkFields(req, res, next) {
    const { username, password, repassword } = req.body
    if (!username || !password || !repassword) {
        return res.json({ type: -1, message: 'Insufficient Fields' })
    }
    if (password !== repassword) {
        return res.json({ type: -1, message: 'Passwords don\'t match' })
    }
    next()
}


module.exports = { isAuth, isNotAuth, checkFields }