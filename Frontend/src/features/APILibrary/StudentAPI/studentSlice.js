import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchStudent, createStudent, updateStudent, deleteStudent } from "./studentAPI"


const initialState = {
  value: 0,
  student: [],
};


export const fetchStudentAsync = createAsyncThunk(
  "student/fetchStudent",
  async (data) => {
    const response = await fetchStudent(data);
    return response;
  }
);
export const createStudentAsync = createAsyncThunk(
  "student/createStudent",
  async (data, { rejectWithValue }) => {
    try {
      const response = await createStudent(data);
      console.log("response: ", response); 
      
      return response;
    } catch (error) {
      console.error("Error creating student: ", error); 
      return rejectWithValue(error.message); 
    }
  }
);
export const updateStudentAsync = createAsyncThunk(
  "student/updateStudent",
  async (data) => {
    const response = await updateStudent(data);
    return response;
  }
);
export const deleteStudentAsync = createAsyncThunk(
  "student/deleteStudent",
  async (data) => {
    const response = await deleteStudent(data);
    return response;
  }
);

export const studentSlice = createSlice({
  name: "student",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStudentAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.student = action.payload
      })
      .addCase(createStudentAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createStudentAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.student = action.payload;
      })
      .addCase(updateStudentAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateStudentAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.student = action.payload;
      })
      .addCase(deleteStudentAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteStudentAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.student = action.payload;
      });
  },
});



export const selectStudent = (state) => state.student.student;


export default studentSlice.reducer;
