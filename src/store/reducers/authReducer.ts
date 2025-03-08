// store/reducers/authReducer.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginAsync } from "../actions/authActions";

// Define the expected shape of a successful login response
interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
}

export interface LoginResponse {
    token: string;
    user: User;
}

interface AuthState {
    token: string | null;
    user: User | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: AuthState = {
    token: null,
    user: null,
    status: "idle",
    error: null,
};

const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            state.token = null;
            state.user = null;
            localStorage.removeItem("token");
            state.status = "idle";
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(loginAsync.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
                state.status = "succeeded";
                state.token = action.payload.token;
                state.user = action.payload.user;
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            });
    },
});

export const { logout } = slice.actions;
export const authReducer = slice.reducer;
