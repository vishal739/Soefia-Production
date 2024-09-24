import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"
import lessonReducer from "../features/teacher/LessonAPI/lessonSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    lesson: lessonReducer,
  },
});