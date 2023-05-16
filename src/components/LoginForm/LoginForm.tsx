import { Alert, Button, Input, Tooltip } from "@mui/material";
import React, { useState } from "react";
import styles from "./LoginForm.module.scss";
import cn from "classnames";
import { useForm } from "react-hook-form";
import { ILoginForm, ILoginSentResponse } from "./ILoginForm.interface";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import { useActions } from "@/hooks/actions";
import { LoginFormProps } from "./LoginForm.props";

const LoginForm = ({ className, ...props }: LoginFormProps) => {
    const { auth } = useActions();
    const [error, setError] = useState<string>();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        clearErrors,
    } = useForm<ILoginForm>();

    const onSubmit = async (formData: ILoginForm) => {
        try {
            const { data } = await axios.get<ILoginSentResponse>(
                `https://api.green-api.com/waInstance${formData.idInstance}/getStateInstance/${formData.apiTokenInstance}`
            );
            if (data.stateInstance == "authorized") {
                auth(formData);
                reset();
            } else {
                setError("Что-то пошло не так");
            }
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message);
            }
        }
    };
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={cn(className, styles.wrapper)}
            {...props}
        >
            <Input
                placeholder="idInstance"
                {...register("idInstance", {
                    required: {
                        value: true,
                        message: "Заполните идентификатор",
                    },
                })}
                aria-invalid={errors.idInstance ? true : false}
            />
            <Input
                placeholder="apiTokenInstance"
                {...register("apiTokenInstance", {
                    required: {
                        value: true,
                        message: "Заполните токен",
                    },
                })}
                aria-invalid={errors.apiTokenInstance ? true : false}
            />
            <Button type="submit" onClick={() => clearErrors()}>
                Отправить
            </Button>
            {error && (
                <Alert
                    severity="error"
                    action={
                        <Tooltip title="Закрыть оповещение">
                            <Button
                                onClick={() => setError(undefined)}
                                aria-label="Закрыть оповещение"
                            >
                                <CloseIcon color="action" />
                            </Button>
                        </Tooltip>
                    }
                >
                    Что-то пошло не так, убедитесь что правильно ввели
                    идентификатор и токен
                </Alert>
            )}
        </form>
    );
};

export default LoginForm;
