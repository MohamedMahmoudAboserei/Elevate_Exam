import { configureStore } from "@reduxjs/toolkit";
import { registerReducer } from "./Authentication/registerSlice";
import { authReducer } from "./Authentication/authSlice";
import subjectsReducer from "./Subjects/subjectsSlice";

export const store = configureStore({
    reducer: {
        registerReducer,
        authReducer,
        subjects: subjectsReducer,
    }
});

export type storeDispatch = typeof store.dispatch;
export type storeState = ReturnType<typeof store.getState>;