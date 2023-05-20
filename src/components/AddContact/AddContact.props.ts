import { IContact } from "@/interfaces/contact.interface";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface AddContactProps
    extends DetailedHTMLProps<
        HTMLAttributes<HTMLFormElement>,
        HTMLFormElement
    > {
    contacts: IContact[] | undefined;
}
