import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAdmin, createAdmin, updateAdmin, deleteAdmin } from "./adminAPI"


const initialState = {
  value: 0,
  admin: [],
};


export const fetchAdminAsync = createAsyncThunk(
  "admin/fetchAdmin",
  async (data) => {
    const response = await fetchAdmin(data);
    return response;
  }
);
export const createAdminAsync = createAsyncThunk(
  "admin/createAdmin",
  async (data, { rejectWithValue }) => {
    try {
      const response = await createAdmin(data);
      console.log("response: ", response); 
      
      return response;
    } catch (error) {
      console.error("Error creating admin: ", error); 
      return rejectWithValue(error.message); 
    }
  }
);
export const updateAdminAsync = createAsyncThunk(
  "admin/updateAdmin",
  async (data) => {
    const response = await updateAdmin(data);
    return response;
  }
);
export const deleteAdminAsync = createAsyncThunk(
  "admin/deleteAdmin",
  async (data) => {
    const response = await deleteAdmin(data);
    return response;
  }
);

export const adminSlice = createSlice({
  name: "admin",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAdminAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.admin = action.payload
      })
      .addCase(createAdminAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createAdminAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.admin = action.payload;
      })
      .addCase(updateAdminAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateAdminAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.admin = action.payload;
      })
      .addCase(deleteAdminAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteAdminAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.admin = action.payload;
      });
  },
});



export const selectAdmin = (state) => state.admin.admin;


export default adminSlice.reducer;
