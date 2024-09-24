const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    role: { type: String, default: 'student' },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profileBio: { type: String },
    classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true }, 
    academicFactors: [{
        subjectName: { type: String, required: true },   
        grade: { type: String },                         
        performance: { type: String },                   
        progressData: {                               
            Academic: { type: Number, default: 0 },      
            Social: { type: Number, default: 0 }         
        },
        sentimentData: {                                 
            Positive: { type: Number, default: 0 },      
            Negative: { type: Number, default: 0 }
        }
    }],
    school: { type: Schema.Types.ObjectId, ref: 'School' }
}, { timestamps: true });



const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
