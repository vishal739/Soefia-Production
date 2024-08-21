const router = require('express').Router();
const authController = require('../controller/authController');
const passport = require('passport');
const { signupUser, loginUser, checkUser, logout } = authController;

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
        successRedirect: "https://soefia-production.onrender.com/teacher",
        failureRedirect: "https://soefia-production.onrender.com/login"
    }));
router.get('/logout', logout);

module.exports = router;
