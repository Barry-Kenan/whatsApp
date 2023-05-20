import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authReducer } from "./auth/auth.slice";
import { contactsApi } from "./contacts/contacts.api";
import { messagesReducer } from "./messages/messages.slice";
export const store = configureStore({
    reducer: {
        [contactsApi.reducerPath]: contactsApi.reducer,
        auth: authReducer,
        messages: messagesReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(contactsApi.middleware),
});
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
