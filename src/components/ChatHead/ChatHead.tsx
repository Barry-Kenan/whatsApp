import React, { useEffect, useState } from "react";
import styles from "./ChatHead.module.scss";
import { ChatHeadProps } from "./ChatHead.props";
import { messageApi } from "@/helpers/api/api";
import { useAppSelector } from "@/hooks/redux";
import { IReceiveMessageReqData } from "@/interfaces/receiveMessageReqData.interface";
import { useActions } from "@/hooks/actions";

const ChatHead = ({ contact }: ChatHeadProps): JSX.Element => {
    const [data, setData] = useState();
    const { idInstance, apiTokenInstance } = useAppSelector(
        (state) => state.auth
    );
    const { addMessage } = useActions();

    useEffect(() => {
        const handleReceiveMessages = async () => {
            const body: IReceiveMessageReqData = {
                idInstance,
                apiTokenInstance,
                chatId: contact?.phoneFormat as string,
            };
            const message = await messageApi.receiveMessage(body);
            setData(message);
            if (message.body) {
                addMessage(message.body);
            }
        };
        handleReceiveMessages();
        console.log("This will run every second!");
    }, [data]);

    return <div className={styles.wrapper}>{contact?.phone}</div>;
};

export default ChatHead;
