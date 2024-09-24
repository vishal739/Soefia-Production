const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    classes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }]
});

const Course = mongoose.model('Course', CourseSchema);
module.exports = Course;