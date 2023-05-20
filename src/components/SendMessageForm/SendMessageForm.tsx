import React, { useEffect } from "react";
import { IconButton, TextField, Tooltip } from "@mui/material";
import styles from "./SendMessageForm.module.scss";
import { useForm } from "react-hook-form";
import { SendMessageFormProps } from "./SendMessageForm.props";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { useAppSelector } from "@/hooks/redux";
import { useActions } from "@/hooks/actions";
import { getUnixTime } from "date-fns";
import { IMessage } from "@/interfaces/messages.interface";

const SendMessageForm = ({
    chatId,
    className,
    ...props
}: SendMessageFormProps): JSX.Element => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        clearErrors,
    } = useForm<{ message: string }>();
    const { idInstance, apiTokenInstance } = useAppSelector(
        (state) => state.auth
    );
    const { messages } = useAppSelector((state) => state.messages);
    const { addMessage } = useActions();

    useEffect(() => {
        reset();
    }, [chatId, reset]);

    const onSubmit = async (formData: { message: string }) => {
        const body = {
            idInstance,
            apiTokenInstance,
            message: formData.message,
            chatId,
        };
        const send = await axios.post("api/chat/sendMessage", body, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        const createdAt = getUnixTime(new Date());
        const message: Omit<IMessage, "id"> = {
            text: formData.message,
            createdAt,
            isMy: true,
        };
        addMessage(message);
        reset();
    };
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={className}
            {...props}
        >
            <TextField
                color="primary"
                className={styles.message}
                placeholder="Введите текст"
                multiline
                {...register("message", {
                    required: { value: true, message: "Пустое сообщение" },
                })}
                type="text"
                error={errors.message ? true : false}
                helperText={errors.message?.message}
                InputProps={{
                    endAdornment: (
                        <Tooltip title="Отправить сообщение">
                            <IconButton
                                color="primary"
                                aria-label="Отправить сообщение"
                                type="submit"
                                onClick={() => clearErrors()}
                            >
                                <SendIcon fontSize="large" />
                            </IconButton>
                        </Tooltip>
                    ),
                }}
            />
        </form>
    );
};

export default SendMessageForm;
