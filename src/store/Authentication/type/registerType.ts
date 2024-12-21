export interface RegisterValues {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    rePassword: string;
    phone: string;
}

export interface AuthState {
    data: {
        message: string;
        user: any;
    } | null;
    isLoading: boolean;
    isError: boolean;
    error: string;
}

export interface RegisterResponse {
    data: {
        message: string;
        user: any;
    };
}