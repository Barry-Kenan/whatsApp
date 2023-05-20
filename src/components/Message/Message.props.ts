import { IMessage } from "@/interfaces/messages.interface";
import { HTMLAttributes } from "react";
import { DetailedHTMLProps } from "react";
export interface MessageProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    message: IMessage;
}
