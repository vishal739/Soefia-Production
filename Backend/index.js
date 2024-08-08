const express= require("express");
const morgan= require("morgan");
const cors= require("cors");
require('dotenv').config();
const mongoose= require("mongoose");
const passport = require("passport");
const session= require("express-session");
require('./auth')

const app= express();
app.use(session({ secret: 'cats'}));
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());

const isLoggedIn = (req, res, next) =>{
    req.user? next() : res.sendStatus(401);
}

app.get("/", (req, res)=>{
    res.send("Soefia Api connected Succesfully")
})
app.get("/auth", (req,res)=>{
    res.send('<a href="/auth/google"> Authenticate with google </a>')
})

app.get('/auth/google',
    passport.authenticate('google', {scope: ['email','profile']})
);

app.get( '/google/callback',
    passport.authenticate( 'google',{
        successRedirect: '/protected',
        failureRedirect: '/auth/google/failure'
    })
)

app.get('/protected', isLoggedIn, (req,res)=>{
    res.send(`Hello ${req.user.displayName}`);
})

app.get('/logout', (res,req)=>{
    req.logout();
    req.session.destroy();
    res.send('Goodbye');
})

app.get('/auth/google/failure', (req, res) => {
  res.send('Failed to authenticate..');
});

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('database connected');
}
app.listen(8080, ()=>{
    console.log("Server started");
})