const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const LessonSchema = new Schema({
//     title: String,
//     content: String,
//     date: Date,
//     materials: [String],
//     learningGoals: String,
//     lessonSummary: String,
//     status: { type: String, enum: ['Draft', 'Ready to Launch', 'Completed'] },
//     groups: [GroupSchema],
// }, { _id: true });  


// const GroupSchema = new Schema({
//     name: String,
//     students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
//     formationType: { type: String, enum: ['Alphabetic', 'Numeric', 'Other'] },
//     targetGroupSize: Number,
// }, { _id: true });  


const ClassSchema = new Schema({
    name: { type: String, required: true },
    subject: { type: String, required: true },
    teacher: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
    students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
    school: { type: Schema.Types.ObjectId, ref: 'School', required: true },
    lessons: [LessonSchema],  
});


const Class = mongoose.model('Class', ClassSchema);
module.exports = Class;
