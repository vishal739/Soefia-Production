const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profileBio: { type: String },
  role: { type: String, default: 'Admin' },
  permissions: [{ type: String }],
  school: { type: Schema.Types.ObjectId, ref: 'School' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
