import { IContact } from "@/interfaces/contact.interface";
import { HTMLAttributes, DetailedHTMLProps } from "react";
export interface ContactCardProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    contact: IContact;
}
