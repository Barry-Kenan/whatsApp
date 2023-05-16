import React from "react";
import { HeaderProps } from "./Header.props";
import styles from "./Header.module.scss";
import cn from "classnames";
import { Button } from "@mui/material";
import Link from "next/link";

const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
    return (
        <header className={cn(className, styles.header)} {...props}>
            <nav>
                <Link href="/">
                    <Button variant="text">Home</Button>
                </Link>
                <Link href="/chat">
                    <Button variant="text">Chat</Button>
                </Link>
            </nav>
        </header>
    );
};

export default Header;
