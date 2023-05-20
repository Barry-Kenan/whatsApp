import React from "react";
import styles from "./Contacts.module.scss";
import cn from "classnames";
import { ContactsProps } from "./Contacts.props";
import { useGetAllContactsQuery } from "@/store/contacts/contacts.api";
import { IContact } from "@/interfaces/contact.interface";
import ContactCard from "../ContactCard/ContactCard";
import AddContact from "../AddContact/AddContact";

const Contacts = ({
    className,
    setContactId,
    contactId,
    ...props
}: ContactsProps): JSX.Element => {
    const { data, isLoading } = useGetAllContactsQuery();

    return (
        <div className={cn(className, styles.wrapper)} {...props}>
            <AddContact contacts={data} onClick={() => setContactId("")} />
            {isLoading && <span>Загрузка...</span>}
            <div className={styles.contacts}>
                {data &&
                    data.map((c: IContact) => (
                        <ContactCard
                            contact={c}
                            key={c.id}
                            onClick={() => setContactId(c.id)}
                            className={cn({
                                [styles.clicked]: c.id == contactId,
                            })}
                        />
                    ))}
            </div>
        </div>
    );
};

export default Contacts;
