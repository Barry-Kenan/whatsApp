import { Alert, Button, Input, Tooltip } from "@mui/material";
import React, { useState } from "react";
import styles from "./LoginForm.module.scss";
import cn from "classnames";
import { useForm } from "react-hook-form";
import { ILoginForm } from "./ILoginForm.interface";
import CloseIcon from "@mui/icons-material/Close";
import { useActions } from "@/hooks/actions";
import { LoginFormProps } from "./LoginForm.props";
import { useRouter } from "next/router";
import { authApi } from "@/helpers/api/api";

const LoginForm = ({ className, ...props }: LoginFormProps) => {
    const { login: auth } = useActions();
    const { push } = useRouter();
    const [error, setError] = useState<string>();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        clearErrors,
    } = useForm<ILoginForm>();

    const onSubmit = async (formData: ILoginForm) => {
        const message = await authApi.login(formData);
        if (message == "authorized") {
            auth(formData);
            reset();
            push("/chat");
        } else {
            setError("Что-то пошло не так");
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
