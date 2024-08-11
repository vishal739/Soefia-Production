const mongoose= require('mongoose');
const { Schema }= mongoose;

const ProfileSchema = new mongoose.Schema({
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    age: {
      type: Number,
      min: 0,
    },
    role: {
      type: String,
      trim: true,
    },
    profilePicture: {
      type: String, 
    },
  });

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
    token: {type: String},
    googleId: { type: String },
    name: { type: String },
    profile: {
        type: ProfileSchema,
        default: {}, 
    },
})


exports.User= mongoose.model("User",userSchema);