import { IMessage } from "@/interfaces/messages.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MessagesState {
    messages: IMessage[];
}

const initialState: MessagesState = {
    messages: [],
};

export const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        addMessage(state, action: PayloadAction<Omit<IMessage, "id">>) {
            const { text, createdAt, isMy } = action.payload;
            const message: IMessage = {
                text,
                createdAt,
                isMy,
                id: createdAt,
            };

            state.messages.push(message);
        },
        deleteAllMessages(state) {
            state.messages = [];
        },
    },
});

export const messagesActions = messagesSlice.actions;
export const messagesReducer = messagesSlice.reducer;
