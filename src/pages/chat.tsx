import { useAppSelector } from "@/hooks/redux";
import { withLayout } from "@/layout/Layout";
import { ChatPage } from "@/pages-component";
import { useRouter } from "next/router";
import React from "react";

const Chat = (): JSX.Element => {
    const { isAuth } = useAppSelector((state) => state.auth);
    const { push } = useRouter();
    if (typeof window !== "undefined" && !isAuth) {
        push("/");
    }

    return <ChatPage />;
};

export default withLayout(Chat);
