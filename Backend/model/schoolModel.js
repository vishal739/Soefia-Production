const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schoolSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  contactNumber: { type: String, required: true },
  teachers: [{ type: Schema.Types.ObjectId, ref: 'Teacher' }],
  students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
  admins: [{ type: Schema.Types.ObjectId, ref: 'Admin' }]
},{ timestamps: true });

const School = mongoose.model('School', schoolSchema);
