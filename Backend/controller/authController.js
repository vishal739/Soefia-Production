const passport = require('passport');
const bcrypt = require("bcrypt")
const model = require('../model/userModel');
const User = model.User;
require('../utils/auth');

const signupUser = async (req, res) => {
    try {
        const { email, password, role,name } = req.body;

        if (!password) {
            return res.status(400).json({ status: false, message: 'Password is required for registration.' });
        }

        console.log("Signup in process");

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ status: false, message: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            email,
            password: hashedPassword,
            role,
            name
        });

        await user.save();

        const userObject = user.toObject();
        delete userObject.password;

        req.login(user, (err) => {
            if (err) {
              return next(err); // Handle error if login fails
            }
            return res.status(201).json({ status: true, message: 'Signup successful', user: userObject });
          });
    } catch (error) {
        console.log('Registration error:', error);
        res.status(500).json({ status: false, message: 'Internal server error' });
    }
};


const loginUser = async (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error', err });
        }
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        req.logIn(user, (err) => {
            if (err) {
                return res.status(500).json({ status: false, message: 'Login failed' });
            }
            const userObject = user.toObject();
            delete userObject.password;
            return res.status(200).json({ status: true, message: 'Login successful', user: userObject });
        });
    })(req, res, next);
};




const logout = async (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ status: false, message: 'Logout failed' });
        }
        req.session.destroy((sessionErr) => {
            if (sessionErr) {
                return res.status(500).json({ status: false, message: 'Session destruction failed' });
            }
            res.status(200).json({ status: true, message: 'Logout successful' });
        });
    });
}

const checkUser = (req, res) => {
    console.log(req.user)
    try {
        const user= req.user;
        console.log(user);
        if (req.user) {
            res.status(200).json({auth: true, status: true, message: "user Login", user: user })
        } else {
            res.status(401).json({auth: true, status: false, message: "Not Authorized"})
        }
    } catch (error) {
        console.log(error)
        res.status(409).json({auth: false, status: false, message: "Unable to checkuser" })
    }
}

module.exports = { signupUser, loginUser, checkUser, logout };