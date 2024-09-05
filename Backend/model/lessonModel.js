const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
    name: String,
    students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
    formationType: { type: String, enum: ['Alphabetic', 'Numeric', 'Other'] },
    targetGroupSize: Number,
}, { _id: false });

const LessonSchema = new Schema({
    title: String,
    content: String,
    date: Date,
    materials: [String],
    learningGoals: String,
    lessonSummary: String,
    status: { type: String, enum: ['Draft', 'Ready to Launch', 'Completed'] },
    groups: [GroupSchema],
}, { timestamps: true });

const Lesson = mongoose.model('Lesson', LessonSchema);
module.exports = Lesson;
