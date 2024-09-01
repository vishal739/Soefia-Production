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
    school: { type: Schema.Types.ObjectId, ref: 'School' }
  },{ timestamps: true });
  
  const Teacher = mongoose.model('Teacher', teacherSchema);
  