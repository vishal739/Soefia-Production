import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLesson, createLesson, updateLesson, deleteLesson } from "./lessonAPI"
import { updateTeacherAsync } from "../TeacherAPI/teacherSlice";
import { updateTeacher } from "../TeacherAPI/teacherAPI";

const initialState = {
  value: 0,
  lesson: [],
};


export const fetchLessonAsync = createAsyncThunk(
  "lesson/fetchLesson",
  async (data) => {
    const response = await fetchLesson(data);
    return response;
  }
);
export const createLessonAsync = createAsyncThunk(
  "lesson/createLesson",
  async (data, { rejectWithValue }) => {
    try {
      const response = await createLesson(data);
      console.log("response: ", response); 
      
      return response;
    } catch (error) {
      console.error("Error creating lesson: ", error); 
      return rejectWithValue(error.message); 
    }
  }
);
export const updateLessonAsync = createAsyncThunk(
  "lesson/updateLesson",
  async (data) => {
    const response = await updateLesson(data);
    return response;
  }
);
export const deleteLessonAsync = createAsyncThunk(
  "lesson/deleteLesson",
  async (data) => {
    const response = await deleteLesson(data);
    return response;
  }
);

export const lessonSlice = createSlice({
  name: "lesson",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(fetchLessonAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLessonAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.lesson = action.payload
      })
      .addCase(createLessonAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createLessonAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.lesson = action.payload;
      })
      .addCase(updateLessonAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateLessonAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.lesson = action.payload;
      })
      .addCase(deleteLessonAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteLessonAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.lesson = action.payload;
      });
  },
});



export const selectLesson = (state) => state.lesson.lesson;


export default lessonSlice.reducer;
