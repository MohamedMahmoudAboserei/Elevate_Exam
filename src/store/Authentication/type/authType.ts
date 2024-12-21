export interface AuthState {
    token: string;
    isLoading: boolean;
    isError: boolean;
    error: string | null;
}

export interface LoginResponse {
    message: string;
    token: string;
}

export interface LoginValues {
    email: string;
    password: string;
}

export interface ForgotPasswordValues {
    email: string;
}

export interface VerifyResetCodeValues {
    resetCode: string;
}

export interface ResetPasswordValues {
    email: string;
    newPassword: string;
}