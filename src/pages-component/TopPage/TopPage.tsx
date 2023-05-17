import { LoginForm } from "@/components";
import styles from "./TopPage.module.scss";
import cn from "classnames";
import { Card } from "@mui/material";
import { TopPageProps } from "./TopPage.props";
import { useActions } from "@/hooks/actions";

const TopPage = ({ data, className, ...props }: TopPageProps): JSX.Element => {
    const { login } = useActions();

    if (data.id && data.token) {
        login({ idInstance: data.id, apiTokenInstance: data.token });
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
