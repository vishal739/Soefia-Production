import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"
import lessonReducer from "../features/APILibrary/LessonAPI/lessonSlice"
import adminReducer from "../features/APILibrary/AdminAPI/adminSlice"
import teacherReducer from "../features/APILibrary/TeacherAPI/teacherSlice"
import studentReducer from "../features/APILibrary/StudentAPI/studentSlice"
import deitaReducer from "../features/APILibrary/DeitaAPI/deitaSlice"
import classesReducer from "../features/APILibrary/ClassesAPI/classesSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    lesson: lessonReducer,
    admin: adminReducer,
    teacher: teacherReducer,
    student: studentReducer,
    deita: deitaReducer,
    classes: classesReducer,
  },
});