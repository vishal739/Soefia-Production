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
    passport.authenticate('google', {
        successRedirect: `${process.env.CLIENT_URL}/teacher`,
        failureRedirect: `${process.env.CLIENT_URL}/login`
    }));
router.get('/logout', logout);

module.exports = router;
