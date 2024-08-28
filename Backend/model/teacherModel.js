const teacherSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profileBio: { type: String },
    upcomingClasses: [{
      subjectName: { type: String },
      date: { type: Date },
      lessonTopic: { type: String },
      lessonDetails: { type: String },
    }],
    previousClasses: [{
      subjectName: { type: String },
      date: { type: Date },
      lessonTopic: { type: String },
      lessonDetails: { type: String },
    }],
    school: { type: Schema.Types.ObjectId, ref: 'School' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  
  const Teacher = mongoose.model('Teacher', teacherSchema);
  