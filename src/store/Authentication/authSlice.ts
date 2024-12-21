import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthState, ForgotPasswordValues, LoginResponse, LoginValues, ResetPasswordValues, VerifyResetCodeValues } from "./type/authType";

const initialState: AuthState = {
    token: '',
    isLoading: false,
    isError: false,
    error: null,
};

export const login = createAsyncThunk<LoginResponse, LoginValues, { rejectValue: string }>(
    'auth/login',
    async (values, { rejectWithValue }) => {
        try {
            const { data } = await axios.post<LoginResponse>(`https://exam.elevateegy.com/api/v1/auth/signin`, values);
            return data;
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Login failed";
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);

export const forgetPassword = createAsyncThunk<string, ForgotPasswordValues, { rejectValue: string }>(
    'auth/forgotPassword',
    async (values, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`https://exam.elevateegy.com/api/v1/auth/forgotPassword`, values);
            return data.message;
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Forgot password failed";
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);

export const verifyResetCode = createAsyncThunk<string, VerifyResetCodeValues, { rejectValue: string }>(
    'auth/verifyResetCode',
    async (values, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`https://exam.elevateegy.com/api/v1/auth/verifyResetCode`, values);
            return data.status;
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Verification failed";
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);

export const resetPassword = createAsyncThunk<string, ResetPasswordValues, { rejectValue: string }>(
    'auth/resetPassword',
    async (values, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`https://exam.elevateegy.com/api/v1/auth/resetPassword`, values);
            return data.message;
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Reset password failed";
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearToken: (state) => {
            state.token = '';
        },
    },
    extraReducers: (builder) => {
        // login
        builder.addCase(login.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.error = null;
        });
        builder.addCase(login.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
            state.isLoading = false;
            state.isError = false;
            state.error = null;
            state.token = action.payload.token;
            localStorage.setItem('token', action.payload.token);
        });
        builder.addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.payload || "Login failed";
        });

        // forgetPassword
        builder.addCase(forgetPassword.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.error = null;
        });
        builder.addCase(forgetPassword.fulfilled, (state) => {
            state.isLoading = false;
            state.isError = false;
            state.error = null;
        });
        builder.addCase(forgetPassword.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.payload || "Forgot password failed";
        });

        // verifyResetCode
        builder.addCase(verifyResetCode.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.error = null;
        });
        builder.addCase(verifyResetCode.fulfilled, (state) => {
            state.isLoading = false;
            state.isError = false;
            state.error = null;
        });
        builder.addCase(verifyResetCode.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.payload || "Verification failed";
        });

        // resetPassword
        builder.addCase(resetPassword.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.error = null;
        });
        builder.addCase(resetPassword.fulfilled, (state) => {
            state.isLoading = false;
            state.isError = false;
            state.error = null;
        });
        builder.addCase(resetPassword.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.payload || "Reset password failed";
        });
    },
});

export const authReducer = authSlice.reducer