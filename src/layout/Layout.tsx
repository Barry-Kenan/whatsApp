import React, { FunctionComponent } from "react";
import styles from "./Layout.module.scss";
import { LayoutProps } from "./Layout.props";
import { Provider } from "react-redux";
import Footer from "./Footer/Footer";
import { store } from "@/store";
import Header from "./Header/Header";

const Layout = ({ children }: LayoutProps): JSX.Element => {
    return (
        <div className={styles.wrapper}>
            <Header className={styles.header} />
            <main className={styles.body}>{children}</main>
            <Footer className={styles.footer} />
        </div>
    );
};

export const withLayout = <T extends Record<string, unknown>>(
    Component: FunctionComponent<T>
) => {
    return function withLayoutComponent(props: T): JSX.Element {
        return (
            <Provider store={store}>
                <Layout>
                    <Component {...props} />
                </Layout>
            </Provider>
        );
    };
};
