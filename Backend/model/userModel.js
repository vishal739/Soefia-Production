const mongoose= require('mongoose');
const { Schema }= mongoose;

const userSchema = new Schema ({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function(v) {return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i.test(v);},
            message: props => `${props.value} is not a valid email address!`
        }
    },
    password: {type: String, minLength: 6},
    role: {type: String},
    googleId: { type: String },
    name: { type: String }
})


exports.User= mongoose.model("User",userSchema);