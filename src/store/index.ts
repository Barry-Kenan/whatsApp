import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authReducer } from "./auth/auth.slice";
export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
