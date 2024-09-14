const router = require('express').Router();
const authController = require('../controller/authController');
const passport = require('passport');
const { signupUser, loginUser, checkUser, logout } = authController;
require('dotenv').config();
router.get('/home', (req, res) => {
    res.send("On auth");
})
router.post('/signup', signupUser);
router.post('/login', loginUser);
router.get('/login/success', checkUser);
router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: `${process.env.CLIENT_URL}/signup` }),
    (req, res) => {
       
        const user = req.user;  
        let redirectUrl = `${process.env.CLIENT_URL}/login`; 

        if (user.role === 'admin') {
            redirectUrl = `${process.env.CLIENT_URL}/admin`;
        } else if (user.role === 'teacher') {
            redirectUrl = `${process.env.CLIENT_URL}/teacher`;
        } else if (user.role === 'student') {
            redirectUrl = `${process.env.CLIENT_URL}/student`;
        }

        res.redirect(redirectUrl);
    }
);

router.get('/logout', logout);

module.exports = router;
