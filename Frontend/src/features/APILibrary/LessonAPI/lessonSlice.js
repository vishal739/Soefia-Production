import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUpcomingLesson, fetchCompletedLesson, createLesson, updateLesson, deleteLesson, fetchCompletedLessonByClass } from "./lessonAPI"


const initialState = {
  currentlesson: [],
  upcomingLesson: [],
  completedLesson: [],
  classLesson: []
};


export const fetchUpcomingLessonAsync = createAsyncThunk(
  "lesson/fetchUpcomingLesson",
  async (data, { rejectWithValue }) => {
    try {
    console.log("fetchUpcomingLessonAsync: ",data)
    const response = await fetchUpcomingLesson(data);
    return response;
  } catch (error) {
    console.error("Error creating lesson: ", error); 
    return rejectWithValue(error.message); 
  }
  }
);
export const fetchCompletedLessonAsync = createAsyncThunk(
  "lesson/fetchCompletedLesson",
  async (data) => {
    const response = await fetchCompletedLesson(data);
    return response;
  }
);
export const fetchCompletedLessonByClassAsync = createAsyncThunk(
  "lesson/fetchCompletedLessonByClass",
  async (data) => {
    const response = await fetchCompletedLessonByClass(data);
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
      .addCase(fetchUpcomingLessonAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUpcomingLessonAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.upcomingLesson = action.payload
      })
      .addCase(fetchCompletedLessonAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCompletedLessonAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.completedLesson = action.payload
      })
      .addCase(fetchCompletedLessonByClassAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCompletedLessonByClassAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.classLesson = action.payload
      })
      .addCase(createLessonAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createLessonAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.currentlesson = action.payload;
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



export const selectUpcomingLesson = (state) => state.lesson.upcomingLesson;
export const selectCompletedLesson = (state) => state.lesson.completedLesson;
export const selectClassLesson = (state) => state.lesson.classLesson;
export const selectCurrentLesson = (state) => state.lesson.currentlesson;


export default lessonSlice.reducer;
