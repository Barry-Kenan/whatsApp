import React from "react";
import styles from "./ContactCard.module.scss";
import cn from "classnames";
import { IconButton, Tooltip } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteContactMutation } from "@/store/contacts/contacts.api";
import { ContactCardProps } from "./ContactCard.props";

const ContactCard = ({
    contact,
    className,
    ...props
}: ContactCardProps): JSX.Element => {
    const [deleteContact] = useDeleteContactMutation();

    const handleDelete = async (id: string) => {
        await deleteContact(id).unwrap();
    };
    return (
        <div className={cn(className, styles.contact)} {...props}>
            <AccountBoxIcon color="secondary" />
            <span>{contact.phone}</span>
            <Tooltip title="Удалить">
                <IconButton
                    color="primary"
                    aria-label="удалить"
                    onClick={() => handleDelete(contact.id)}
                >
                    <DeleteIcon fontSize="medium" />
                </IconButton>
            </Tooltip>
        </div>
    );
};

export default ContactCard;
