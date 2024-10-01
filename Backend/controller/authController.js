const passport = require('passport');
const bcrypt = require("bcrypt")
const model = require('../model/userModel');
const User = model.User;
const  Admin = require("../model/adminModel")
const  Teacher = require("../model/teacherModel")
const  Student = require("../model/studentModel")
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

// const getTeacherData = async (id) => {
//     try {
//         const teacherData =  // Populate classes

//         return teacherData;
//     } catch (error) {
//         console.error("Error fetching teacher data: ", error);
//         throw new Error('Could not fetch teacher data');
//     }
// };



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
                    userData = await Teacher.findOne({ userId: id }).populate('classId');
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

// const checkUser = (req, res) => {
//     console.log(req.user)
//     try {
//         const user= req.user;
//         console.log(user);
//         delete user.password;
//         if (req.user) {
//             // const role= user.role;
//             // const id= user.id;
//             // let userData;
//             // if(role=="teacher"){
//             //     userData= Teacher.findOne({userId: id })
//             // }else if(role=="admin"){
//             //     userData= Admin.findOne({userId: id })
//             // }else if(role=="student"){
//             //     userData= Student.findOne({userId: id })
//             // }
//             res.status(200).json({auth: true, status: true, message: "user Login", user: user })
//         } else {
//             res.status(401).json({auth: true, status: false, message: "Not Authorized"})
//         }
//     } catch (error) {
//         console.log(error)
//         res.status(409).json({auth: false, status: false, message: "Unable to checkuser" })
//     }
// }
const checkUser = async (req, res) => {
    console.log(req.user)
    try {
        const user= req.user;
        // console.log("checkUser: ", user);
        // delete user.password;
        if (req.user) {
            const role= user.role;
            const id= user._id;
            let userData;
            if(role=="teacher"){
                userData = await Teacher.findOne({ userId: id }).populate('classId').populate('upcomingLesson');
            }else if(role=="admin"){
                userData= await Admin.findOne({userId: id })
            }else if(role=="student"){
                userData= await Student.findOne({userId: id })
            }
            // delete user._id;
            // console.log("userData: ",userData)
            userData= {...user, userData}
            res.status(200).json({auth: true, status: true, message: "user Login", user: userData })
        } else {
            res.status(401).json({auth: true, status: false, message: "Not Authorized"})
        }
    } catch (error) {
        console.log(error)
        res.status(409).json({auth: false, status: false, message: error })
    }
}

module.exports = { signupUser, loginUser, checkUser, logout };