import { DetailedHTMLProps, HTMLAttributes } from "react";
export interface ChatBoxProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    contactId: string;
}
