const mongoose = require('mongoose');
// const shortid = require('shortid');

const Schema = mongoose.Schema;

const ClassSchema = new Schema({
    name: { type: String, required: true },
    teacherId: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
    studentsId: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
    schoolId: { type: Schema.Types.ObjectId, ref: 'School', required: true },
    lessonsId: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }],
    whatINeedToKnow: [{
        date: { type: Date, default: Date.now},
        topic: { type: String },
        _id: false
    }],
    notebook: {
        socialSummary: {
            engagement: {
                Academic: { type: Number, default: 0 },
                Social: { type: Number, default: 0 }
            },
            sentiment: {
                positive: { type: Number, default: 0 },
                negative: { type: Number, default: 0 }
            }
        },
        summaryObservation: { type: String },
        review: { type: String },
    }
});

// // Ensure indexes are created for any query performance concerns
// ClassSchema.index({ _id: 1 }, { unique: true });

const Class = mongoose.model('Class', ClassSchema);
module.exports = Class;
