import { ILoginForm } from "@/components/LoginForm/ILoginForm.interface";
import { IReceiveMessageReqData } from "@/interfaces/receiveMessageReqData.interface";
import axios from "axios";

export const instance = axios.create({
    baseURL: "api/",
    headers: {
        "Content-Type": "application/json",
    },
});

export const authApi = {
    login(data: ILoginForm) {
        return instance
            .post<{ message: string }>("auth/login", data)
            .then((res) => res.data.message);
    },
    logout() {
        return instance.post("auth/logout").then((res) => res.data.success);
    },
};

export const messageApi = {
    receiveMessage(data: IReceiveMessageReqData) {
        return instance
            .post("chat/receiveMessage", data)
            .then((res) => res.data);
    },
};
