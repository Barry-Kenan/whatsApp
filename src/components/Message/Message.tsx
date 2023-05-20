import React, { useEffect } from "react";
import styles from "./Message.module.scss";
import cn from "classnames";
import { MessageProps } from "./Message.props";

const Message = ({ message }: MessageProps): JSX.Element => {
    return (
        <div
            key={message.id}
            className={cn(styles.message, {
                [styles.from]: message.isMy == true,
                [styles.to]: message.isMy == false,
            })}
        >
            <p>{message.text}</p>
        </div>
    );
};

export default Message;
