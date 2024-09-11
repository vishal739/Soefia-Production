const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profileBio: { type: String },
    classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true }, 
    academicFactors: [{
        subjectName: { type: String },
        grade: { type: String },
        performance: { type: String },
    }],
    school: { type: Schema.Types.ObjectId, ref: 'School' }
}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
