import { ILoginSentResponse } from "@/components/LoginForm/ILoginForm.interface";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { sign } from "jsonwebtoken";

const secret = process.env.NEXT_SECRET as string;

export default async function login(req: NextApiRequest, res: NextApiResponse) {
    const { idInstance, apiTokenInstance } = req.body;

    try {
        const { data } = await axios.get<ILoginSentResponse>(
            `https://api.green-api.com/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`
        );

        if (data.stateInstance == "authorized") {
            const jwt = (value: string) => {
                const code = sign(
                    {
                        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
                        name: value,
                    },
                    secret
                );

                return code;
            };
            const id = jwt(idInstance);
            const token = jwt(apiTokenInstance);
            const data = { id: id, token: token };
            axios.post(process.env.NEXT_DB + "/login", data);

            res.status(200).json({ message: "authorized" });
        }
    } catch (error) {
        res.json({ message: "unauthorized" });
    }
}
