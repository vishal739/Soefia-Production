const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profileBio: { type: String },
  class: { type: String, required: true },
  academicFactors: [{
    subjectName: { type: String },
    grade: { type: String },
    performance: { type: String },
  }],
  school: { type: Schema.Types.ObjectId, ref: 'School' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
