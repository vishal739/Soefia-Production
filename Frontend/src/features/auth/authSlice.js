import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, checkUser, signOut, googleAuth } from "./authAPI";

const initialState = {
  value: 0,
  status: "idle",
  loggedIn: null,
  error:null
};


export const createUserAsync = createAsyncThunk(
  "auth/createUser",
  async (data) => {
    console.log("data async: ", data )
    const response = await createUser(data);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);
export const checkUserAsync = createAsyncThunk(
  "auth/checkUser",
  async (data) => {
    console.log("data async: ", data )
    const response = await checkUser(data);
    // The value we return becomes the `fulfilled` action payload
    console.log("login async: ",response);
    return response;
  }
);

export const googleAsync = createAsyncThunk(
  "auth/googleAsync",
  async () => {
    // console.log("data async: ", data )
    const response = await googleAuth();
    // The value we return becomes the `fulfilled` action payload
    console.log("google async: ",response);
    return response;
  }
);

export const signOutAsync = createAsyncThunk(
  "auth/signOut",
  async(data) =>{
    const response=signOut();
    return response;
  }
)

export const authSlice = createSlice({
  name: "auth",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
   
  },
   extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedIn = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedIn = action.payload;
        // console.log(state.loggedIn);
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      .addCase(googleAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(googleAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedIn = action.payload;
        // console.log(state.loggedIn);
      })
      .addCase(googleAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedIn = null;
        // console.log(state.loggedIn);
      })
  },
});

export const { increment } = authSlice.actions;


export const selectCheckUser = (state) => state.auth.loggedIn;
export const selectError = (state) => state.auth.error;

export default authSlice.reducer;
