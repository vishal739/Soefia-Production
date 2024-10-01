import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchClasses, createClasses, updateClasses, deleteClasses } from "./classesAPI"

const initialState = {
    value: 0,
    classes: {},
};


export const fetchClassesAsync = createAsyncThunk(
    "classes/fetchClasses",
    async (data) => {
        const response = await fetchClasses(data);
        return response;
    }
);
export const createClassesAsync = createAsyncThunk(
    "classes/createClasses",
    async (data) => {
        const response = await createClasses(data);
        return response;
    }
);
export const updateClassesAsync = createAsyncThunk(
    "classes/updateClasses",
    async (data, { rejectWithValue }) => {
        try {
            console.log("UpdateClassesAsync: ", data);
            const response = await updateClasses(data);
            return response;
        } catch (error) {
            console.error("Error updating Classes: ", error);
            return rejectWithValue(error.message);
        }
    }
);
export const deleteClassesAsync = createAsyncThunk(
    "classes/deleteClasses",
    async (data) => {
        const response = await deleteClasses(data);
        return response;
    }
);

export const classesSlice = createSlice({
    name: "classes",
    initialState,

    extraReducers: (builder) => {
        builder
            .addCase(fetchClassesAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchClassesAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.classes = action.payload
            })
            .addCase(createClassesAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createClassesAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.classes = action.payload;
            })
            .addCase(updateClassesAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateClassesAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.classes = action.payload;
            })
            .addCase(deleteClassesAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteClassesAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.classes = action.payload;
            });
    },
});



export const selectClasses = (state) => state.classes.classes;


export default classesSlice.reducer;
