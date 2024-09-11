const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profileBio: { type: String },
    upcomingClasses: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }], 
    previousClasses: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }], 
    school: { type: Schema.Types.ObjectId, ref: 'School' }
}, { timestamps: true });

const Teacher = mongoose.model('Teacher', teacherSchema);
module.exports = Teacher;
