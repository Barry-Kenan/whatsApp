import { DetailedHTMLProps, HTMLAttributes } from "react";
export interface ContactsProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    setContactId: (contactId: string) => void;
    contactId: string;
}
