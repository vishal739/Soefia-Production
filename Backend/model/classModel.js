const mongoose = require('mongoose');
// const shortid = require('shortid');

const Schema = mongoose.Schema;

const ClassSchema = new Schema({
    name: { type: String, required: true },
    teacher: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
    students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
    school: { type: Schema.Types.ObjectId, ref: 'School', required: true },
    lessons: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }],
    whatineedknow: [{type: string}]
});

// // Ensure indexes are created for any query performance concerns
// ClassSchema.index({ _id: 1 }, { unique: true });

const Class = mongoose.model('Class', ClassSchema);
module.exports = Class;
