const router = require('express').Router();

// Login Page / Landing Page

router.get('/', (req, res) => {
    res.render('login', { layout: 'login' })
})



// Dashboard Page
router.get('/dashboard', (req, res) => {
    res.render('dashboard')
})





module.exports = router;