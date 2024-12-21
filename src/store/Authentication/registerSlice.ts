import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthState, RegisterResponse, RegisterValues } from "./type/registerType";

const initialState: AuthState = {
    data: null,
    isLoading: false,
    isError: false,
    error: "",
};

export const register = createAsyncThunk<
    RegisterResponse,
    RegisterValues,
    { rejectValue: string }
>("auth/register", async (values, { rejectWithValue }) => {
    try {
        const { data } = await axios.post<RegisterResponse>(
            `https://exam.elevateegy.com/api/v1/auth/signup`,
            values
        );
        return data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
});

const registerSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(register.fulfilled, (state, action: PayloadAction<RegisterResponse>) => {
            state.data = action.payload.data;
            state.isLoading = false;
            state.isError = false;
            state.error = "";
        });
        builder.addCase(register.rejected, (state, action) => {
            state.data = null;
            state.isLoading = false;
            state.isError = true;
            state.error = action.payload || "An error occurred";
            toast.error(action.payload || "An error occurred");
        });
        builder.addCase(register.pending, (state) => {
            state.data = null;
            state.isLoading = true;
            state.isError = false;
            state.error = "";
        });
    },
});

export const registerReducer = registerSlice.reducer