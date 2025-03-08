import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../constants/axiosClient";

interface LoginCredentials {
    email: string;
    password: string;
}

interface LoginResponse {
    token: string;
    user: {
        id: number;
        first_name: string;
        last_name: string;
        email: string;
    };
}

export const loginAsync = createAsyncThunk<LoginResponse, LoginCredentials>(
    "auth/login",
    async (credentials, thunkAPI) => {
        try {
            const response = await axiosClient.post<LoginResponse>("/login", credentials);
            // Store token in localStorage for persistence (redux‑persist will rehydrate your store too)
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
            }
            return response.data;
        } catch (err: any) {
            if (err.response && err.response.data) {
                // Expecting our proxy route to return { message: "Invalid credentials" } on error
                return thunkAPI.rejectWithValue(err.response.data.message || "Unknown error");
            }
            return thunkAPI.rejectWithValue(err.message || "Network error");
        }
    }
);
