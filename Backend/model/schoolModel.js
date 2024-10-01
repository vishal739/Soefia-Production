const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schoolSchema = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    contactNumber: { type: String, required: true },
    teachersId: [{ type: Schema.Types.ObjectId, ref: 'Teacher' }],
    studentsId: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
    adminsId: [{ type: Schema.Types.ObjectId, ref: 'Admin' }]
}, { timestamps: true });

const School = mongoose.model('School', schoolSchema);
module.exports = School;
