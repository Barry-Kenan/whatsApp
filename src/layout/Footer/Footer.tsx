import React from "react";
import styles from "./Footer.module.scss";
import cn from "classnames";
import { FooterProps } from "./Footer.props";
import GitHubIcon from "@mui/icons-material/GitHub";
import TelegramIcon from "@mui/icons-material/Telegram";

const Footer = ({ className, ...props }: FooterProps): JSX.Element => {
    return (
        <footer className={cn(className, styles.footer)} {...props}>
            <span>Barry_Kenan</span>
            <a href="https://github.com/Barry-Kenan" target="_blank">
                <GitHubIcon />
            </a>
            <a href="https://t.me/Barry_Kenan" target="_blank">
                <TelegramIcon />
            </a>
        </footer>
    );
};

export default Footer;
