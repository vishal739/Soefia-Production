import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLesson, createLesson } from "./lessonAPI"

const initialState = {
  value: 0,
  lesson: [],
};


export const fetchLessonAsync = createAsyncThunk(
  "lesson/fetchLesson",
  async (data) => {
    const response = await fetchLesson(data);
    return response.data;
  }
);
export const createLessonAsync = createAsyncThunk(
  "lesson/createLesson",
  async (amount) => {
    const response = await createLesson(amount);
    return response.data;
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
        state.lesson= action.payload
      })
      .addCase(createLessonAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createLessonAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.lesson= action.payload;
      });
  },
});



export const selectLesson = (state) => state.lesson.lesson;


export default lessonSlice.reducer;
