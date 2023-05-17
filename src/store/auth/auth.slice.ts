import { ILoginForm } from "@/components/LoginForm/ILoginForm.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    isAuth: boolean;
    idInstance: string;
    apiTokenInstance: string;
}

const initialState: AuthState = {
    isAuth: false,
    idInstance: "",
    apiTokenInstance: "",
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action: PayloadAction<ILoginForm>) {
            const { idInstance, apiTokenInstance } = action.payload;
            state.isAuth = true;
            state.idInstance = idInstance;
            state.apiTokenInstance = apiTokenInstance;
        },
        logout(state) {
            state.isAuth = false;
            state.idInstance = "";
            state.apiTokenInstance = "";
        },
    },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
