const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
    name: String,
    students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
    formationType: { type: String, enum: ['Alphabetic', 'Numeric', 'Other'] },
    targetGroupSize: Number,
}, { _id: false });

const LessonSchema = new Schema({
    title: {type: String, required: true},
    content: String,
    date: {type: Date, required: true},
    type: {type: String,required: true},
    lessonMaterials: [String],
    lessonExercise: [String],
    learningGoals: String,
    lessonSummary: String,
    LessonStructureOverview: String,
    SocialCollaborationGoal: String,
    status: { type: String, enum: ['Draft', 'Ready to Launch', 'Completed'], require: true },
    groups: [GroupSchema],
    classId: { type: Schema.Types.ObjectId, ref: 'Class', require: true },
    teacherId: { type: Schema.Types.ObjectId, ref: 'Teacher', require: true }
}, { timestamps: true });

const Lesson = mongoose.model('Lesson', LessonSchema);
module.exports = Lesson;
