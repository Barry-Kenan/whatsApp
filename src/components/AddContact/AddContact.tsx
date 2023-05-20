import React from "react";
import styles from "./AddContact.module.scss";
import { IconButton, TextField, Tooltip } from "@mui/material";
import { useForm } from "react-hook-form";
import { useAddContactMutation } from "@/store/contacts/contacts.api";
import ChatIcon from "@mui/icons-material/Chat";
import { AddContactProps } from "./AddContact.props";

const AddContact = ({
    className,
    contacts,
    ...props
}: AddContactProps): JSX.Element => {
    const [addContact] = useAddContactMutation();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        clearErrors,
    } = useForm<{ phone: string }>();

    const onSubmit = async (formData: { phone: string }) => {
        const phone = formData.phone.replace("8", "7");
        const phoneFormat = phone + "@c.us";
        const data = {
            phone: formData.phone,
            phoneFormat,
        };
        const hasContact =
            contacts?.filter((e) => e.phone == formData.phone).length != 0;

        if (hasContact) {
            reset();
        } else {
            await addContact(data).unwrap();
            reset();
        }
    };
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={className}
            {...props}
        >
            <TextField
                color="primary"
                className={styles.search}
                placeholder="Введите номер 81234567890"
                {...register("phone", {
                    required: { value: true, message: "Заполните номер" },
                    maxLength: {
                        value: 11,
                        message: "Введите номер в форме 81234567890",
                    },
                    pattern: {
                        value: /[8][0-9]{10}/,
                        message: "Неправильный номер",
                    },
                })}
                type="number"
                error={errors.phone ? true : false}
                helperText={errors.phone?.message}
                InputProps={{
                    endAdornment: (
                        <Tooltip title="Добавить чат">
                            <IconButton
                                color="primary"
                                aria-label="добавить чат"
                                type="submit"
                                onClick={() => clearErrors()}
                            >
                                <ChatIcon fontSize="large" />
                            </IconButton>
                        </Tooltip>
                    ),
                }}
            />
        </form>
    );
};

export default AddContact;
