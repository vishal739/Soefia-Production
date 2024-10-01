const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const GroupSchema = new Schema({
//     name: String,
//     students: [{
//         studentsId: { type: Schema.Types.ObjectId, ref: 'Student' },
//         deitaPerspective: { type: String },
//         studentPerspective: { type: String },
//         review: { type: String }
//     }],
//     formationType: { type: String, enum: ['Alphabetic', 'Numeric', 'Other'] },
//     targetGroupSize: Number,
//     deitaPerspective: { type: String },
//     groupPerspective: { type: String },
//     review: { type: String }
// });

const LessonSchema = new Schema({
    title: { type: String, required: true },
    content: String,
    date: { type: Date, required: true },
    type: { type: String,enum: ['upcoming', 'completed'], default: 'upcoming' },
    lessonMaterials: String,
    lessonExercise: String,
    learningGoals: String,
    lessonSummary: String,
    lessonStructureOverview: String,
    socialCollaborationGoal: String,
    status: { type: String, enum: ['Draft', 'Ready to Launch', 'Completed'], default: 'Draft' },
    groups: [{
        name: String,
        students: [{
            studentsId: { type: Schema.Types.ObjectId, ref: 'Student' },
            deitaPerspective: { type: String },
            studentPerspective: { type: String },
            review: { type: String }
        }],
        formationType: { type: String, enum: ['Alphabetic', 'Numeric',  'Other'] }, 
        targetGroupSize: Number,
        deitaPerspective: { type: String },
        groupPerspective: { type: String },
        review: { type: String }
    }],
    classId: { type: Schema.Types.ObjectId, ref: 'Class', require: true },
    teacherId: { type: Schema.Types.ObjectId, ref: 'Teacher', require: true },

}, { timestamps: true });

const Lesson = mongoose.model('Lesson', LessonSchema);
module.exports = Lesson;
