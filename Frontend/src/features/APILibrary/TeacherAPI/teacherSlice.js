import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchTeacher, createTeacher, updateTeacher, deleteTeacher } from "./teacherAPI"

const initialState = {
    value: 0,
    teacher: [],
};


export const fetchTeacherAsync = createAsyncThunk(
    "teacher/fetchTeacher",
    async (data) => {
        const response = await fetchTeacher(data);
        return response;
    }
);
export const createTeacherAsync = createAsyncThunk(
    "teacher/createTeacher",
    async (data) => {
        const response = await createTeacher(data);
        return response;
    }
);
export const updateTeacherAsync = createAsyncThunk(
    "teacher/updateTeacher",
    async (data, { rejectWithValue }) => {
        try {
            console.log("UpdateTeacherAsync: ", data);
            const response = await updateTeacher(data);
            return response;
        } catch (error) {
            console.error("Error updating Teacher: ", error);
            return rejectWithValue(error.message);
        }
    }
);
export const deleteTeacherAsync = createAsyncThunk(
    "teacher/deleteTeacher",
    async (data) => {
        const response = await deleteTeacher(data);
        return response;
    }
);

export const teacherSlice = createSlice({
    name: "teacher",
    initialState,

    extraReducers: (builder) => {
        builder
            .addCase(fetchTeacherAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchTeacherAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.teacher = action.payload
            })
            .addCase(createTeacherAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createTeacherAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.teacher = action.payload;
            })
            .addCase(updateTeacherAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateTeacherAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.teacher = action.payload;
            })
            .addCase(deleteTeacherAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteTeacherAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.teacher = action.payload;
            });
    },
});



export const selectTeacher = (state) => state.teacher.teacher;


export default teacherSlice.reducer;
