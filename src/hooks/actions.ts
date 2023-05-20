import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth/auth.slice";
import { messagesActions } from "@/store/messages/messages.slice";
const actions = {
    ...authActions,
    ...messagesActions,
};

export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(actions, dispatch);
};
