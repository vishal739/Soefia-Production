const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeitaSchema = new mongoose.Schema({
    lessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
    previewLesson: {
        myIntroduction: { type: String },
        academicLearning: { type: String },
        socialLearning: { type: String },
        keyConcepts: { type: String }
    }
});

const Deita = mongoose.model('Deita', DeitaSchema);
module.exports = Deita;