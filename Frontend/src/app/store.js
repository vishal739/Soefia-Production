import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import { combineReducers } from "redux"; // Import combineReducers
import authReducer from "../features/auth/authSlice";
import lessonReducer from "../features/APILibrary/LessonAPI/lessonSlice";
import adminReducer from "../features/APILibrary/AdminAPI/adminSlice";
import teacherReducer from "../features/APILibrary/TeacherAPI/teacherSlice";
import studentReducer from "../features/APILibrary/StudentAPI/studentSlice";
import deitaReducer from "../features/APILibrary/DeitaAPI/deitaSlice";
import classesReducer from "../features/APILibrary/ClassesAPI/classesSlice";

// Configure persistence
const persistConfig = {
  key: 'root',
  storage,
};

// Combine your reducers into a root reducer
const rootReducer = combineReducers({
  auth: authReducer,
  lesson: lessonReducer,
  admin: adminReducer,
  teacher: teacherReducer,
  student: studentReducer,
  deita: deitaReducer,
  classes: classesReducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store with the persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
});

// Create a persistor
export const persistor = persistStore(store);
