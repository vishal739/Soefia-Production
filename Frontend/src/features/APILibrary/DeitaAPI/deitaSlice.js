import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchPreviewLesson, createPreviewLesson, updateDeita, deleteDeita } from "./deitaAPI"

const initialState = {
    status: "idle",
    value: 0,
    previewLesson: {}
   
};


export const fetchPreviewLessonAsync = createAsyncThunk(
    "deita/fetchPreviewLesson",
    async (data) => {
        const response = await fetchPreviewLesson(data);
        return response;
    }
);
export const createPreviewLessonAsync = createAsyncThunk(
    "deita/createPreviewLesson",
    async (data, { rejectWithValue }) => {
        try {
            const response = await createPreviewLesson(data); // Use the new fetch-based function
            return response; // Return the response data
          } catch (error) {
            return rejectWithValue(error.message || 'Error uploading file');
          }
      }
);
export const updateDeitaAsync = createAsyncThunk(
    "deita/updateDeita",
    async (data, { rejectWithValue }) => {
        try {
            console.log("UpdateDeitaAsync: ", data);
            const response = await updateDeita(data);
            return response;
        } catch (error) {
            console.error("Error updating Deita: ", error);
            return rejectWithValue(error.message);
        }
    }
);
export const deleteDeitaAsync = createAsyncThunk(
    "deita/deleteDeita",
    async (data) => {
        const response = await deleteDeita(data);
        return response;
    }
);

export const deitaSlice = createSlice({
    name: "deita",
    initialState,

    extraReducers: (builder) => {
        builder
            .addCase(fetchPreviewLessonAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchPreviewLessonAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.previewLesson = action.payload
            })
            .addCase(fetchPreviewLessonAsync.rejected, (state, action) => {
                state.status = "idle";
                state.error= action.payload.message;
            })
            .addCase(createPreviewLessonAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createPreviewLessonAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.previewLesson = action.payload;
            })
            .addCase(createPreviewLessonAsync.rejected, (state, action) => {
                state.status = "idle";
                state.error= action.payload.message;
            })
            .addCase(updateDeitaAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateDeitaAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.previewLesson = action.payload;
            })
            .addCase(deleteDeitaAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteDeitaAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.previewLesson = action.payload;
            });
    },
});



export const selectPreviewLesson = (state) => state.deita.previewLesson;
export const selectPreviewLessonLoader =(state)=> state.deita.status

export default deitaSlice.reducer;
