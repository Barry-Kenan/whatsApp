import React from "react";
import styles from "./ChatBox.module.scss";
import cn from "classnames";
import { ChatBoxProps } from "./ChatBox.props";
import { useGetContactQuery } from "@/store/contacts/contacts.api";
import SendMessageForm from "../SendMessageForm/SendMessageForm";
import { useAppSelector } from "@/hooks/redux";
import { IMessage } from "@/interfaces/messages.interface";
import Message from "../Message/Message";
import ChatHead from "../ChatHead/ChatHead";

const ChatBox = ({
    className,
    contactId,
    ...props
}: ChatBoxProps): JSX.Element => {
    const { data, isLoading } = useGetContactQuery(contactId);
    const { messages } = useAppSelector((state) => state.messages);

    if (contactId == "") {
        return <></>;
    }

    if (isLoading) {
        return <>Загрузка...</>;
    }

    return (
        <div className={cn(className, styles.wrapper)} {...props}>
            <ChatHead contact={data} className={styles.head} />
            <div className={styles.chatBox}>
                {messages &&
                    messages.map((m: IMessage) => (
                        <Message message={m} key={m.id} />
                    ))}
            </div>
            <SendMessageForm
                className={styles.foot}
                chatId={data?.phoneFormat}
            />
        </div>
    );
};

export default ChatBox;
