const passport = require('passport');
const bcrypt = require("bcrypt")
const model = require('../model/userModel');
const User = model.User;
const Admin = require("../model/adminModel")
const Teacher = require("../model/teacherModel")
const Student = require("../model/studentModel")
require('../utils/auth');

/**
 * Handles user signup by creating a new user account.
 * 
 * @async
 * @function signupUser
 * @param {Object} req - Express request object.
 * @param {Object} req.body - The request body.
 * @param {string} req.body.email - The user's email.
 * @param {string} req.body.password - The user's password.
 * @param {string} req.body.role - The user's role.
 * @param {string} req.body.name - The user's name.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - Returns a promise that resolves to void.
 * @throws {Error} - Throws an error if registration fails.
 */
const signupUser = async (req, res) => {
    try {
        const { email, password, role, name } = req.body;

        if (!password) {
            return res.status(400).json({ status: false, message: 'Password is required for registration.' });
        }

        // console.log("Signup in process");

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


/**
 * Authenticates and logs in a user using Passport.js.
 *
 * @async
 * @function loginUser
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {Promise<void>} Sends a JSON response with the authentication status and user data.
 * @throws {Error} If there is an internal server error or an error fetching user data.
 */
const loginUser = async (req, res, next) => {
    passport.authenticate('local', async (err, user, info) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error', err });
        }
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        req.logIn(user, async (err) => {
            if (err) {
                return res.status(500).json({ status: false, message: 'Login failed' });
            }
            let userObject = user.toObject();


            delete userObject.password;

            const role = userObject.role;
            const id = userObject._id;
            let userData;

            try {
                if (role === "teacher") {
                    userData = await Teacher.findOne({ userId: id }).populate({
                        path: 'classId',
                        select: 'name date',
                    });
                } else if (role === "admin") {
                    userData = await Admin.findOne({ userId: id });
                } else if (role === "student") {
                    userData = await Student.findOne({ userId: id });
                }


                const combinedData = { ...userObject, userData };

                return res.status(200).json({
                    auth: true,
                    status: true,
                    message: "User Login",
                    user: combinedData
                });
            } catch (error) {
                return res.status(500).json({ status: false, message: 'Error fetching user data', error });
            }
        });
    })(req, res, next);
};


/**
 * Logs out the user by calling the `req.logout` method and destroys the session.
 * 
 * @async
 * @function logout
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 * @throws Will return a 500 status code if logout or session destruction fails.
 */
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


/**
 * Asynchronously checks the user based on the request object and returns user data.
 * 
 * @param {Object} req - The request object.
 * @param {Object} req.user - The user object from the request.
 * @param {string} req.user.role - The role of the user (e.g., "teacher", "admin", "student").
 * @param {string} req.user._id - The ID of the user.
 * @param {Object} res - The response object.
 * 
 * @returns {Promise<void>} - Sends a JSON response with user data if authorized, otherwise sends an unauthorized response.
 */
const checkUser = async (req, res) => {
    // console.log(req.user)
    try {
        const user = req.user;
        if (req.user) {
            const role = user.role;
            const id = user._id;
            let userData;
            if (role == "teacher") {
                userData = await Teacher.findOne({ userId: id }).populate({
                    path: 'classId',
                    select: 'name date',
                });
            } else if (role == "admin") {
                userData = await Admin.findOne({ userId: id })
            } else if (role == "student") {
                userData = await Student.findOne({ userId: id })
            }
            // delete user._id;
            console.log("userData: ",userData)
            userData = { ...user, userData }
            res.status(200).json({ auth: true, status: true, message: "user Login", user: userData })
        } else {
            res.status(401).json({ auth: true, status: false, message: "Not Authorized" })
        }
    } catch (error) {
        console.log(error)
        res.status(409).json({ auth: false, status: false, message: error })
    }
}

module.exports = { signupUser, loginUser, checkUser, logout };