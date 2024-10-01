const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profileBio: { type: String },
    upcomingLesson: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }], 
    previousLesson: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }], 
    schoolId: { type: Schema.Types.ObjectId, ref: 'School' },
    classId: [{ type: Schema.Types.ObjectId, ref: 'Class' }],
}, { timestamps: true });

const Teacher = mongoose.model('Teacher', teacherSchema);
module.exports = Teacher;
