const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotebookSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    classes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }],
    reviewNotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
    socialSummary: {
        engagement:{
            Academic:{type: String},
            Social: {type: String}
        },
        sentiment:{
            positive: {type: String},
            negative: {type: String}
        }
    },
    summaryObservation: {type: String},
    review: {type: String},
    
});

const Notebook = mongoose.model('Notebook', NotebookSchema);
module.exports = Notebook;