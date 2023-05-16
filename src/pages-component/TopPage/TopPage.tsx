import { LoginForm } from "@/components";
import styles from "./TopPage.module.scss";
import cn from "classnames";
import { Card } from "@mui/material";
import { useAppSelector } from "@/hooks/redux";
import { useRouter } from "next/router";
import { TopPageProps } from "./TopPage.props";

const TopPage = ({ className, ...props }: TopPageProps): JSX.Element => {
    const { push } = useRouter();
    const { isAuth } = useAppSelector((state) => state.auth);

    if (isAuth) {
        push("/chat");
    }
    return (
        <div className={cn(className, styles.wrapper)} {...props}>
            <Card className={styles.card}>
                <h1>Вводите свои учетные данные из системы GREEN-API</h1>
                <LoginForm />
            </Card>
        </div>
    );
};

export default TopPage;
