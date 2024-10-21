import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { fetchUpcomingLesson, fetchCompletedLesson, createLesson, updateLesson, deleteLesson, fetchCompletedLessonByClass, fetchLesson,fetchCurrentLesson, uploadAndCreateLesson } from "./lessonAPI"


const initialState = {
  currentlesson: {},
  upcomingLesson: [],
  completedLesson: [],
  classLesson: [],
  lesson: [],
  status: "idle",
  uploading: false,
};


export const fetchLessonAsync = createAsyncThunk(
  "lesson/fetchLesson",
  async (data, { rejectWithValue }) => {
    try {
      console.log("fetchLessonAsync: ", data)
      const response = await fetchLesson(data);
      return response;
    } catch (error) {
      console.error("Error fetchLessonAsync lesson: ", error);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCurrentLessonAsync = createAsyncThunk(
  "lesson/fetchCurrent",
  async (data, { rejectWithValue }) => {
    try {
      console.log("fetchCurrentLessonAsync: ", data)
      const response = await fetchCurrentLesson(data);
      return response;
    } catch (error) {
      console.error("Error fetchCurrentLessonAsync lesson: ", error);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUpcomingLessonAsync = createAsyncThunk(
  "lesson/fetchUpcomingLesson",
  async (data, { rejectWithValue }) => {
    try {
      console.log("fetchUpcomingLessonAsync: ", data)
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

export const uploadAndCreateLessonAsync = createAsyncThunk(
  "lesson/uploadAndCreateLesson",
  async (file, { rejectWithValue }) => {
      try {
          const response = await uploadAndCreateLesson(file); // Use the new fetch-based function
          return response; // Return the response data
        } catch (error) {
          return rejectWithValue(error.message || 'Error uploading file');
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
      .addCase(fetchCurrentLessonAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCurrentLessonAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.currentlesson= action.payload
      })
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
      .addCase(uploadAndCreateLessonAsync.pending, (state) => {
        state.uploading= true;
      })
      .addCase(uploadAndCreateLessonAsync.fulfilled, (state, action) => {
        state.uploading= false;
        state.currentlesson = action.payload;
      })
      .addCase(uploadAndCreateLessonAsync.rejected, (state, action) => {
        state.uploading= false;
        state.error = action.payload.message;
      })
      .addCase(updateLessonAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateLessonAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index= state.lesson.findIndex(item=>item._id===action.payload._id);
        state.lesson[index]=action.payload;
        state.currentlesson = action.payload;
      })
      .addCase(deleteLessonAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteLessonAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index= state.lesson.findIndex(item=>item._id===action.payload._id);
        if (index !== -1) {
          state.lesson.splice(index, 1); 
        }
      });
  },
});



export const selectUpcomingLesson = (state) => state.lesson.upcomingLesson;
export const selectCompletedLesson = (state) => state.lesson.completedLesson;
export const selectClassLesson = (state) => state.lesson.classLesson;
export const selectCurrentLesson = (state) => state.lesson.currentlesson;
export const selectLesson = (state) => state.lesson.lesson;
export const selectLessonStatus = (state) => state.lesson.status;
export const selectUploadStatus = (state) => state.lesson.uploading;


export default lessonSlice.reducer;
