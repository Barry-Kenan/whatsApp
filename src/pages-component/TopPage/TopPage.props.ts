import { ILogin } from "@/interfaces/login.interface";
import { HTMLAttributes } from "react";
import { DetailedHTMLProps } from "react";
export interface TopPageProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    data: ILogin;
}
