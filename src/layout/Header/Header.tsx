import React from "react";
import { HeaderProps } from "./Header.props";
import styles from "./Header.module.scss";
import cn from "classnames";
import { Button } from "@mui/material";
import Link from "next/link";
import axios from "axios";
import { useAppSelector } from "@/hooks/redux";
import { useActions } from "@/hooks/actions";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
    const { isAuth } = useAppSelector((state) => state.auth);
    const { logout } = useActions();
    const handleSubmit = () => {
        axios.post(
            "api/auth/logout",
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        logout();
    };

    return (
        <header className={cn(className, styles.header)} {...props}>
            <nav className={styles.nav}>
                <WhatsAppIcon fontSize="large" sx={{ color: "white" }} />
                <Link href="/">
                    <Button variant="text">Home</Button>
                </Link>
                <Link href="/chat">
                    <Button variant="text">Chat</Button>
                </Link>
            </nav>
            {isAuth ? (
                <div className={styles.logout}>
                    <AccountCircleIcon
                        fontSize="large"
                        sx={{ color: "white" }}
                    />
                    <Button onClick={handleSubmit}>Logout</Button>
                </div>
            ) : (
                <></>
            )}
        </header>
    );
};

export default Header;
