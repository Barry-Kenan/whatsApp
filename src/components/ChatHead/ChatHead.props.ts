import { IContact } from "@/interfaces/contact.interface";
import { HTMLAttributes } from "react";
import { DetailedHTMLProps } from "react";
export interface ChatHeadProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    contact: IContact | undefined;
}
