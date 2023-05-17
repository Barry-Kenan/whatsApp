import { Ijwt } from "@/interfaces/jwt.interface";
import { ILogin } from "@/interfaces/login.interface";
import { withLayout } from "@/layout/Layout";
import { TopPage } from "@/pages-component";
import axios from "axios";
import { verify } from "jsonwebtoken";
import { GetStaticProps } from "next";

function Home({ loginData }: HomeProps): JSX.Element {
    return <TopPage data={loginData} />;
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
    const { data } = await axios.get("http://localhost:3001/login");
    let loginData = data;
    if (data.id && data.token) {
        const secret = process.env.NEXT_SECRET as string;
        const id = verify(data.id, secret) as Ijwt;
        const token = verify(data.token, secret) as Ijwt;
        loginData = { id: id.name, token: token.name };
        return {
            props: {
                loginData,
            },
        };
    }
    return {
        props: {
            loginData,
        },
    };
};

interface HomeProps extends Record<string, unknown> {
    loginData: ILogin;
}
