import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchDeita, createDeita, updateDeita, deleteDeita } from "./deitaAPI"

const initialState = {
    value: 0,
    deita: {},
};


export const fetchDeitaAsync = createAsyncThunk(
    "deita/fetchDeita",
    async (data) => {
        const response = await fetchDeita(data);
        return response;
    }
);
export const createDeitaAsync = createAsyncThunk(
    "deita/createDeita",
    async (data) => {
        const response = await createDeita(data);
        return response;
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
            .addCase(fetchDeitaAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchDeitaAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.deita = action.payload
            })
            .addCase(createDeitaAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createDeitaAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.deita = action.payload;
            })
            .addCase(updateDeitaAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateDeitaAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.deita = action.payload;
            })
            .addCase(deleteDeitaAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteDeitaAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.deita = action.payload;
            });
    },
});



export const selectDeita = (state) => state.deita.deita;


export default deitaSlice.reducer;
