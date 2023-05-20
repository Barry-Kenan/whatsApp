import React, { useEffect, useState } from "react";
import cn from "classnames";
import styles from "./ChatPage.module.scss";
import { ChatPageProps } from "./ChatPage.props";
import { Contacts } from "@/components";
import ChatBox from "@/components/ChatBox/ChatBox";
import { useActions } from "@/hooks/actions";

const ChatPage = ({ className, ...props }: ChatPageProps): JSX.Element => {
    const [contactId, setContactId] = useState<string>("");
    const { deleteAllMessages } = useActions();
    useEffect(() => {
        deleteAllMessages();
    }, [contactId, deleteAllMessages]);

    return (
        <div className={cn(className, styles.wrapper)} {...props}>
            <Contacts
                className={styles.contacts}
                setContactId={setContactId}
                contactId={contactId}
            />
            <ChatBox className={styles.chats} contactId={contactId} />
        </div>
    );
};

export default ChatPage;
