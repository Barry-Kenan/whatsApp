import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface SendMessageFormProps
    extends DetailedHTMLProps<
        HTMLAttributes<HTMLFormElement>,
        HTMLFormElement
    > {
    chatId: string | undefined;
}
